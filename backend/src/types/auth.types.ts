// 사용자 관련 타입
export interface User {
  id: number;
  userId: string;
  passwordHash: string;
  created_at: Date;
  updated_at?: Date;
}

export type UserWithoutPassword = Omit<User, "passwordHash">;

// 회원가입 DTO
export interface JoinUserDto {
  userId: string;
  password: string;
}

// 로그인 DTO
export interface LoginUserDto {
  userId: string;
  password: string;
}

// 서비스 응답 타입
export type ServiceResponse<T> = Promise<T>;
