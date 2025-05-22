import { AUTH_CONSTANTS } from "../../../constants/auth.constants";

export const validateEmail = (email: string): void => {
  const { EMAIL } = AUTH_CONSTANTS;
  const emailRegex = EMAIL.EMAIL_REGEX;

  if (!emailRegex.test(email)) {
    throw new Error(EMAIL.ERROR_MESSAGES.INVALID_EMAIL);
  }
};
