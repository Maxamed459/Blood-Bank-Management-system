import { Request, Response } from "express";
import {
  addingBlood,
  deletingBlood,
  gettingAllBlood,
  gettingBloodById,
  gettingBloodByType,
  updatingBlood,
} from "../services/bloodService";
import prisma from "../lib/prisma";
import { Readable } from "stream";

interface BloodRequestBody {
  type: string;
  quantity: number;
  donorId: string;
}

// creating blood
export const addBlood = async (
  req: Request<{}, {}, BloodRequestBody>,
  res: Response
) => {
  try {
    const { type, quantity, donorId } = req.body;

    if (!type || !quantity || !donorId) {
      let message = "these fields are required: type, quantity, donorId.";
      if (!type) {
        let message = "type field is required.";
      } else if (!quantity) {
        let message = "quantity field is required.";
      } else {
        let message = "donorId field is required.";
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }

    // Check if donor exists
    const userExists = await prisma.user.findUnique({
      where: { id: donorId },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "The Donor user is not found",
      });
    }

    const newBlood = await addingBlood(type, quantity, donorId);

    res.status(201).json({
      success: true,
      message: "Blood added successfully",
      data: newBlood,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getting all blood
export const getAllBlood = async (req: Request, res: Response) => {
  try {
    const allBlood = await gettingAllBlood();
    if (allBlood.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blood records found",
      });
    }

    res.setHeader("Content-Type", "application/json");
    res.write(
      '{"success": true, "message": "All blood records retrieved successfully", "data":[ '
    );

    let first = true;
    const readable = Readable.from(allBlood);

    readable.on("data", (blood) => {
      const chunk = JSON.stringify(blood);
      if (!first) res.write(",");
      res.write(chunk);
      first = false;
    });

    readable.on("end", () => {
      res.write("]}");
      res.end();
    });

    readable.on("error", (err) => {
      // console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Error streaming blood" });
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getting blood by id
export const getBloodById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blood = await gettingBloodById(id);
    if (!blood) {
      return res.status(404).json({
        success: false,
        message: "Blood record not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Blood record retrieved successfully",
      data: blood,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// updating blood
export const updateBlood = async (
  req: Request<{ id: string }, {}, BloodRequestBody>,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { type, quantity, donorId } = req.body;

    // check required fields
    if (!type || !quantity || !donorId) {
      let message = "these fields are required: type, quantity, donorId.";
      if (!type) {
        let message = "type field is required.";
      } else if (!quantity) {
        let message = "quantity field is required.";
      } else {
        let message = "donorId field is required.";
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }

    // check if blood exists
    const bloodExists = await gettingBloodById(id);
    if (!bloodExists) {
      return res.status(404).json({
        success: false,
        message: "Blood record not found",
      });
    }

    const updatedBlood = await updatingBlood(id, type, quantity, donorId);

    res.status(200).json({
      success: true,
      message: "Blood record updated successfully",
      data: updatedBlood,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// deleting blood
export const deleteBlood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bloodExists = await gettingBloodById(id);
    if (!bloodExists) {
      return res.status(404).json({
        success: false,
        message: "Blood record not found",
      });
    }
    await deletingBlood(id);
    res.status(200).json({
      success: true,
      message: "Blood record deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// getting blood by type
export const getBloodByType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    if (!type) {
      return res.status(400).json({
        success: false,
        message: "Blood type is required",
      });
    }

    const blood = await gettingBloodByType(type);
    if (blood.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No blood records found for the specified type",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blood records retrieved successfully",
      data: blood,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
