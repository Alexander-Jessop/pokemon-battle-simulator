import { Request, Response } from "express";
import { Types } from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../models/user.js";
import { Session } from "express-session";

interface UserSession extends Session {
  user: any;
  selectedPokemon: any;
}

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

    const sessionUser: UserSession = req.session as UserSession;
    sessionUser.user = createdUser;

    return res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const sessionUser: UserSession = req.session as UserSession;

    const filterdUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      visits: user.visits,
      battlesPlayed: user.battlesPlayed,
      movesUsed: user.movesUsed,
      gamesWon: user.gamesWon,
      gamesLost: user.gamesLost,
    };

    sessionUser.user = filterdUser;

    user.visits += 1;
    await user.save();

    return res
      .status(200)
      .json({ message: "User logged in", user: sessionUser.user });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Failed to log in user" });
  }
};

export const logout = (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "User logged out" });
  });
};

export const userData = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get user data" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userId = new Types.ObjectId(req.params.id);
    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user" });
  }
};

export const putUser = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const userId = new Types.ObjectId(req.params.id);

  const data = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = data.name ? data.name : user.name;
    user.email = data.email ? data.email : user.email;

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 12);
      user.password = hashedPassword;
    } else {
      user.password = user.password;
    }

    user.visits = data.visits ? data.visits : user.visits;
    user.battlesPlayed = data.battlesPlayed
      ? data.battlesPlayed
      : user.battlesPlayed;
    user.movesUsed = data.movesUsed ? data.movesUsed : user.movesUsed;

    user.gamesWon = data.gamesWon ? data.gamesWon : user.gamesWon;
    user.gamesLost = data.gamesLost ? data.gamesLost : user.gamesLost;

    const updatedUser = await user.save();

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user" });
  }
};
