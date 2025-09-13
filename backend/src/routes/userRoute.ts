import express from "express";
import {
  adminRegister,
  login,
  profile,
  userRegister,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authanticate";
import { adminRequired } from "../middlewares/adminRequired";

export const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/register-admin", authenticate, adminRequired, adminRegister);
userRoute.post("/login", login);
userRoute.get("/profile", authenticate, profile);
