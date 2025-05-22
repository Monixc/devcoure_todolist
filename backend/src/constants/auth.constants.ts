export const AUTH_CONSTANTS = {
  SALT_ROUNDS: 10,
  PASSWORD_MIN_LENGTH: 8,
  TOKEN_EXPIRY: "1h",
  REFRESH_TOKEN_EXPIRY: "7d",
  EMAIL: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    ERROR_MESSAGES: {
      INVALID_EMAIL: "유효하지 않은 이메일 형식입니다.",
      DUPLICATE_EMAIL: "이미 존재하는 이메일입니다.",
    },
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    REGEX: {
      HAS_LETTER: /[a-zA-Z]/,
      HAS_NUMBER: /\d/,
      HAS_SPECIAL: /[@$!%*?&]/,
      EMAIL_PATTERN: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    },
    ERROR_MESSAGES: {
      TOO_SHORT: "비밀번호는 8자 이상이어야 합니다.",
      NO_LETTER: "비밀번호는 영문자를 포함해야 합니다",
      NO_NUMBER: "비밀번호는 숫자를 포함해야 합니다",
      NO_SPECIAL: "비밀번호는 하나 이상의 특수문자(@$!%*?&)를 포함해야 합니다.",
      CONTAINS_EMAIL: "비밀번호에 이메일 주소를 포함할 수 없습니다.",
    },
  },
  LOGIN: {
    ERROR_MESSAGES: {
      USER_NOT_FOUND: "존재하지 않는 사용자입니다.",
      INVALID_CREDENTIALS: "비밀번호가 일치하지 않습니다.",
      INTERNAL_SERVER_ERROR: "로그인 중 오류가 발생했습니다.",
      MISSING_CREDENTIALS: "아이디와 비밀번호를 입력해주세요.",
    },
  },
};
