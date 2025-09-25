import { $Enums } from "../generated/prisma";
import prisma from "../lib/prisma";

// add request
export const addingRequest = async (
  requester_id: string,
  blood_type: string,
  quantity_needed: number,
  hospital: string,
  status: string
) => {
  return await prisma.request.create({
    data: {
      requester_id,
      blood_type: blood_type as $Enums.BloodType,
      quantity_needed,
      hospital,
      status: status as $Enums.Status,
    },
  });
};
// get requests
export const gettingRequest = async () => {
  return await prisma.request.findMany({
    select: {
      id: true,
      requester_id: true,
      blood_type: true,
      quantity_needed: true,
      hospital: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
// get request by blood type
export const gettingRequestByBloodType = async (blood_type: string) => {
  return await prisma.request.findMany({
    where: {
      blood_type: blood_type as $Enums.BloodType,
    },
  });
};
// get request by status
export const gettingRequestByStatus = async (status: string) => {
  return await prisma.request.findMany({
    where: { status: status as $Enums.Status },
    select: {
      requester_id: true,
      blood_type: true,
      quantity_needed: true,
      hospital: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
//update request
export const updatingRequest = async (
  id: string,
  blood_type: string,
  quantity_needed: number,
  hospital: string,
  status: string
) => {
  return await prisma.request.update({
    where: { id },
    data: {
      blood_type: blood_type as $Enums.BloodType,
      quantity_needed,
      hospital,
      status: status as $Enums.Status,
    },
  });
};
// delete request
export const deletingRequest = async (id: string) => {
  return await prisma.request.delete({
    where: { id },
  });
};

// supports request but is not related here
export const getUserByBloodType = async (blood_type: string) => {
  return await prisma.user.findMany({
    where: { blood_type: blood_type as $Enums.BloodType },
    select: {
      id: true,
      fullname: true,
      username: true,
      email: true,
      blood_type: true,
      gender: true,
      role: true,
    },
  });
};
// supports request but is not related here
export const getUserNameById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      fullname: true,
    },
  });
};
