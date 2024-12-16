import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import { sendVerificationEmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
  console.log("Request Body", req.body);

  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 6);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000,
    });

    await user.save();

    //jwt
    generateTokenAndSetCookies(res, user._id);

    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created Succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("Login Route");
};

export const logout = async (req, res) => {
  res.send("logout Route");
};
