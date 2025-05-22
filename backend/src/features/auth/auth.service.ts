import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config/db.js";
import bcrypt from "bcrypt";
import { AUTH_CONSTANTS } from "../../constants/auth.constants.js";
import {
  ServiceResponse,
  JoinUserDto,
  UserWithoutPassword,
} from "../../types/auth.types.js";
import { validateEmail, validatePassword } from "./validators/index.js";

const joinUser = async ({
  userId,
  password,
}: JoinUserDto): ServiceResponse<UserWithoutPassword> => {
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

export { joinUser };
