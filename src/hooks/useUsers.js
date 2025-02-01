import { useQuery } from "react-query";
import api from "../services/axiosConfig";

const fetchUsersData = async () => {
  const response = await api.get("users");
  return response.data;
};

export const useUsers = () => {
  return useQuery("users", fetchUsersData, {
    staleTime: 300000,
    onError: (error) => {
      console.log("Error fetching dashboard data:", error);
    },
  });
};
