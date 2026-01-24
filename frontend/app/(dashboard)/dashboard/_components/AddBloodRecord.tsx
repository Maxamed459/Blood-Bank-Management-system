"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import toast from "react-hot-toast";
import { addBloodRecord } from "@/store/slices/bloodSlice";

const AddBloodRecord = () => {
  const [formData, setFormData] = useState({
    type: "",
    quantity: "",
    donorId: "",
  });

  const { blood, loading, error } = useAppSelector((state) => state.blood);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // generic handler
  const handleSelectChange = (field: "type", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 👈 call context function
    const payload = {
      ...formData,
      quantity: Number(formData.quantity),
    };

    // console.log(payload);

    const bloodPromise = dispatch(addBloodRecord(payload)).unwrap();

    try {
      await toast.promise(bloodPromise, {
        loading: "adding blood record...",
        success: "record added successfully",
        error: (err) => <b>{err.message || "Failed to add blood record"}</b>,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("adding blood record failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-5 px-4 md:px-10 lg:px-20">
      <div className="w-full">
        <div className="mb-6 ">
          <h1 className="text-xl font-medium">Add Blood Record</h1>
          <p className="text-[11px] text-muted-foreground">
            Enter the details below to add blood record
          </p>
          {/* logo goes here */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-200 text-red-800 border border-red-800 p-4">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-xs">
                Blood type
              </Label>
              <Select
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger className="w-full border border-slate-600">
                  <SelectValue placeholder="Select Blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="A_POSITIVE">A_POSITIVE</SelectItem>
                    <SelectItem value="A_NEGATIVE">A_NEGATIVE</SelectItem>
                    <SelectItem value="B_POSITIVE">B_POSITIVE</SelectItem>
                    <SelectItem value="B_NEGATIVE">B_NEGATIVE</SelectItem>
                    <SelectItem value="O_POSITIVE">O_POSITIVE</SelectItem>
                    <SelectItem value="O_NEGATIVE">O_NEGATIVE</SelectItem>
                    <SelectItem value="AB_POSITIVE">AB_POSITIVE</SelectItem>
                    <SelectItem value="AB_NEGATIVE">AB_NEGATIVE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-xs">
                Quantity
              </Label>
              <Input
                onChange={handleChange}
                id="quantity"
                type="number"
                step="any"
                placeholder="Enter quantity"
                required
                className="border border-slate-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="donorId" className="text-xs">
                Donor Id
              </Label>
              <Input
                onChange={handleChange}
                id="donorId"
                type="text"
                placeholder="Enter Donor Id"
                required
                className="border border-slate-600"
              />
            </div>

            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#A30B1C] hover:bg-[#910a1a] disabled:opacity-50 text-white"
                disabled={loading}
              >
                Add Blood Record
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBloodRecord;
