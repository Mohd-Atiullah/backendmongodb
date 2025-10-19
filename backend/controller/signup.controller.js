import express from "express";
import { Signup } from "../modals/signup.modals.js";
import bcrypt from "bcrypt";

const router = express.Router();

export async function signupUser(req, res) {
  try {
    console.log("Signup request body:", req.body);
    const { username, email, password } = req.body;

    if (!username || !email || password == null) {
      return res.status(400).json({ message: "All fields (username, email, password) are required" });
    }
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }

    const existingUser = await Signup.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ message: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Signup({ username, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, username: newUser.username, email: newUser.email },
    });
  } catch (error) {
    console.error("❌ Signup error:", error.stack || error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

router.post("/signup", signupUser);

export default router;
