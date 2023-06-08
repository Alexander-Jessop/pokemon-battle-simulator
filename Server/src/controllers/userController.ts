import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      name: username,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  console.log("email", email);
  console.log("password", password);
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    return res.status(200).json({ message: "User logged in" });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Failed to log in user" });
  }
};
