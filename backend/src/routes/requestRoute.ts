import express from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  addRequest,
  deleteRequest,
  getAllRequest,
  getRequestByBloodType,
  updateRequest,
} from "../controllers/requestController";
import { staffRequired } from "../middlewares/adminRequired";

export const requestRouter = express.Router();

requestRouter.post("/", authenticate, addRequest);
requestRouter.get("/", authenticate, getAllRequest);
requestRouter.get("/type/:type", authenticate, getRequestByBloodType);
requestRouter.put("/:id", authenticate, staffRequired, updateRequest);
requestRouter.delete("/:id", authenticate, deleteRequest);
