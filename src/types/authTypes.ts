export interface User {
  id: number;
  name: string;
  fullname?: string;
  email: string;
  role: "ADMIN" | "MEMBER";
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  user: User;
  access_token: string;
}

export interface SignUpData {
  user: User;
  access_token: string;
}

export interface ApiResponse<T> {
  error: boolean;
  code: number;
  message: string;
  data: T;
  traceId: string;
}
