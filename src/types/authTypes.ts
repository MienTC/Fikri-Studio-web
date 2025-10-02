export interface User {
  id: number;
  email: string;
  role: string;
  avatar: string | null;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginData {
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
