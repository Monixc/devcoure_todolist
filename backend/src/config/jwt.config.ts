import { AUTH_CONSTANTS } from "../constants/auth.constants";

if (!process.env.JWT_SECRET) {
  throw new Error(AUTH_CONSTANTS.ERROR_MESSAGES.KEY_NOT_FOUND);
}

export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET,
  options: {
    access: {
      expiresIn: AUTH_CONSTANTS.TOKEN_EXPIRY,
    },
    refresh: {
      expiresIn: AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY,
    }
  }
} as const;