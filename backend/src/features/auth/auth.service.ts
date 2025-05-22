import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AUTH_CONSTANTS } from "../../constants/auth.constants";
import type {
  ServiceResponse,
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
  try {
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
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ userId, password }: LoginUserDto) => {
  try {
    const user = await prisma.users.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new Error("존재하지 않는 사용자입니다.");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("비밀번가 일치하지 않습니다");
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRY } as jwt.SignOptions
    );

    const { passwordHash: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("로그인 중 오류가 발생했습니다.");
  }
};

export { joinUser, loginUser };
