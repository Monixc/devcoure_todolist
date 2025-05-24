export const AUTH_CONSTANTS = {
 
  TOKEN_EXPIRY: "1h",
  REFRESH_TOKEN_EXPIRY: "7d",
  EMAIL: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    EMAIL_PATTERN: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    SALT_ROUNDS: 10,
    REGEX: {
      HAS_LETTER: /[a-zA-Z]/,
      HAS_NUMBER: /\d/,
      HAS_SPECIAL: /[@$!%*?&]/,
    },
  },
  ERROR_MESSAGES: {
    // 이메일 관련
    INVALID_EMAIL: "유효하지 않은 이메일 형식입니다.",
    DUPLICATE_EMAIL: "이미 존재하는 이메일입니다.",
    
    // 비밀번호 관련
    PASSWORD_TOO_SHORT: "비밀번호는 8자 이상이어야 합니다.",
    PASSWORD_NO_LETTER: "비밀번호는 영문자를 포함해야 합니다",
    PASSWORD_NO_NUMBER: "비밀번호는 숫자를 포함해야 합니다",
    PASSWORD_NO_SPECIAL: "비밀번호는 하나 이상의 특수문자(@$!%*?&)를 포함해야 합니다.",
    PASSWORD_CONTAINS_EMAIL: "비밀번호에 이메일 주소를 포함할 수 없습니다.",

    // 로그인/인증 관련
    USER_NOT_FOUND: "존재하지 않는 사용자입니다.",
    INVALID_PASSWORD: "비밀번호가 일치하지 않습니다.",
    DUPLICATE_USER: "이미 존재하는 사용자입니다.",
    UNAUTHORIZED: "로그인이 필요합니다.",
    INVALID_TOKEN: "유효하지 않은 토큰입니다.",
    TOKEN_EXPIRED: "만료된 토큰입니다.",
    REFRESH_TOKEN_NOT_FOUND: "리프레시 토큰을 찾을 수 없습니다.",
    MISSING_CREDENTIALS: "아이디와 비밀번호를 입력해주세요.",
    INTERNAL_SERVER_ERROR: "로그인 중 오류가 발생했습니다.",

    //jwt config
    KEY_NOT_FOUND: "키를 찾을 수 없습니다.",
  },
  MESSAGES: {
    JOIN_SUCCESS: "회원가입이 완료되었습니다.",
    LOGIN_SUCCESS: "로그인이 완료되었습니다.",
    LOGOUT_SUCCESS: "로그아웃이 완료되었습니다.",
    TOKEN_REFRESHED: "토큰이 갱신되었습니다.",
  }
} as const;
