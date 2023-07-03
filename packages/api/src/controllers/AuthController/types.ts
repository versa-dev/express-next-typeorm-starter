import { UserRole } from "../../entities/User";

export type RegisterUserInput = {
  name: string;
  email: string;
  role: UserRole;
};
