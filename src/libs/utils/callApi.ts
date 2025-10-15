import type { ApiResponse } from "../../types/authTypes";

export async function callApi<T>(
  apiCall: () => Promise<{ data: ApiResponse<T> }>
): Promise<T | null> {
  try {
    const res = await apiCall();

    if (res.data.error) {
      // optional: log server message
      console.warn("API error:", res.data.message);
      return null;
    }

    return res.data.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e: unknown) {
    // lỗi mạng, 500,… đã được toast interceptor
    return null;
  }
}
