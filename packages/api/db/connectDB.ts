import path from "path";
import { User } from "../src/entities/User";
import logger from "../src/utils/logger";
import { DataSourceOptions } from "typeorm";
import dataSource from "./datasource";

const url = process.env.DATABASE_URL || "";

export const ORMConfig: DataSourceOptions = {
  type: "postgres",
  url,
  synchronize: false,
  entities: [User],
  migrations: [path.join(__dirname, "migrations/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "subscribers/*{.ts,.js}")],
};

export const connectToDB = async () => {
  try {
    dataSource.initialize();
    logger.info("Connected to PG Database through TypeORM");
  } catch (error) {
    logger.error("Error while connecting to the PG Database", {
      error,
    });
  }
};
