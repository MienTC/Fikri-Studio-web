import api from '../services/api';

// Hàm gọi API xác thực token
export async function checkTokenValid(): Promise<boolean> {
  try {
    // Gọi API xác thực token, ví dụ /auth/me hoặc /auth/verify
    // Nếu backend dùng /auth/me thì chỉ cần GET, nếu /auth/verify thì có thể cần POST
    const res = await api.get('/auth/me');
    // Nếu trả về user info thì token hợp lệ
    return !!res.data && !res.data.error;
  } catch (err: any) {
    // Nếu lỗi 401/403 hoặc bất kỳ lỗi nào, coi như token hết hạn
    return false;
  }
}
