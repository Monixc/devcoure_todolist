import { AUTH_CONSTANTS } from "../../../constants/auth.constants.js";

export const validateEmail = (email: string) => {
  const { EMAIL } = AUTH_CONSTANTS;

  if (!EMAIL.EMAIL_REGEX.test(email)) {
    throw new Error(EMAIL.ERROR_MESSAGES.INVALID_EMAIL);
  }
};
