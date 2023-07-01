import { NextFunction, Request, Response } from "express";
import { Session } from "express-session";
import { IUser } from "../types/user.js";

interface UserSession extends Session {
  user: IUser | null;
}

export const checkAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionUser: UserSession = req.session as UserSession;
  !sessionUser.user ? res.status(401).json({ error: "Unauthorized" }) : next();
};
