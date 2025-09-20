import express from "express";
import {
  adminRegister,
  getAllStaff,
  getAllUsers,
  login,
  profile,
  staffRegister,
  userRegister,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";
import { adminRequired } from "../middlewares/adminRequired";

export const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/register-admin", authenticate, adminRequired, adminRegister);
userRoute.post("/register-staff", authenticate, adminRequired, staffRegister);
userRoute.post("/login", login);
userRoute.get("/profile", authenticate, profile);
userRoute.get("/users/stream", authenticate, adminRequired, getAllUsers);
userRoute.get("/staff", authenticate, adminRequired, getAllStaff);
