import { AUTH_CONSTANTS } from "../../../constants/auth.constants";

export const validatePassword = (password: string, email: string): void => {
  const { PASSWORD } = AUTH_CONSTANTS;

  if (password.length < PASSWORD.MIN_LENGTH) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_TOO_SHORT);
  }

  if (!PASSWORD.REGEX.HAS_LETTER.test(password)) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_NO_LETTER);
  }

  if (!PASSWORD.REGEX.HAS_NUMBER.test(password)) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_NO_NUMBER);
  }
  if (!PASSWORD.REGEX.HAS_SPECIAL.test(password)) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_NO_SPECIAL);
  }

  if (email && password.includes(email)) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_CONTAINS_EMAIL);
  }

  if (AUTH_CONSTANTS.EMAIL.EMAIL_REGEX.test(password)) {
    throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_CONTAINS_EMAIL);
  }
};
