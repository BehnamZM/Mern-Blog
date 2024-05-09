import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
// import cors from "cors";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to db");
});

const app = express();
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// app.use(cors());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("app is listening to port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
