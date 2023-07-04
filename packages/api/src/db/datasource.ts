const dotenv = require("dotenv");
const path = require("path");
const { DataSource } = require("typeorm");

dotenv.config();

const url = process.env.DATABASE_URL || "";

const ORMConfig = {
  type: "postgres",
  url,
  entities: [path.join(__dirname, "../db/entities/**/*.{ts,js}")],
  migrations: [path.join(__dirname, "../db/migrations/**/*.{ts,js}")],
  subscribers: [],
  logging: true,
  synchronize: false,
};

const AppDataSource = new DataSource(ORMConfig);

module.exports = { AppDataSource };
