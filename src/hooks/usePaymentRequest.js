import { useQuery, useMutation } from "react-query";
import api from "../services/axiosConfig";
import { successAlert } from "../utils/alert";

const fetchPayments = async ({ queryKey }) => {
  const [, { page, limit }] = queryKey;
  const response = await api.get(
    `pusher/getAllInvoices?limit=${limit}&page=${page}`
  );
  return response.data;
};

const approvePaymentRequest = async ({ transaction_id, status }) => {
  const response = await api.post("pusher/approveFee", {
    transaction_id,
    status,
  });
  return response.data;
};

export const usePaymentRequest = ({ page, limit }) => {
  return useQuery(["payments", { page, limit }], fetchPayments, {
    staleTime: 300000,
    keepPreviousData: true,
    retry: 0,
    onError: (error) => {
      console.log("Error fetching users data:", error);
    },
  });
};

export const useApprovePaymentRequest = () => {
  return useMutation(approvePaymentRequest, {
    onSuccess: (data) => {
      console.log("Payment Approved", data);
      successAlert("Payment Approved");
    },
    onError: (error) => {
      console.log("Error approving payment:", error);
    },
  });
};
