"use client";
import { SectionCards } from "@/components/section-cards";
import { useAppSelector, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserFromStorage } from "@/store/slices/authSlice";
import { getAllBloodRecord } from "@/store/slices/bloodSlice";
import { Blood } from "@/types/types";
import { formatDataTime } from "@/app/lib/formatData";
import { getAllRequests } from "@/store/slices/requestSlice";
import { BloodTable } from "./_components/BloodTable";
import { ApproveRequest } from "./_components/ApproveRequest";
import { BloodRequests } from "./_components/BloodRequests";
import dynamic from "next/dynamic";

const LineChartComponent = dynamic(
  () => import("@/components/chart/LineChart"),
  { ssr: false },
);

const data = [
  { name: "A+", value: 30 },
  { name: "A-", value: 45 },
  { name: "B+", value: 28 },
  { name: "B-", value: 50 },
  { name: "AB+", value: 20 },
  { name: "AB-", value: 60 },
  { name: "O+", value: 50 },
  { name: "O-", value: 80 },
];

export default function Page() {
  const { user, loading, token } = useAppSelector((state) => state.auth);
  const requests = useAppSelector((state) => state.request.request);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [blood, setBlood] = useState<Blood[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }
  return (
    <>
      {(user?.role === "ADMIN" || user?.role === "STAFF") && (
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-4">
              <SectionCards />
              <div className="flex flex-col px-4 space-y-5">
                <div>
                  <h2 className="text-xl font-semibold">Blood type</h2>
                  <p className="text-sm">The weekly range of blood types</p>
                </div>
                <LineChartComponent data={data} />
              </div>
              <ApproveRequest />
              <BloodTable />
            </div>
          </div>
        </div>
      )}
      <BloodRequests />
    </>
  );
}
