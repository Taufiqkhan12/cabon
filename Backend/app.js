import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./Db/db.js ";

dotenv.config();

const app = express();

connectDB();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

export { app };
