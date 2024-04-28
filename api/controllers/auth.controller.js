import UserModel from "../models/user.module.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "all field are required" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    const isUserExist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExist) {
      return res.status(422).json("email or username are allready exist!");
    }
    await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.json("signup successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
