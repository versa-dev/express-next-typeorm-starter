import * as dotenv from "dotenv";
import path from "path";
import { Base } from "src/entities/Base";
import { User } from "src/entities/User";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const url = process.env.DATABASE_URL || "";

const ORMConfig: DataSourceOptions = {
  type: "postgres",
  url,
  entities: [Base, User],
  migrations: [path.join(__dirname, "../db/migrations/**/*.{ts,js}")],
  subscribers: [],
  logging: true,
  synchronize: false,
};

export const AppDataSource = new DataSource(ORMConfig);
