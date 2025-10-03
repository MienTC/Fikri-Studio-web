// src/services/ticketService.ts
import api from "./api";

// ---------- Types ----------

// Enum giả lập frontend
export type TicketStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "SOLVED"
  | "CLOSED"
  | "PENDING";
export type TicketPriority = "LOW" | "MEDIUM" | "HIGH";
export type TicketType = "INCIDENT" | "QUESTION" | "TASK" | "OTHER";

// DTO gửi lên server khi tạo/cập nhật ticket
export interface CreateTicketDto {
  title: string;
  description?: string;
  customerId: number;
  assignedToId?: number;
  status?: TicketStatus;
  priority?: TicketPriority;
  type?: TicketType;
  tags?: string[];
  followerIds?: number[];
}

// User info (creator/assignee/follower)
export interface TicketUser {
  id: number;
  name: string;
}

// Customer info trong ticket
export interface TicketCustomer {
  id: number;
  name: string;
  email: string;
}

// Dữ liệu trả về 1 ticket
export interface TicketData {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  tags: string[];
  createdById: number;
  assignedToId?: number;
  customerId: number;
  createdAt: string;
  updatedAt: string;
  createdBy: TicketUser;
  assignedTo?: TicketUser;
  customer: TicketCustomer;
  followers: TicketUser[];
}

// ---------- Service ----------

export const ticketService = {
  createTicket: async (data: CreateTicketDto): Promise<TicketData | null> => {
    try {
      const res = await api.post("/tickets", data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  getTickets: async (): Promise<TicketData[] | null> => {
    try {
      const res = await api.get("/tickets");
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  getTicketById: async (id: number): Promise<TicketData | null> => {
    try {
      const res = await api.get(`/tickets/${id}`);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  updateTicket: async (
    id: number,
    data: Partial<CreateTicketDto>
  ): Promise<TicketData | null> => {
    try {
      const res = await api.put(`/tickets/${id}`, data);
      return res.data.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  deleteTicket: async (id: number): Promise<boolean> => {
    try {
      const res = await api.delete(`/tickets/${id}`);
      if (res.data && res.data.error) {
        console.error('Delete ticket error:', res.data.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
};
