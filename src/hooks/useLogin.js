import { useMutation } from "react-query";
import api from "../services/axiosConfig";
import { successAlert } from "../utils/alert";

const loginRequest = async ({ phoneNumber, password }) => {
  const response = await api.post("auth/loginAdmin", {
    phone_number: phoneNumber,
    password: password,
    fcm_token: "fcm_token",
  });
  return response.data;
};

export const useLogin = () => {
  return useMutation(loginRequest, {
    onSuccess: (data) => {
      console.log("LoggedIn Successfully", data);
      successAlert("LoggedIn Successfully");
    },
    onError: (error) => {
      console.log("Error loggedIn:", error);
    },
  });
};
