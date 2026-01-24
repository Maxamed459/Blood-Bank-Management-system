"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { getStaff } from "@/store/slices/authSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
// adjust path to where User is defined

export default function Staff() {
  const staff = useAppSelector((state) => state.auth.staff);
  console.log(staff);
  const dispatch = useAppDispatch();

  const fetchStaff = async () => {
    try {
      const staffPromise = dispatch(getStaff()).unwrap();
      await toast.promise(staffPromise, {
        loading: "Getting all staff...",
        success: "Here are the staff list",
        error: (err) => <b>{err || "Failed to load staff"}</b>,
      });
    } catch (err) {
      console.error("Staff fetch failed:", err);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaff,
    staleTime: 60000,
  });

  return (
    <div className="w-full p-4">
      <div className="overflow-hidden rounded-md border">
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
                Blood Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Gender
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {staff ? (
              staff?.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.id}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.fullname}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.username}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.email}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.blood_type}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.gender}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    {staff.role}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td className="bg-gray-400 px-4 py-2 whitespace-nowrap"></td>
                  <td className="bg-gray-400 p-2"></td>
                  <td className="bg-gray-400 p-2"></td>
                  <td className="bg-gray-400 p-2"></td>
                  <td className="bg-gray-400 p-2"></td>
                  <td className="bg-gray-400 p-2"></td>
                  <td className="bg-gray-400 p-2"></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
