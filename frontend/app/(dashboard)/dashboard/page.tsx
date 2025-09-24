"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { useAppSelector, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadUserFromStorage } from "@/store/slices/authSlice";
import { getAllBloodRecord } from "@/store/slices/bloodSlice";
import { Blood, Request } from "@/types/types";
import { formatDataTime } from "@/app/lib/formatData";
import { getAllRequests } from "@/store/slices/requestSlice";
import { Button } from "@/components/ui/button";
import RequestStatusUpdate from "./_components/RequestStatusUpdate";

export default function Page() {
  const { user, loading } = useAppSelector((state) => state.auth);
  // const { blood } = useAppSelector((state) => state.blood);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [blood, setBlood] = useState<Blood[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    dispatch(loadUserFromStorage());
    const fetchBlood = async () => {
      const bloods = await dispatch(getAllBloodRecord()).unwrap();
      console.log("Here are the bloods", bloods);
      setBlood(bloods.data);
    };

    const fetchRequests = async () => {
      const requests = await dispatch(getAllRequests()).unwrap();
      console.log("here are the requests: ", requests);
      setRequests(requests.data);
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
  console.log(requests);
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
                  <table className="min-w-[800px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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
                                {request.status}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                                {formatDataTime(request.createdAt)}
                              </td>
                              <td>
                                <RequestStatusUpdate
                                  id={request.id}
                                  title="APPROVE"
                                  className="bg-green-400 hover:bg-green-600 mx-2"
                                  status="APPROVED"
                                />
                              </td>
                              <td>
                                <RequestStatusUpdate
                                  id={request.id}
                                  title="REJECT"
                                  className="bg-red-400 hover:bg-red-600 mx-2"
                                  status="REJECTED"
                                />
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          {[...Array(7)].map((_, i) => (
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
              <div className="w-full px-4">
                <h2 className="px-4 py-2 text-xl font-bold">
                  Blood Donation Record
                </h2>
                <div className="overflow-auto rounded-md border">
                  <table className="min-w-[900px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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
                <table className="min-w-[800px] divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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
                              {request.status}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                              {formatDataTime(request.createdAt)}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        {[...Array(7)].map((_, i) => (
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
