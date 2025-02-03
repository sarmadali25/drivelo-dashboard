import { useQuery } from "react-query";
import api from "../services/axiosConfig";

const fetchDriversData = async ({ queryKey }) => {
  const [, { page, limit }] = queryKey;
  const response = await api.get(
    `users?user_type=driver&limit=${limit}&page=${page}`
  );
  return response.data;
};

export const useDrivers = ({ page, limit }) => {
  return useQuery(["users", { page, limit }], fetchDriversData, {
    staleTime: 300000,
    keepPreviousData: true,
    retry: 0,
    onError: (error) => {
      console.log("Error fetching users data:", error);
    },
  });
};
