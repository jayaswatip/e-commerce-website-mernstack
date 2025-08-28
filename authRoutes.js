import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";  // your Mongoose User model

const router = express.Router();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { email, password, provider, profile } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const newUser = new User({
      email,
      password: hashedPassword,
      provider: provider || "local",
      profile: profile || {},
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
