import { useQuery } from "react-query";
import api from "../services/axiosConfig";

const fetchUsersData = async ({ queryKey }) => {
  const [, { page, limit }] = queryKey;
  const response = await api.get(`users?limit=${limit}&page=${page}`);
  return response.data;
};

export const useUsers = ({ page, limit }) => {
  return useQuery(["users", { page, limit }], fetchUsersData, {
    staleTime: 300000,
    keepPreviousData: true,
    retry: 0,
    onError: (error) => {
      console.log("Error fetching users data:", error);
    },
  });
};
