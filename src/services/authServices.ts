// src/services/authService.ts
import axios from "axios";
import type { LoginDto, LoginData, ApiResponse } from "../types/authTypes";

const API_URL = "https://p01--customer-management-api--pfny5ktx6b4q.code.run";

// Tạo instance riêng cho auth để tránh conflict với interceptor
const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  login: async (data: LoginDto): Promise<LoginData | null> => {
    try {
      console.log("Attempting login with:", data);
      const res = await authApi.post<ApiResponse<LoginData>>("/auth/login", data);
      console.log("Login API response:", res.data);
      
      if (res.data && res.data.data) {
        return res.data.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Login API error:", error);
      throw error; // Re-throw để component có thể handle
    }
  },
};
