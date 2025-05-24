import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";
import type {
  JoinUserDto,
  LoginUserDto,
  RefreshTokenDto,
} from "../../types/auth.types";
import { validateEmail } from "./validators/email.validators";
import { validatePassword } from "./validators/password.validators";
import { JWT_CONFIG } from "../../config/jwt.config";
import { SECURITY_CONFIG } from "../../config/security.config";
import { Response, Request } from 'express';

const joinUser = async ({
  userId,
  password,
}: JoinUserDto) => {

  validateEmail(userId);
  validatePassword(password, userId);

  const existingUser = await prisma.users.findUnique({
    where: { userId },
  });

  if (existingUser) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.DUPLICATE_EMAIL);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    AUTH_CONSTANTS.PASSWORD.SALT_ROUNDS
  );

  const newUser = await prisma.users.create({
    data: {
      userId,
      passwordHash: hashedPassword,
      created_at: new Date(),
    },
  });

  //민감한 정보 필터링 후 반환
  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

const loginUser = async ({ userId, password }: LoginUserDto, res: Response) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_PASSWORD);
  }

  const accessToken = jwt.sign(
    { id: user.userId },
    JWT_CONFIG.secret,
    JWT_CONFIG.options.access
  );

  const refreshToken = jwt.sign(
    { id: user.userId },
    JWT_CONFIG.secret,
    JWT_CONFIG.options.refresh
  );

  await prisma.users.update({
    where: { userId },
    data: { refresh_token: refreshToken },
  });

  res.cookie('refreshToken', refreshToken, SECURITY_CONFIG.cookie);

  const { passwordHash: _, refresh_token: __, ...userWithoutPassword } = user;

  return {
    accessToken, 
    user: userWithoutPassword
  };
};

const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN);
  }

  let payload: any;
  try {
    payload = jwt.verify(refreshToken, JWT_CONFIG.secret);
  } catch (error) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN);
  }

  const user = await prisma.users.findUnique({
    where: { userId: payload.id },
  });

  if (!user || user.refresh_token !== refreshToken) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.INVALID_TOKEN);
  }

  const newAccessToken = jwt.sign(
    { id: user.userId },
    JWT_CONFIG.secret,
    JWT_CONFIG.options.access
  );

  const newRefreshToken = jwt.sign(
    { id: user.userId },
    JWT_CONFIG.secret,
    JWT_CONFIG.options.refresh
  );

  await prisma.users.update({
    where: { userId: user.userId },
    data: { refresh_token: newRefreshToken },
  });

  res.cookie('refreshToken', newRefreshToken, SECURITY_CONFIG.cookie);

  return {
    accessToken: newAccessToken
  };
};


export { joinUser, loginUser, refresh };
