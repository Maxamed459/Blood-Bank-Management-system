"use client";
import { User } from "@/types/types";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { BASE_URL } from "@/store/BaseUrl";
import { useAppSelector } from "@/store";
import { formatDataTime } from "@/app/lib/formatData";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

export default function MyRequestsPage() {
  const [loading, setLoading] = useState(false);
  const { token } = useAppSelector((state) => state.auth);

  const fetchBloodDonationRecord = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/auth/users/stream`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setDonors(res.data.users);
      toast.success(res.data.message);
      return res.data.users;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.message);
    } finally {
      setLoading(false);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["donors"],
    queryFn: fetchBloodDonationRecord,
    // staleTime: 60000,
  });

  console.log(data);

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
                Fullname
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Username
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Email
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Role
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Gender
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
            {data ? (
              data?.map((donor: User) => (
                <tr
                  key={donor.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donor.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donor.fullname}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donor.username}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donor.email}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donor.role}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {donor.gender}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {formatDataTime(donor.createdAt)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {formatDataTime(donor.updatedAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  {isPending ? (
                    <>
                      <p>there are not donors yet</p>
                    </>
                  ) : (
                    <>
                      <p>there are not donors yet</p>
                    </>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
