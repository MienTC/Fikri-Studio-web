import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

// Types
export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

interface TicketsResponse {
  data: Ticket[];
  total?: number;
}

// Query Keys
export const QUERY_KEYS = {
  tickets: ["tickets"],
  ticket: (id: number) => ["ticket", id],
};

// Hook để fetch tickets
export const useTickets = () => {
  return useQuery<Ticket[]>({
    queryKey: QUERY_KEYS.tickets,
    queryFn: async () => {
      const response = await api.get<TicketsResponse>("/tickets");
      const tickets = response.data.data || [];
      
      // Sắp xếp theo updatedAt mới nhất
      return tickets.sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    },
  });
};

// Hook để fetch 1 ticket theo ID
export const useTicket = (id: number) => {
  return useQuery<Ticket>({
    queryKey: QUERY_KEYS.ticket(id),
    queryFn: async () => {
      const response = await api.get(`/tickets/${id}`);
      return response.data.data;
    },
    enabled: !!id, // Chỉ fetch khi có id
  });
};

// Hook để tạo ticket mới
export const useCreateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTicket: Omit<Ticket, "id" | "createdAt" | "updatedAt">) => {
      const response = await api.post("/tickets", newTicket);
      return response.data.data;
    },
    onSuccess: (newTicket) => {
      // Cập nhật cache - thêm ticket mới vào đầu danh sách
      queryClient.setQueryData<Ticket[]>(QUERY_KEYS.tickets, (oldTickets = []) => {
        return [newTicket, ...oldTickets];
      });

      // Hoặc invalidate để refetch
      // queryClient.invalidateQueries({ queryKey: QUERY_KEYS.tickets });
    },
  });
};

// Hook để update ticket
export const useUpdateTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Ticket> }) => {
      const response = await api.put(`/tickets/${id}`, data);
      return response.data.data;
    },
    onSuccess: (updatedTicket) => {
      // Cập nhật cache - đưa ticket vừa update lên đầu
      queryClient.setQueryData<Ticket[]>(QUERY_KEYS.tickets, (oldTickets = []) => {
        const filtered = oldTickets.filter((t) => t.id !== updatedTicket.id);
        return [updatedTicket, ...filtered];
      });

      // Cập nhật cache của ticket detail
      queryClient.setQueryData(QUERY_KEYS.ticket(updatedTicket.id), updatedTicket);
    },
  });
};

// Hook để xóa ticket
export const useDeleteTicket = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tickets/${id}`);
      return id;
    },
    onSuccess: (deletedId) => {
      // Xóa khỏi cache
      queryClient.setQueryData<Ticket[]>(QUERY_KEYS.tickets, (oldTickets = []) => {
        return oldTickets.filter((t) => t.id !== deletedId);
      });

      // Xóa cache của ticket detail
      queryClient.removeQueries({ queryKey: QUERY_KEYS.ticket(deletedId) });
    },
  });
};