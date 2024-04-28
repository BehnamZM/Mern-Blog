import UserModel from "../models/user.module.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    next(errorHandler(400, "all field are required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      next(errorHandler(422, "email or username are allready exist!"));
    }
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json("signup successfully");
  } catch (error) {
    next(error);
  }
};
