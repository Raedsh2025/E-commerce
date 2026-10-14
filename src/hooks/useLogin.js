import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
  });
};

export { useLogin };

