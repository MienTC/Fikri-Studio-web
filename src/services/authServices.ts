// src/services/authService.ts
import api from "./api";
import type { LoginDto, LoginData, ApiResponse } from "../types/authTypes";

export const authService = {
  login: async (data: LoginDto): Promise<LoginData | null> => {
    try {
      const res = await api.post<ApiResponse<LoginData>>("/auth/login", data);
      // Success toast do component quyết định
      return res.data.data;
    } catch {
      return null; // lỗi đã được toast trong interceptor
    }
  },
};
