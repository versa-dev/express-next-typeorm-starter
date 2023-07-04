import path from "path";
import { User } from "../src/entities/User";
import { DataSourceOptions } from "typeorm";

const url = process.env.DATABASE_URL || "";

export const ORMConfig: DataSourceOptions = {
  type: "postgres",
  url,
  entities: [User],
  migrations: [path.join(__dirname, "migrations/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "subscribers/*{.ts,.js}")],
  logging: true,
  synchronize: false,
};
