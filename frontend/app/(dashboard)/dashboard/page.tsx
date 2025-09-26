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
import RequestStatusUpdate from "./_components/RequestStatusUpdate";

export default function Page() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const requests = useAppSelector((state) => state.request.request);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [blood, setBlood] = useState<Blood[]>([]);

  useEffect(() => {
    dispatch(loadUserFromStorage());
    const fetchBlood = async () => {
      const bloods = await dispatch(getAllBloodRecord()).unwrap();
      setBlood(bloods.data);
    };

    const fetchRequests = async () => {
      dispatch(getAllRequests()).unwrap();
    };

    fetchBlood();
    fetchRequests();
  }, [dispatch]);

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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="w-full px-4">
                <h2 className="px-4 py-2 text-xl font-bold">
                  Here are the requests that needs to approve
                </h2>
                <div className="overflow-auto rounded-md border">
                  <table className="min-w-[950px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Requester Id
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Blood type
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Quantity needed
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Hospital
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Status
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          CreatedAt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {requests && requests.length > 0 ? (
                        requests
                          .filter((request) => request.status === "PENDING") // keep only pending
                          .map((request) => (
                            <tr
                              key={request.id}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                {request.requester_id}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                {request.blood_type}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                {request.quantity_needed} L
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                {request.hospital}
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
                              {user?.role === "ADMIN" && (
                                <>
                                  <td className="px-4 py-2 whitespace-nowrap">
                                    <div className="flex gap-2">
                                      <RequestStatusUpdate
                                        id={request.id}
                                        title="APPROVE"
                                        className="bg-green-400 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                                        status="APPROVED"
                                      />
                                      <RequestStatusUpdate
                                        id={request.id}
                                        title="REJECT"
                                        className="bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        status="REJECTED"
                                      />
                                    </div>
                                  </td>
                                </>
                              )}
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td
                            colSpan={user?.role === "ADMIN" ? 7 : 6}
                            className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                          >
                            No pending requests found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full px-4">
                <h2 className="px-4 py-2 text-xl font-bold">
                  Blood Donation Record
                </h2>
                <div className="overflow-auto rounded-md border">
                  <table className="min-w-[950px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Id
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          TYpe
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Quantity
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Donor Id
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                          Donated Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {blood ? (
                        blood?.map((blood) => (
                          <tr
                            key={blood.id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {blood.id}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {blood.type}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {blood.quantity} L
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {blood.donorId}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {formatDataTime(blood.createdAt)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <>
                          <tr>
                            {[...Array(5)].map((_, i) => (
                              <td
                                key={i}
                                className="px-4 py-2 whitespace-nowrap"
                              >
                                <div className="h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700"></div>
                              </td>
                            ))}
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {user?.role === "USER" && (
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="w-full px-4">
              <h2 className="px-4 py-2 text-xl font-bold">
                Blood Requests please donate if you have those blood type
              </h2>
              <div className="overflow-auto rounded-md border">
                <table className="min-w-[950px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Requester Id
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Blood type
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Quantity needed
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Hospital
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        Status
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                        CreatedAt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {requests && requests.length > 0 ? (
                      requests
                        .filter((request) => request.status === "APPROVED") // keep only pending
                        .map((request, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {request.requester_id}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {request.blood_type}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {request.quantity_needed} L
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {request.hospital}
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
                          </tr>
                        ))
                    ) : (
                      <tr>
                        {[...Array(6)].map((_, i) => (
                          <td key={i} className="px-4 py-2 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded animate-pulse dark:bg-gray-700"></div>
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
