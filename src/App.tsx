import React from "react";
import { AuthProvider, useAuth } from "./features/auth/controller/AuthProvider";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TicketList as Ticket } from "./features/tickets";
import { CreateTicket } from "./features/tickets";
import { UpdateTicket } from "./features/tickets";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Charts from "./components/Charts";
import { Login } from "./features/auth";
import UserManagement from "./features/auth/components/UserManagement";
import CreateUser from "./features/auth/components/CreateUser";
import UpdateUser from "./features/auth/components/UpdateUser";

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Trang đăng nhập */}
      <Route
        path="/"
        element={<Login />}
      />

      {/* Các route sau khi đăng nhập */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
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
                    element={<Ticket />}
                  />
                  <Route
                    path="addticket"
                    element={<CreateTicket onAdd={() => {}} />}
                  />
                  <Route
                    path="update-ticket/:id"
                    element={<UpdateTicket />}
                  />
                  <Route
                    path="users"
                    element={<UserManagement />}
                  />
                  <Route
                    path="users/create"
                    element={<CreateUser />}
                  />
                  <Route
                    path="users/:id/edit"
                    element={<UpdateUser />}
                  />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </main>
            </div>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
};

export default App;
