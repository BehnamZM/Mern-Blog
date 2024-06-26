import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  create,
  allPosts,
  uploadImage,
  deletePost,
  updatepost,
} from "../controllers/post.controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), verifyUser, uploadImage);
router.post("/create", verifyUser, create);
router.delete("/delete/:postId/:userId", verifyUser, deletePost);
router.get("/getposts", allPosts);
router.put("/updatepost/:postId/:userId", verifyUser, updatepost);

export default router;
