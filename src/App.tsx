import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ticket from "./components/Ticket";
import CreateTicket from "./components/CreateTicket";
import UpdateTicket from "./components/UpdateTicket";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Charts from "./components/Charts";
import Login from "./components/Login";
import api from "./services/api";

const PrivateRoute = ({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [tickets, setTickets] = useState<any[]>([]);

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      const res = await api.get("/tickets");
      const sorted = res.data.data.sort(
        (a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setTickets(sorted);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets();
    }
  }, [isAuthenticated]);

  // Thêm mới ticket
  const handleAddTicket = (newTicket: any) => {
    console.log("handleAddTicket called with:", newTicket);
    setTickets((prev) => {
      console.log("Current tickets:", prev);
      const updated = [newTicket, ...prev];
      console.log("New tickets list:", updated);
      return updated;
    });
  };

  // Cập nhật ticket: luôn đưa ticket vừa update lên đầu danh sách
  const handleUpdateTicket = (updatedTicket: any) => {
    setTickets((prev) => [
      updatedTicket,
      ...prev.filter((t) => t.id !== updatedTicket.id)
    ]);
  };

  // Xóa ticket
  const handleDeleteTicket = (id: number) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Navigate to="/dashboard" />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <>
                    <Header />
                    <Charts />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/ticket"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Ticket
                    tickets={tickets}
                    onDelete={handleDeleteTicket}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/addticket"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <CreateTicket onAdd={handleAddTicket} />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-ticket/:id"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <UpdateTicket onUpdate={handleUpdateTicket} />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;