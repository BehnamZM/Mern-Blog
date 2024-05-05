import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Image", schema);

export default model;
