import express from "express";
import {
  deleteUser,
  signout,
  test,
  updateUser,
  uploadImage,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "client/src/uploads/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("image"), uploadImage);
router.get("/test", test);
router.put("/update/:userId", verifyUser, updateUser);
router.delete("/delete/:userId", verifyUser, deleteUser);
router.post("/signout", signout);

export default router;
