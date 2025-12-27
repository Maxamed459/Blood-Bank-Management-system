"use client";
import { Request } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/store/BaseUrl";
import { useAppSelector } from "@/store";
import { formatDataTime } from "@/app/lib/formatData";
import toast from "react-hot-toast";

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { token } = useAppSelector((state) => state.auth);
  const requester_id = user?.id;
  useEffect(() => {
    const fetchBloodDonationRecord = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/request/${requester_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data.data);
        toast.success(res.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBloodDonationRecord();
  }, [requester_id, token]);

  if (loading) <p>Loading...</p>;

  return (
    <div className="@container/main p-4">
      <div className="overflow-auto rounded-md border ">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Hospital
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Requester Id
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Created At
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {requests ? (
              requests?.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {request.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {request.blood_type}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {request.quantity_needed}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {request.hospital}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {request.requester_id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : request.status === "APPROVED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {formatDataTime(request.createdAt)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {formatDataTime(request.updatedAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                  You have not made any blood donation records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
