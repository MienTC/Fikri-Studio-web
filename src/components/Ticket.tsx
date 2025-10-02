import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "/api/tickets";
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

interface TicketData {
  id: number;
  title: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  type: string;
  customer: {
    name: string;
  };
  createdAt: string;
}

const priorityColors = {
  HIGH: "bg-red-100 text-red-600",
  MEDIUM: "bg-yellow-100 text-yellow-600",
  LOW: "bg-green-100 text-green-600",
};
const typeColors = {
  INCIDENT: "bg-red-100 text-red-600",
  SUGGESTION: "bg-blue-100 text-blue-600",
  QUESTION: "bg-gray-100 text-gray-600",
  PROBLEM: "bg-orange-100 text-orange-600",
  TASK: "bg-purple-100 text-purple-600",
  OTHER: "bg-gray-100 text-gray-600",
};

const Ticket: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // State để lưu danh sách các ID của ticket được chọn
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!API_URL || !API_TOKEN) {
        setError("Vui lòng kiểm tra lại file .env và khởi động lại server.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        if (response.data && response.data.data) {
          setTickets(response.data.data);
        } else {
          setError("Cấu trúc dữ liệu API trả về không hợp lệ.");
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể kết nối hoặc xác thực với API.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Hàm xử lý khi click vào checkbox "chọn tất cả" ở header
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Nếu check, lấy ID của tất cả các ticket và đưa vào state
      const allTicketIds = tickets.map((ticket) => ticket.id);
      setSelectedTickets(allTicketIds);
    } else {
      // Nếu bỏ check, xóa hết ID trong state
      setSelectedTickets([]);
    }
  };

  const handleSelectOne = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (event.target.checked) {
      setSelectedTickets((prev) => [...prev, id]);
    } else {
      setSelectedTickets((prev) => prev.filter((ticketId) => ticketId !== id));
    }
  };

  const isAllSelected = tickets.length > 0 && selectedTickets.length === tickets.length;

  if (loading) {
    return <div className="flex-1 p-8 text-center text-gray-500">Đang tải danh sách ticket...</div>;
  }

  if (error) {
    return <div className="flex-1 p-8 text-center text-red-600">Lỗi: {error}</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ticket</h1>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50">
            Focus Mode
          </button>
          <button
            onClick={() => navigate("/addticket")}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-700"
          >
            Add Ticket
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-2 flex-wrap">
          <input type="search" placeholder="Search" className="p-2 border rounded-md w-64" />
          
          {selectedTickets.length > 0 && (
            <div className="flex items-center gap-2">
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
                // Vô hiệu hóa nút Update nếu chọn nhiều hơn 1 ticket
                disabled={selectedTickets.length !== 1}
              >
                Update
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg shadow-sm hover:bg-red-700">
                Delete
              </button>
              <span className="text-sm text-gray-500">{selectedTickets.length} selected</span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  {/* [MỚI] Liên kết checkbox header với state và hàm xử lý */}
                  <input 
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                  />
                </th>
                <th scope="col" className="px-6 py-3">Ticket ID</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Priority</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Client</th>
                <th scope="col" className="px-6 py-3">Request Date</th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className={`bg-white border-b hover:bg-gray-50 ${selectedTickets.includes(ticket.id) ? 'bg-blue-50' : ''}`}>
                  <td className="p-4">
                    {/* [MỚI] Liên kết checkbox của từng dòng với state và hàm xử lý */}
                    <input 
                      type="checkbox"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={(e) => handleSelectOne(e, ticket.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">#TC-{ticket.id}</td>
                  <td className="px-6 py-4">{ticket.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${priorityColors[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${typeColors[ticket.type as keyof typeof typeColors] || 'bg-gray-100 text-gray-600'}`}>
                      {ticket.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{ticket.customer.name}</td>
                  <td className="px-6 py-4">{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

