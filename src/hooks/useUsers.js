import { useQuery } from "react-query";
import api from "../services/axiosConfig";

const fetchUsersData = async ({ queryKey }) => {
  const [, { page, limit }] = queryKey;
  const response = await api.get(
    `users?user_type=general&limit=${limit}&page=${page}`
  );
  return response.data;
};

const fetchUserById = async ({ queryKey }) => {
  const [, { id }] = queryKey;
  const response = await api.get(`users/${id}`);
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

export const useSingleUser = (id) => {
  return useQuery(["users", { id }], fetchUserById, {
    staleTime: 300000,
    keepPreviousData: true,
    retry: 0,
    onError: (error) => {
      console.log("Error fetching users data:", error);
    },
  });
};
