import { formatDataTime } from "@/app/lib/formatData";
import { useAppSelector } from "@/store";
import { BASE_URL } from "@/store/BaseUrl";
import { Request } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const BloodRequests = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/request`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(axiosError.response?.data?.message || axiosError.message);
    }
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["blood-requests"],
    queryFn: fetchRequests,
    staleTime: 60000, // 1 minute
  });

  return (
    <div className="w-full px-4">
      <h2 className="mb-4 text-xl font-bold">
        Blood Requests please donate if you have those blood type
      </h2>
      <div className="overflow-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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
            {data && data.length > 0 ? (
              data
                .filter((request: Request) => request.status === "APPROVED") // keep only pending
                .map((request: Request) => (
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
  );
};
