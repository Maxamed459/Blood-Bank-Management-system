"use client";
import { Blood } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/store/BaseUrl";
import { useAppSelector } from "@/store";
import { formatDataTime } from "@/app/lib/formatData";
import toast from "react-hot-toast";

export default function MyDonationsPage() {
  const [donations, setDonations] = useState<Blood[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { token } = useAppSelector((state) => state.auth);
  const donorId = user?.id;
  useEffect(() => {
    const fetchBloodDonationRecord = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/blood/donation-record/${donorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDonations(res.data.data);
        toast.success("here are your blood donation record");
      } catch (error) {
        const axiosError = error as AxiosError<{ message: string }>;
        toast.error(axiosError.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBloodDonationRecord();
  }, [donorId, token]);

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
                Donor Id
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
            {donations ? (
              donations?.map((donation) => (
                <tr
                  key={donation.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donation.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donation.type}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donation.quantity}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donation.donorId}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {formatDataTime(donation.createdAt)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {formatDataTime(donation.updatedAt)}
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
