import express from "express";
import {
  adminSignUp,
  registerUser,
  login,
} from "../controllers/user.controller.js";
// import { upload } from "../middleware/avatar.upload.js";

export const authRouter = express.Router();

// new user
authRouter.post("/signup", registerUser);
authRouter.post("/signup/admin", adminSignUp);

// login user
authRouter.post("/", login);

// blog create
