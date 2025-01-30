import express from "express";
import {
  adminLoginControllers,
  adminRegister,
  UserLoginControllers,
  userRegister,
} from "../controllers/user.controller.js";

export const authRouter = express.Router();

// new user
authRouter.post("/signup", userRegister);

// new admin
authRouter.post("/new/admin", adminRegister);

// login user
authRouter.post("/user", UserLoginControllers);

// login admin
authRouter.post("/admin", adminLoginControllers);
