import { ORMConfig } from "db/connectDB";
import { RegisterUserInput } from "src/controllers/AuthController/types";
import { User, UserStatus } from "src/entities/User";
import { DataSource } from "typeorm";

const dataSource = new DataSource(ORMConfig);

export const AuthRepository = dataSource.getRepository(User).extend({
  async createUser({
    user,
    password,
    status,
  }: {
    user: RegisterUserInput;
    password: string;
    status: UserStatus;
  }) {
    const { name, email, role } = user;

    const createdUser = this.manager.create(User, {
      name,
      email,
      password,
      role,
      status,
    });

    return this.manager.save(createdUser);
  },
});