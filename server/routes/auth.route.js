import express from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "invalid user" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
