import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "./db/db.js";

const app = express();

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import userRoutes from "./routes/user.routes.js";
import captainRoutes from "./routes/captain.routes.js";

// routes declartion

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/captain", captainRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  // General error handling
  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

export { app };
