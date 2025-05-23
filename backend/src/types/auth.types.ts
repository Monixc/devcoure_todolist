export interface User {
  id: number;
  userId: string;
  passwordHash: string;
  created_at: Date | null;
  updated_at: Date | null;
  refresh_token: string | null;
}

export type UserWithoutPassword = Omit<User, "passwordHash">;

export interface JoinUserDto {
  userId: string;
  password: string;
}

export interface LoginUserDto {
  userId: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}


