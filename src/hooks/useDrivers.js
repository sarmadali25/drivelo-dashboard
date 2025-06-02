import { useQuery, useMutation } from "react-query";
import { successAlert } from "../utils/alert";
import api from "../services/axiosConfig";

const fetchDriversData = async ({ queryKey }) => {
  const [, { page, limit }] = queryKey;
  const response = await api.get(
    `auth/users?user_type=driver&limit=${limit}&page=${page}`
  );
  return response.data;
};

const approveSignupRequest = async ({ id }) => {
  const response = await api.patch(`auth/users/${id}/approve`);
  return response.data;
};

export const useDrivers = ({ page, limit }) => {
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["users", { page, limit }],
    fetchDriversData,
    {
      retry: 0,
      onError: (error) => {
        console.log("Error fetching users data:", error);
      },
    }
  );

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useApproveDriver = () => {
  return useMutation(approveSignupRequest, {
    onSuccess: () => {
      successAlert("Driver verified successfully");
    },
    onError: (error) => {
      console.log("Error approving payment:", error);
    },
  });
};
