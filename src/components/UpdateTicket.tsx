import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// --- Các mảng dữ liệu tĩnh (để làm ví dụ) ---
// Trong thực tế, danh sách này nên được lấy từ API
const customers = [
  { id: 4, name: "Công ty ABC" },
  { id: 5, name: "Tập đoàn XYZ" },
  { id: 6, name: "Khách hàng lẻ" },
];
const priorities: ("HIGH" | "MEDIUM" | "LOW")[] = ["HIGH", "MEDIUM", "LOW"];
const ticketTypes = ["INCIDENT", "QUESTION", "SUGGESTION", "PROBLEM", "TASK", "OTHER"];

const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const UpdateTicket: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // --- State cho các trường trong form ---
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"HIGH" | "MEDIUM" | "LOW">("MEDIUM");
  const [ticketType, setTicketType] = useState("INCIDENT");
  const [customerId, setCustomerId] = useState<number | string>(""); // State cho client/customer
  const [createdAt, setCreatedAt] = useState(""); // State cho ngày tạo

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect để tải dữ liệu của ticket khi component được render
  useEffect(() => {
    if (!id) return;

    const fetchTicketData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/tickets/${id}`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const ticket = response.data.data;
        
        // Điền dữ liệu lấy được vào các state tương ứng
        setSubject(ticket.title); // API trả về 'title', ta dùng nó cho 'subject'
        setDescription(ticket.description);
        setPriority(ticket.priority);
        setTicketType(ticket.type);
        setCustomerId(ticket.customer.id); // Lấy id của customer
        setCreatedAt(ticket.createdAt); // Lấy ngày tạo

      } catch (err) {
        setError("Failed to fetch ticket data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [id]); 

  // Hàm xử lý khi nhấn nút "Save Changes"
  const handleUpdate = async () => {
    // Gom các dữ liệu đã chỉnh sửa để gửi đi
    const updatedData = {
      title: subject, // Gửi đi với key là 'title' như API yêu cầu
      description,
      priority,
      type: ticketType,
      customerId: Number(customerId), // Đảm bảo customerId là một con số
    };

    try {
      await axios.patch(`/api/tickets/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      navigate("/ticket"); // Quay về trang danh sách sau khi thành công
    } catch (err) {
      setError("Failed to update ticket.");
      console.error(err);
    }
  };

  const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm transition disabled:bg-gray-100";

  if (loading) return <div className="p-8 text-center">Loading ticket data...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="flex-1 p-4 sm:p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">
          Update Ticket
        </h2>
        
        <div className="space-y-6">
          {/* --- Các trường dữ liệu đã được cập nhật --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ticket-id" className="block text-sm font-medium text-gray-700 mb-1">Ticket ID</label>
              <input id="ticket-id" type="text" className={inputStyle} value={`#TC-${id}`} disabled />
            </div>
            <div>
              <label htmlFor="request-date" className="block text-sm font-medium text-gray-700 mb-1">Request Date</label>
              <input id="request-date" type="text" className={inputStyle} value={new Date(createdAt).toLocaleString()} disabled />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input id="subject" type="text" className={`inputStyle p-2`} value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="description" className={`${inputStyle} p-2 min-h-[150px]`} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">Client</label>
            <select id="client" className={inputStyle} value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
              <option value="" disabled>Select a client</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select className={inputStyle} value={priority} onChange={(e) => setPriority(e.target.value as any)}>
                {priorities.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select id="ticketType" className={inputStyle} value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                {ticketTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end gap-4">
          <button type="button" onClick={() => navigate("/ticket")} className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="button" onClick={handleUpdate} className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTicket;