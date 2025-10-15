import api from "./api";

export interface UserData {
  id: number;
  name: string;
  fullname?: string;
  email: string;
  password?: string; // For admin to view
  role: "ADMIN" | "MEMBER";
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type Role = "ADMIN" | "MEMBER";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: Role;        // optional
  avatar?: string;    // optional
}

export const userService = {
  // Tạo user mới (admin)
  createUser: async (data: CreateUserDto): Promise<UserData | null> => {
    try {
      const res = await api.post("/users", data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Lấy danh sách tất cả user (admin)
  getUsers: async (): Promise<UserData[] | null> => {
    try {
      const res = await api.get("/users");
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Lấy thông tin user theo id
  getUserById: async (id: number): Promise<UserData | null> => {
    try {
      const res = await api.get(`/users/${id}`);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Cập nhật user theo id
  updateUser: async (id: number, data: Partial<CreateUserDto>): Promise<UserData | null> => {
    try {
      const res = await api.put(`/users/${id}`, data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Xóa user theo id (admin)
  deleteUser: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  // Cập nhật mật khẩu (chỉ chính user)
  updatePassword: async (data: { oldPassword: string; newPassword: string }): Promise<boolean> => {
    try {
      await api.put("/users/password", data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};
