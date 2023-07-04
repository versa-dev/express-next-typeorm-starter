import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import * as swaggerUI from "swagger-ui-express";
import * as swaggerJson from "./swagger.json";

import { RegisterRoutes } from "./routes";
import { connectToDB } from "db/connectDB";

connectToDB();

const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.get("/test", (_, response) => {
  const workspaces = [
    { name: "api", version: "1.0.0" },
    { name: "web", version: "1.0.0" },
  ];
  response.json({ data: workspaces });
});

app.listen(port, () => console.log(`Listening on https://localhost:${port}`));
