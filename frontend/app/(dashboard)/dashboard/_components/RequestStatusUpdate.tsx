"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateRequest } from "@/store/slices/requestSlice";
import { Request } from "@/types/types";
import { useState } from "react";
import toast from "react-hot-toast";

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
  const [requests, setRequests] = useState<Request[]>([]);
  const { error, loading } = useAppSelector((state) => state.request);

  const dispatch = useAppDispatch();
  const updateRequestStatus = async () => {
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
    }
  };

  return (
    <Button onClick={updateRequestStatus} className={className}>
      {title}
    </Button>
  );
}
