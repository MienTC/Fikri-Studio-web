// src/api.ts
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const API_URL = "https://p01--customer-management-api--pfny5ktx6b4q.code.run";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for logging
api.interceptors.request.use(request => {
  console.log('API Request:', {
    url: request.url,
    method: request.method,
    data: request.data,
    headers: request.headers
  });
  return request;
});

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    if (response.data?.error) {
      toast.error(response.data.message || "Có lỗi xảy ra!");
      return Promise.reject(response.data);
    }
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', {
      message: error.message,
      response: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    const message =
      (error.response?.data as { message?: string })?.message || error.message || "Có lỗi xảy ra!";
    toast.error(message);
    return Promise.reject(error);
  }
);

// Thêm interceptor để tự động gửi token nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
