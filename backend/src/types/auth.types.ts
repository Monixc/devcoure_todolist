export type ServiceResponse<T> = Promise<T>;

export interface UserWithoutPassword {
  userId: string;
  created_at: Date | null;
}

export interface JoinUserDto {
  userId: string;
  password: string;
}
