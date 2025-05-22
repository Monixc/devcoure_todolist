import { StatusCodes } from "http-status-codes";
import { prisma } from "../../config/db.js";
import bcrypt from "bcrypt";
import { AUTH_CONSTANTS } from "../../constants/auth.constants.js";
import {
  ServiceResponse,
  JoinUserDto,
  UserWithoutPassword,
} from "../../types/auth.types.js";

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

const validateEmail = (email: string) => {
  const { EMAIL } = AUTH_CONSTANTS;

  if (!EMAIL.EMAIL_REGEX.test(email)) {
    throw new Error(EMAIL.ERROR_MESSAGES.INVALID_EMAIL);
  }
};

const validatePassword = (password: string, email: string) => {
  const { PASSWORD } = AUTH_CONSTANTS;

  if (password.length < PASSWORD.MIN_LENGTH) {
    throw new Error(PASSWORD.ERROR_MESSAGES.TOO_SHORT);
  }

  if (!PASSWORD.REGEX.HAS_LETTER.test(password)) {
    throw new Error(PASSWORD.ERROR_MESSAGES.NO_LETTER);
  }

  if (!PASSWORD.REGEX.HAS_NUMBER.test(password)) {
    throw new Error(PASSWORD.ERROR_MESSAGES.NO_NUMBER);
  }
  if (!PASSWORD.REGEX.HAS_SPECIAL.test(password)) {
    throw new Error(PASSWORD.ERROR_MESSAGES.NO_SPECIAL);
  }

  const emailPrefix = email.split("@")[0].toLowerCase();
  if (password.toLowerCase().includes(emailPrefix)) {
    throw new Error(PASSWORD.ERROR_MESSAGES.CONTAINS_EMAIL);
  }

  if (PASSWORD.REGEX.EMAIL_PATTERN.test(password)) {
    throw new Error(PASSWORD.ERROR_MESSAGES.CONTAINS_EMAIL);
  }
};
export { joinUser };
