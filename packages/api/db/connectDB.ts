import path from "path";
import logger from "src/utils/logger";
import { DataSource, DataSourceOptions } from "typeorm";

const url = process.env.DATABASE_URL || "";

export const ORMConfig: DataSourceOptions = {
  type: "postgres",
  url,
  synchronize: false,
  entities: [],
  migrations: [path.join(__dirname, "migrations/*{.ts,.js}")],
  subscribers: [path.join(__dirname, "subscribers/*{.ts,.js}")],
  migrationsTableName: "migration",
};

export const dataSource = new DataSource(ORMConfig);

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
