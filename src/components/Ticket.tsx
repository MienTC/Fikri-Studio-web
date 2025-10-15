import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTickets, useDeleteTicket } from "../hooks/useTickets";
import { useAuth } from "../context/AuthProvider";

const priorityColors: Record<string, string> = {
  HIGH: "bg-red-100 text-red-600",
  MEDIUM: "bg-yellow-100 text-yellow-600",
  LOW: "bg-green-100 text-green-600",
};

const typeColors: Record<string, string> = {
  INCIDENT: "bg-red-100 text-red-600",
  SUGGESTION: "bg-blue-100 text-blue-600",
  QUESTION: "bg-gray-100 text-gray-600",
  PROBLEM: "bg-orange-100 text-orange-600",
  TASK: "bg-purple-100 text-purple-600",
  OTHER: "bg-gray-100 text-gray-600",
};

interface TicketData {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  type: string;
  customer?: { name: string };
  createdAt?: string;
  updatedAt?: string;
}

const Ticket: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: tickets = [], isLoading, error } = useTickets();
  const deleteTicketMutation = useDeleteTicket();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAdmin = user?.role === "ADMIN";

  // Chọn tất cả
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(tickets.map((t) => t.id));
    } else {
      setSelectedIds([]);
    }
  };

  // Chọn từng dòng
  const handleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Xóa nhiều ticket
  const handleDeleteSelected = async () => {
    if (!isAdmin) {
      toast.error("Bạn không có quyền xóa ticket");
      return;
    }

    const loadingToast = toast.loading(`Đang xóa ${selectedIds.length} ticket...`);

    try {
      // Xóa từng ticket bằng React Query mutation
      for (const id of selectedIds) {
        await deleteTicketMutation.mutateAsync(id);
      }

      setSelectedIds([]);
      toast.dismiss(loadingToast);
      toast.success(`Xóa ${selectedIds.length} ticket thành công`);
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(`Xóa thất bại: ${error?.message || "Lỗi không xác định"}`);
      console.error("Delete error:", error);
    }
  };

  const handleUpdateSelected = () => {
    if (selectedIds.length > 0) {
      navigate(`/update-ticket/${selectedIds[0]}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Tickets</h1>
            <button
              className="bg-green-400 p-2 hover:bg-green-600 text-white rounded-lg"
              onClick={() => navigate("/addticket")}
            >
              Add Ticket
            </button>
          </div>

          {/* Action buttons - chỉ hiển thị cho ADMIN */}
          {selectedIds.length > 0 && isAdmin && (
            <div className="justify-end mb-4 flex gap-2 items-center">
              <button
                onClick={handleUpdateSelected}
                className={`px-4 py-2 bg-blue-500 text-white rounded text-sm transition ${
                  selectedIds.length === tickets.length
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
                disabled={selectedIds.length === tickets.length}
                title={
                  selectedIds.length === tickets.length
                    ? "Không thể update tất cả ticket cùng lúc"
                    : ""
                }
              >
                Update
              </button>

              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-300 text-sm"
              >
                Delete
              </button>

              <span className="text-sm text-gray-500">
                Đã chọn: {selectedIds.length}
              </span>
            </div>
          )}

          {/* Thông báo cho MEMBER */}
          {!isAdmin && selectedIds.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Bạn không có quyền chỉnh sửa hoặc xóa ticket. Chỉ ADMIN mới có thể thực hiện các thao tác này.
              </p>
            </div>
          )}

          {/* Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2">
                      <input
                        type="checkbox"
                        className="accent-blue-500 w-4 h-4 rounded"
                        checked={
                          selectedIds.length === tickets.length && tickets.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-3 py-2 text-right"></th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {(tickets || []).map((t) => {
                    const isSelected = selectedIds.includes(t.id);
                    return (
                      <tr
                        key={t.id}
                        className={`hover:bg-blue-50 transition ${
                          isSelected ? "ring-2 ring-blue-300 bg-blue-50" : ""
                        }`}
                      >
                        <td className="px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            className="accent-blue-500 w-4 h-4 rounded"
                            checked={isSelected}
                            onChange={() => handleSelect(t.id)}
                          />
                        </td>
                        <td className="px-3 py-2 text-xs font-semibold text-gray-700">
                          #TC-{t.id}
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-900 truncate max-w-[220px]">
                          {t.title}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                              priorityColors[t.priority] ??
                              "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                              typeColors[(t as any).type] ?? "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {(t as any).type}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-sm text-gray-700">
                          {(t as any).customer?.name ?? "-"}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap">
                          {t.createdAt
                            ? new Date(t.createdAt).toLocaleString()
                            : "-"}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button className="p-1 rounded-full hover:bg-gray-100">
                            <svg
                              width="20"
                              height="20"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="text-gray-400"
                            >
                              <circle cx="12" cy="5" r="1.5" />
                              <circle cx="12" cy="12" r="1.5" />
                              <circle cx="12" cy="19" r="1.5" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
