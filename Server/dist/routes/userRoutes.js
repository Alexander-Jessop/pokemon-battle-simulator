import express from "express";
import { signup, login, logout, userData, deleteUser, putUser, } from "../controllers/userController.js";
var userRouter = express.Router();
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/user-data/:id", userData);
userRouter.delete("/user-data/:id", deleteUser);
userRouter.put("/user-data/:id", putUser);
export default userRouter;
