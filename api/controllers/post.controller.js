import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
// import Image from "../models/image.model.js";
// import multer from "multer";
// const upload = multer({ dest: "uploads/" });
export const create = async (req, res, next) => {
  const { title } = req.body;
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const slug = req.body.title.split(" ").join("-");
  // .replace(/[^a-zA-Z0-9-]/g, "");

  const isExistPost = await Post.findOne({ $or: [{ slug }, { title }] });
  if (isExistPost) {
    return next(
      errorHandler(422, "تیتر یا اسلاگی با این مشخصات در سرور وجود دارد!")
    );
  }
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const uploadImage = async (req, res) => {
  const imageName = req.file.filename;
  res.json({ status: "ok", data: imageName });
};

export const allPosts = async (req, res) => {
  try {
    const data = await Post.find({});
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
