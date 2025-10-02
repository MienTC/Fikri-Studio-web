// src/services/activityLogService.ts
import api from "../api";

// ---------- Types ----------

// Dữ liệu gửi lên server khi tạo activity log
export interface CreateActivityLogDto {
  action: string;
}

// User info creator
export interface ActivityLogUser {
  id: number;
  name: string;
}

// Dữ liệu trả về 1 activity log
export interface ActivityLogData {
  id: number;
  action: string;
  ticketId: number;
  createdById: number;
  createdAt: string;
  createdBy: ActivityLogUser;
}

// Response lấy tất cả activity log của ticket
export interface ActivityLogsResponse {
  error: boolean;
  code: number;
  message: string;
  data: ActivityLogData[];
}

// Response 1 activity log
export interface ActivityLogResponse {
  error: boolean;
  code: number;
  message: string;
  data: ActivityLogData;
}

// ---------- Service ----------

export const activityLogService = {
  // Tạo activity log
  createActivityLog: async (
    ticketId: number,
    data: CreateActivityLogDto
  ): Promise<ActivityLogData | null> => {
    try {
      const res = await api.post(`/tickets/${ticketId}/activity-logs`, data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Lấy tất cả activity log của ticket
  getActivityLogsByTicket: async (
    ticketId: number
  ): Promise<ActivityLogData[] | null> => {
    try {
      const res = await api.get(`/tickets/${ticketId}/activity-logs`);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  // Lấy chi tiết activity log theo ID
  getActivityLogById: async (
    ticketId: number,
    id: number
  ): Promise<ActivityLogData | null> => {
    try {
      const res = await api.get(`/tickets/${ticketId}/activity-logs/${id}`);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
};
