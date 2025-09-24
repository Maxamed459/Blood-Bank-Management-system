"use client";
import React, { useEffect, useState } from "react";
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
import { loadUserFromStorage } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { addRequest } from "@/store/slices/requestSlice";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    blood_type: "",
    quantity_needed: "",
    hospital: "",
  });
  const { user } = useAppSelector((state) => state.auth);
  const { error, loading } = useAppSelector((state) => state.request);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showNotification, setShowNotification] = useState(true);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // generic handler
  const handleSelectChange = (field: "blood_type", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 👈 call context function
    const payload = {
      ...formData,
      quantity_needed: Number(formData.quantity_needed),
    };
    const requestPromise = dispatch(addRequest(payload)).unwrap();

    try {
      await toast.promise(requestPromise, {
        loading: "sending request...",
        success: "request sent successfully",
        error: <b>{error}</b>,
      });

      router.push("/dashboard");
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-center py-5 px-4 md:px-10 lg:px-20">
      {user?.role !== "ADMIN" && user?.role !== "STAFF" && (
        <div
          className={`${
            showNotification ? "block" : "hidden"
          } bg-yellow-100 border-l-4 border-yellow-500 flex text-yellow-700 p-4 rounded-lg shadow-sm mb-4 relative`}
        >
          <div>
            <p className="font-medium">Reminder</p>
            <p className={` `}>
              Only send a request if you really need blood. Once you submit a
              request, it will be reviewed and approved by an admin.
            </p>
          </div>

          <X
            className="w-7 h-7 absolute right-2 top-2"
            onClick={() => setShowNotification(false)}
          />
        </div>
      )}

      <div className="w-full">
        <div className="mb-6 ">
          <h1 className="text-xl font-medium">Send Blood Request</h1>
          <p className="text-[11px] text-muted-foreground">
            Enter the details below to request blood
          </p>
          {/* logo goes here */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {error && (
              <div className="bg-red-200 text-red-800 border-1 border-red-800 p-4">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="blood_type" className="text-xs">
                Blood type
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("blood_type", value)
                }
              >
                <SelectTrigger className="w-full border-1 border-slate-600">
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
              <Label htmlFor="quantity_needed" className="text-xs">
                Quantity Needed
              </Label>
              <Input
                onChange={handleChange}
                id="quantity_needed"
                type="number"
                placeholder="Enter quantity needed"
                required
                className="border-1 border-slate-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hospital" className="text-xs">
                Hospital (Location)
              </Label>
              <Input
                onChange={handleChange}
                id="hospital"
                type="text"
                placeholder="Enter hospital Name and Location"
                required
                className="border-1 border-slate-600"
              />
            </div>

            <div className="grid gap-2">
              <Button
                type="submit"
                className="w-full bg-[#A30B1C] hover:bg-[#910a1a] disabled:opacity-50 text-white"
                disabled={loading}
              >
                Request Blood
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
