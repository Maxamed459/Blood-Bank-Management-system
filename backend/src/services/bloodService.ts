import prisma from "../lib/prisma";
import { $Enums } from "../generated/prisma";

// creating blood
export async function addingBlood(
  type: string,
  quantity: number,
  donorId: string
) {
  return await prisma.blood.create({
    data: {
      type: type as $Enums.BloodType,
      quantity,
      donor: { connect: { id: donorId } },
    },
  });
}

// getting all blood
export async function gettingAllBlood() {
  return await prisma.blood.findMany({
    select: {
      id: true,
      type: true,
      quantity: true,
      donorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

// getting blood by id
export async function gettingBloodById(id: string) {
  return await prisma.blood.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      type: true,
      quantity: true,
      donorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

// updating blood
export async function updatingBlood(
  id: string,
  type: string,
  quantity: number,
  donorId: string
) {
  return await prisma.blood.update({
    where: {
      id,
    },
    data: {
      type: type as $Enums.BloodType,
      quantity,
      donorId,
    },
  });
}

// deleting blood
export async function deletingBlood(id: string) {
  return await prisma.blood.delete({
    where: {
      id,
    },
  });
}

// getting blood by type
export async function gettingBloodByType(type: string) {
  return await prisma.blood.findMany({
    where: {
      type: type as $Enums.BloodType,
    },
    select: {
      id: true,
      type: true,
      quantity: true,
      donorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
