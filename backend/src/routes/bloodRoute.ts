import express from "express";
import {
  addBlood,
  deleteBlood,
  getAllBlood,
  getBloodById,
  getBloodByType,
  getBloodByUser,
  updateBlood,
} from "../controllers/bloodController";
import { authenticate } from "../middlewares/authenticate";
import { staffRequired } from "../middlewares/adminRequired";

export const bloodRouter = express.Router();

bloodRouter.post("/", authenticate, staffRequired, addBlood);
bloodRouter.get("/stream", authenticate, staffRequired, getAllBlood);
bloodRouter.get("/:id", authenticate, staffRequired, getBloodById);
bloodRouter.get("/type/:type", authenticate, staffRequired, getBloodByType);
bloodRouter.get("/donation-record/:userId", authenticate, getBloodByUser);
bloodRouter.put("/:id", authenticate, staffRequired, updateBlood);
bloodRouter.delete("/:id", authenticate, staffRequired, deleteBlood);
