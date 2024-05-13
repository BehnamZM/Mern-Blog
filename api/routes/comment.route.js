import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  getcomments,
  getPostComments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", verifyUser, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyUser, likeComment);
router.get("/getcomments", verifyUser, getcomments);
router.delete("/deleteComment/:commentId", verifyUser, deleteComment);

export default router;
