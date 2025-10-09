import api from "./api";

// src/types/customerTypes.ts

// DTO gửi lên server khi tạo hoặc update khách hàng
export interface CreateCustomerDto {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

// User creator info
export interface CustomerCreatedBy {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

// Dữ liệu trả về 1 khách hàng
export interface CustomerData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: number;
  createdBy: CustomerCreatedBy;
}

// Response lấy danh sách khách hàng
export interface CustomersResponse {
  error: boolean;
  code: number;
  message: string;
  data: CustomerData[];
  traceId?: string;
}

// Response 1 khách hàng
export interface CustomerResponse {
  error: boolean;
  code: number;
  message: string;
  data: CustomerData;
  traceId?: string;
}

export const customerService = {
  // Tạo khách hàng mới
  createCustomer: async (
    data: CreateCustomerDto
  ): Promise<CustomerData | null> => {
    try {
      const res = await api.post("/customers", data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Lấy danh sách khách hàng
  getCustomers: async (): Promise<CustomerData[] | null> => {
    try {
      const res = await api.get("/customers");
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Lấy khách hàng theo ID
  getCustomerById: async (id: number): Promise<CustomerData | null> => {
    try {
      const res = await api.get(`/customers/${id}`);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Cập nhật thông tin khách hàng
  updateCustomer: async (
    id: number,
    data: Partial<CreateCustomerDto>
  ): Promise<CustomerData | null> => {
    try {
      const res = await api.put(`/customers/${id}`, data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Xóa khách hàng
  deleteCustomer: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/customers/${id}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};
