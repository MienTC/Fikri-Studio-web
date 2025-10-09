import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ticket from "./components/Ticket";
import CreateTicket from "./components/CreateTicket";
import UpdateTicket from "./components/UpdateTicket";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Charts from "./components/Charts";
import api from "./services/api";
import Login from "./components/login";

interface TicketData {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  type: string;
  customer?: {
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

const App: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      console.log("Fetching tickets...");
      const res = await api.get("/tickets");
      console.log("API response:", res.data);

      if (res.data && res.data.data) {
        const sorted = res.data.data.sort(
          (a: TicketData, b: TicketData) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
            const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
            return dateB - dateA;
          }
        );
        console.log("Sorted tickets:", sorted);
        setTickets(sorted);
      } else {
        console.log("No tickets data found in response");
        setTickets([]);
      }
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setTickets([]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Thêm mới ticket
  const handleAddTicket = (newTicket: TicketData) => {
    console.log("handleAddTicket called with:", newTicket);
    setTickets((prev) => {
      console.log("Current tickets:", prev);
      const updated = [newTicket, ...prev];
      console.log("New tickets list:", updated);
      return updated;
    });
  };

  // Cập nhật ticket: luôn đưa ticket vừa update lên đầu danh sách
  const handleUpdateTicket = (updatedTicket: TicketData) => {
    setTickets((prev) => [
      updatedTicket,
      ...prev.filter((t) => t.id !== updatedTicket.id),
    ]);
  };

  // Xóa ticket
  const handleDeleteTicket = (id: number) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* Trang đăng nhập */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Các route sau khi đăng nhập */}
        <Route
          path="/*"
          element={
            <div className="flex h-screen bg-gray-50 overflow-hidden">
              <Sidebar />
              <main className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile menu button */}
                <div className="lg:hidden bg-white border-b border-gray-200 p-4">
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>

                {/* Nội dung chính */}
                <Routes>
                  <Route
                    path="dashboard"
                    element={
                      <>
                        <Header />
                        <div className="flex-1 overflow-y-auto p-6">
                          <Charts />
                        </div>
                      </>
                    }
                  />
                  <Route
                    path="ticket"
                    element={
                      <Ticket tickets={tickets} onDelete={handleDeleteTicket} />
                    }
                  />
                  <Route
                    path="addticket"
                    element={<CreateTicket onAdd={handleAddTicket} />}
                  />
                  <Route
                    path="update-ticket/:id"
                    element={<UpdateTicket onUpdate={handleUpdateTicket} />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
