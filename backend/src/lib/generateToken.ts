import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId: string, expiresIn: number) => {
  const token = jwt.sign({ userId }, JWT_SECRET || "blood_2025", {
    expiresIn,
  });
  return token;
};
