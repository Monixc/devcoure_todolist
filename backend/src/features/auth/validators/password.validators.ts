import { AUTH_CONSTANTS } from "../../../constants/auth.constants.js";

export const validatePassword = (password: string, email: string) => {
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
