import * as dotenv from "dotenv";
import { User } from "src/entities/User";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const url = process.env.DATABASE_URL || "";

export const ORMConfig: DataSourceOptions = {
  type: "postgres",
  url,
  entities: [User],
  migrations: ["src/db/migrations/*.{js,ts}"],
  subscribers: [],
  logging: true,
  synchronize: false,
};

export const AppDataSource = new DataSource(ORMConfig);
