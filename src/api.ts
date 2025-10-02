// src/api.ts
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";


const api = axios.create({
  baseURL: "https://p01--customer-management-api--pfny5ktx6b4q.code.run",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: xử lý lỗi global
api.interceptors.response.use(
  (response) => {
    if (response.data?.error) {
      toast.error(response.data.message || "Có lỗi xảy ra!");
      return Promise.reject(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    const message =
      error.response?.data?.message || error.message || "Có lỗi xảy ra!";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
