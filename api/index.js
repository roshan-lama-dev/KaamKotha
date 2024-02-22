import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

import userRouter from "./routes/user.route.js";
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

app.use("/api/user", userRouter);
app.listen(PORT, () => {
  console.log(`THe server is running at http://localhost:${PORT}`);
});
