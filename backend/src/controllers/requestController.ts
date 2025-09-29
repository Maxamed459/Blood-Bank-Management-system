import { Request, Response } from "express";
import {
  addingRequest,
  deletingRequest,
  gettingRequest,
  gettingRequestByBloodType,
  gettingRequestByRequesterId,
  getUserByBloodType,
  getUserNameById,
} from "../services/requestService";
import prisma from "../lib/prisma";
import { bloodRequestEmail } from "../lib/sendEmailTotheDonors";
// add request
export const addRequest = async (req: Request, res: Response) => {
  try {
    const { blood_type, quantity_needed, hospital, contact } = req.body;
    const requester_id = req.user?.id;
    // checking if missing required fields
    if (!blood_type || !quantity_needed || !hospital || !contact) {
      return res.status(400).json({
        success: false,
        message:
          "blood_type & quantity_needed & hospital & contact these fields are required",
      });
    }
    // checking if the quantity_needed is valid number
    if (quantity_needed <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid quantity",
      });
    }
    // setting status to PENDING if the request has sent a user or admin
    let status;
    switch (req.user?.role) {
      case "ADMIN":
      case "STAFF":
        status = "APPROVED";
        break;
      case "USER":
        status = "PENDING";
        break;
      default:
        status = "REJECTED"; // fallback if role is missing or invalid
    }

    const newRequest = await addingRequest(
      requester_id,
      blood_type,
      quantity_needed,
      hospital,
      contact,
      status
    );

    if (newRequest.status === "APPROVED") {
      const requester = await getUserNameById(newRequest.requester_id);
      const requesterName = requester?.fullname ?? "Unknown requester";
      const donors = await getUserByBloodType(newRequest.blood_type);
      if (donors.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Sorry we don`t have donor that matches the requested blood type",
        });
      }
      await Promise.all(
        donors?.map((donor) => {
          bloodRequestEmail(
            donor.email,
            donor.fullname,
            requesterName,
            newRequest.blood_type,
            newRequest.hospital,
            newRequest.quantity_needed,
            newRequest.contact
          );
        })
      );
    }

    res.status(201).json({
      success: true,
      message: "request sent successfully",
      data: newRequest,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get all request
export const getAllRequest = async (req: Request, res: Response) => {
  try {
    const allRequest = await gettingRequest();
    if (allRequest.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no request founded",
      });
    }

    res.status(200).json({
      success: true,
      message: "here are the all request",
      data: allRequest,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get request by blood type
export const getRequestByBloodType = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const Request = await gettingRequestByBloodType(type);
    if (Request.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no request founded by this blood type",
      });
    }

    res.status(200).json({
      success: true,
      message: "here are the all request for this blood type",
      data: Request,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// get request by requester_id
export const getRequestByRequesterId = async (req: Request, res: Response) => {
  try {
    const { requester_id } = req.params;
    const requests = await gettingRequestByRequesterId(requester_id);

    if (requests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "You have not made any blood donation requests yet.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Requests found successfully.",
      data: requests,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// update request
export const updateRequestStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await prisma.request.update({
      where: { id },
      data: {
        status,
      },
    });
    if (updatedRequest.status === "APPROVED") {
      const requester = await getUserNameById(updatedRequest.requester_id);
      const requesterName = requester?.fullname ?? "Unknown requester";
      const donors = await getUserByBloodType(updatedRequest.blood_type);
      if (donors.length === 0) {
        return res.status(200).json({
          success: true,
          message:
            "Request status updated to APPROVED, but no matching donors were found.",
          data: updatedRequest,
        });
      }
      await Promise.all(
        donors?.map((donor) => {
          bloodRequestEmail(
            donor.email,
            donor.fullname,
            requesterName,
            updatedRequest.blood_type,
            updatedRequest.hospital,
            updatedRequest.quantity_needed,
            updatedRequest.contact
          );
        })
      );
    }
    res.status(200).json({
      success: true,
      message: "request status updated successfully",
      data: updatedRequest,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// delete request
export const deleteRequest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletingRequest(id);
    res.status(200).json({
      success: true,
      message: "request deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
