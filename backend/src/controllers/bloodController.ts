import { Request, Response } from "express";
import { addingBlood, gettingAllBlood } from "../services/bloodService";
import prisma from "../lib/prisma";

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
    const allBlood = await gettingAllBlood;
    res.status(200).json({
      success: true,
      message: "All blood records retrieved successfully",
      data: allBlood,
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
  } catch (error) {}
};

// updating blood
// deleting blood
// getting blood by type
