import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/users.js";
import errorMiddleware from "./middlewares/error-middleware.js";
const app = express();

dotenv.config();

const corsOption = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));

app.use("/api", router);
app.use(errorMiddleware);
const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_LOCAL, {
      dbName: "user_management",
    });
    console.log("MongoDB connected");
    app.listen(process.env.SERVER_PORT || 3307, () => {
      console.log(`Server Started on port ${process.env.SERVER_PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

startApp();
