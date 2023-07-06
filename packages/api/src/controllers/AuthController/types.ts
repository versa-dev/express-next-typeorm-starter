import { UserRole, UserStatus } from "@/db/entities/User";

export type RegisterUserInput = {
  name: string;
  email: string;
};

export type UserDto = {
  id: string;
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
