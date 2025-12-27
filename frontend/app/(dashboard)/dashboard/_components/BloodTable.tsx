import { formatDataTime } from "@/app/lib/formatData";
import { useAppSelector } from "@/store";
import { BASE_URL } from "@/store/BaseUrl";
import { Blood } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const BloodTable = () => {
    const token = useAppSelector((state) => state.auth.token);
    const fetchBloodData = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/blood/stream`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return res.data.data;

        } catch (error) {
          const axiosError = error as AxiosError<{ message: string }>;
          console.log(axiosError.response?.data?.message || axiosError.message);
        }
    }

    const { data, isLoading, error } = useQuery({
    queryKey: ['bloodRecords'],
    queryFn: fetchBloodData,
  });
//   console.log("Blood Data:", data);
  return (
    <div className="w-full px-4">
      <h2 className="mb-4 text-xl font-bold">Blood Donation Record</h2>
      <div className="overflow-auto rounded-md border">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
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
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data ? (
              data?.map((blood: Blood) => (
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
                  <td className="px-4 py-2 whitespace-nowrap text-gray-700 dark:text-gray-200">
                    <button className="px-6 py-2 bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md font-semibold">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  {[...Array(5)].map((_, i) => (
                    <td key={i} className="px-4 py-2 whitespace-nowrap">
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
  );
};
