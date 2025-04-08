import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Create User (POST)
router.post("/", async (req, res) => {
  const data = req.body;
    try {
      const newUser = new User(data);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: "Error creating user", error });
    }
});

export default router;
