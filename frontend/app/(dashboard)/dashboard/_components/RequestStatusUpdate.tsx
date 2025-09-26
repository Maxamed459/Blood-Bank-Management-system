"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateRequest } from "@/store/slices/requestSlice";
import toast from "react-hot-toast";
import { useState } from "react";

export default function RequestStatusUpdate({
  id,
  title,
  className,
  status,
}: {
  id: string;
  title: string;
  className: string;
  status: string;
}) {
  const { error, loading } = useAppSelector((state) => state.request);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useAppDispatch();
  const updateRequestStatus = async () => {
    if (isUpdating) return; // Prevent multiple clicks

    setIsUpdating(true);
    const updatedPromise = dispatch(
      updateRequest({
        id,
        requestData: {
          status,
        },
      })
    ).unwrap();

    try {
      await toast.promise(updatedPromise, {
        loading: "updating request status...",
        success: "request status updated successfully",
        error: <b>{error}</b>,
      });
    } catch (err) {
      console.error("Request failed:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Button
      onClick={updateRequestStatus}
      className={className}
      disabled={isUpdating || loading}
    >
      {isUpdating ? "Updating..." : title}
    </Button>
  );
}
