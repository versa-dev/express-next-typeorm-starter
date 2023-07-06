import { UserRole, UserStatus } from "@/entities/User";

export type RegisterUserInput = {
  name: string;
  email: string;
  role: UserRole;
};

export type UserDto = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type LoginPayload = {
  token: string;
  user: UserDto;
  isFirstLogin?: boolean;
};
