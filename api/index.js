import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to db");
});

const app = express();

app.listen(4000, () => {
  console.log("app is listening to port 4000");
});
