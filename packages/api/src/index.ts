import * as dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import * as swaggerUI from "swagger-ui-express";

import TransactionEmailSender from "./services/EmailSender/EmailSender";
import * as swaggerJson from "./swagger/v0/swagger.json";
import { RegisterRoutes } from "./swagger/v0/routes";
import logger from "./utils/logger";
import { AppDataSource } from "./db/database";

// Create Instance of EmailSender Class
export const EmailSender = new TransactionEmailSender();

// Connect to DB
AppDataSource.initialize()
  .then(() => {
    logger.info("Connected to PG Database through TypeORM");
  })
  .catch((error: any) => {
    logger.error("Error while connecting to the PG Database", {
      error,
    });
  });

const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
RegisterRoutes(router);
app.use("/api", router);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.get("/test", (_, response) => {
  const workspaces = [
    { name: "api", version: "1.0.0" },
    { name: "web", version: "1.0.0" },
  ];
  response.json({ data: workspaces });
});

app.listen(port, () => console.log(`Listening on https://localhost:${port}`));
