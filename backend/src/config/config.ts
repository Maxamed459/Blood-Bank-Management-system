import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET || "bloodbanksecret_12345";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const EMAIL = process.env.EMAIL;
export const PASSWORD = process.env.PASSWORD;
export const CLIENT_ID = process.env.CLIENT_ID;
export const CLIENT_SECRET = process.env.CLIENT_SECRET;
export const REDIRECT_URI = process.env.REDIRECT_URI;
export const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;
