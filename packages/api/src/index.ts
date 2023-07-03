import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDB } from "db/connectDB";

dotenv.config();

const app = express();
const port = 4000;

app.use(cors({ origin: "http://localhost:3000" }));

connectToDB();

app.get("/test", (_, response) => {
  const workspaces = [
    { name: "api", version: "1.0.0" },
    { name: "web", version: "1.0.0" },
  ];
  response.json({ data: workspaces });
});

app.listen(port, () => console.log(`Listening on https://localhost:${port}`));
