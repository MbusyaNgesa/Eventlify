import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
// import { User } from "../models/userModel.js";

// export const register = async (req, res) => {
//   const { email, password, name, role } = req.body;
//   try {
//     if (!email || !password || !name) {
//       throw new Error("All fields are required");
//     }

//     const userAlreadyExists = await User.findOne({ email });
//     console.log("userAlreadyExists", userAlreadyExists);

//     if (userAlreadyExists) {
//       return res
//         .status(400)
//         .json({ success: false, message: "User already exists" });
//     }

//     const hashedPassword = await bcryptjs.hash(password, 6);
//     const verificationToken = Math.floor(
//       100000 + Math.random() * 900000
//     ).toString();

//     const user = new User({
//       email,
//       password: hashedPassword,
//       name,
//       verificationToken,
//       verificationTokenExpiresAt: Date.now() + 1 * 60 * 60 * 1000,
//     });

//     //jwt
//     // generateTokenAndSetCookies(res, user._id);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
