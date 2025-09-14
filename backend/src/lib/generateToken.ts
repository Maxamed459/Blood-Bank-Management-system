import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";

export const generateToken = (userId: string, expiresIn: number) => {
  const token = jwt.sign({ userId }, JWT_SECRET || "blood_2025", {
    expiresIn,
  });
  return token;
};
