import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";
import type {
  JoinUserDto,
  UserWithoutPassword,
  LoginUserDto,
} from "../../types/auth.types";
import { validateEmail } from "./validators/email.validators";
import { validatePassword } from "./validators/password.validators";

const joinUser = async ({
  userId,
  password,
}: JoinUserDto): Promise<UserWithoutPassword> => {
  const { EMAIL } = AUTH_CONSTANTS;

  validateEmail(userId);
  validatePassword(password, userId);

  const existingUser = await prisma.users.findUnique({
    where: { userId },
  });

  if (existingUser) {
    throw new Error(EMAIL.ERROR_MESSAGES.DUPLICATE_EMAIL);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    AUTH_CONSTANTS.SALT_ROUNDS
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

const loginUser = async ({ userId, password }: LoginUserDto) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(AUTH_CONSTANTS.LOGIN.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error(AUTH_CONSTANTS.LOGIN.ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRY,
  } as jwt.SignOptions);

  const { passwordHash: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
  };
};

const getRefreshToken = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { userId },
  });

  if (!user) {
    throw new Error(AUTH_CONSTANTS.LOGIN.ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY } as jwt.SignOptions
  );

  await prisma.users.update({
    where: { userId },
    data: { refresh_token: refreshToken },
  });

  return refreshToken;
};

export { joinUser, loginUser, getRefreshToken };
