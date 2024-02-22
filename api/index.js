import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import mongoose from "mongoose";

import userRouter from "./routes/user.route.js";
import signupRouter from "./routes/auth.route.js";
const PORT = 3000;

const app = express();
const databaseConnecion = () => {
  const connection = mongoose.connect(process.env.MONGO_URL);
  try {
    connection && console.log("Database Connected");
  } catch (error) {
    console.log("Database error: ", error);
  }
};
databaseConnecion();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", signupRouter);

app.listen(PORT, () => {
  console.log(`THe server is running at http://localhost:${PORT}`);
});

// global error handler

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
