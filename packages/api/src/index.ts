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
import { notFoundHandler } from "./middleware/notFoundHandler";
import { errorHandler } from "./middleware/errorHandler";

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
app.use("/v0", router);

// API Docs with Swagger
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on https://localhost:${port}`));
