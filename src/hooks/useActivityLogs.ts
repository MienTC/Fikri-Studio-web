import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activityLogService } from "../services/activityLogsServices";
import type { CreateActivityLogDto, ActivityLogData } from "../services/activityLogsServices";

// Query Keys
export const ACTIVITY_LOG_QUERY_KEYS = {
  activityLogs: (ticketId: number) => ["activityLogs", ticketId],
  activityLog: (ticketId: number, id: number) => ["activityLog", ticketId, id],
};

// Hook để fetch danh sách activity logs của một ticket
export const useActivityLogs = (ticketId: number) => {
  return useQuery<ActivityLogData[]>({
    queryKey: ACTIVITY_LOG_QUERY_KEYS.activityLogs(ticketId),
    queryFn: async () => {
      const result = await activityLogService.getActivityLogsByTicket(ticketId);
      return result || [];
    },
    enabled: !!ticketId, // Chỉ fetch khi có ticketId
  });
};

// Hook để fetch 1 activity log theo ID
export const useActivityLog = (ticketId: number, id: number) => {
  return useQuery<ActivityLogData>({
    queryKey: ACTIVITY_LOG_QUERY_KEYS.activityLog(ticketId, id),
    queryFn: async () => {
      const activityLog = await activityLogService.getActivityLogById(ticketId, id);
      if (!activityLog) {
        throw new Error("Activity log not found");
      }
      return activityLog;
    },
    enabled: !!ticketId && !!id, // Chỉ fetch khi có cả ticketId và id
  });
};

// Hook để tạo activity log mới
export const useCreateActivityLog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ ticketId, data }: { ticketId: number; data: CreateActivityLogDto }) => {
      const activityLog = await activityLogService.createActivityLog(ticketId, data);
      if (!activityLog) {
        throw new Error("Failed to create activity log");
      }
      return activityLog;
    },
    onSuccess: (newActivityLog, { ticketId }) => {
      // Thêm vào cache danh sách activity logs của ticket
      queryClient.setQueryData<ActivityLogData[]>(
        ACTIVITY_LOG_QUERY_KEYS.activityLogs(ticketId),
        (oldLogs = []) => [newActivityLog, ...oldLogs]
      );
    },
  });
};
