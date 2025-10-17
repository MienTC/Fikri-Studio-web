// src/services/authService.ts
import axios from "axios";
import type { LoginDto, LoginData, SignUpDto, SignUpData, ApiResponse } from "../types/authTypes";

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

  signUp: async (data: SignUpDto): Promise<SignUpData | null> => {
    try {
      console.log("Attempting sign up with:", data);
      const res = await authApi.post<ApiResponse<SignUpData>>("/auth/register", data);
      console.log("Sign up API response:", res.data);

      // Check if API response indicates success but data is null (user created but no token)
      if (res.data && res.data.error === false && res.data.code === 201) {
        // User registered successfully but no data returned
        return { user: { id: 0, name: data.name, email: data.email, role: "MEMBER", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, access_token: "" };
      }

      if (res.data && res.data.data) {
        return res.data.data;
      } else {
        // Check if response has direct data without wrapper
        if (res.data && typeof res.data === 'object' && 'user' in res.data && 'access_token' in res.data) {
          return res.data as SignUpData;
        }
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Sign up API error:", error);
      throw error; // Re-throw để component có thể handle
    }
  },
};
