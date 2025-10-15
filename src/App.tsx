import React, { useState } from "react";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Ticket from "./components/Ticket";
import CreateTicket from "./components/CreateTicket";
import UpdateTicket from "./components/UpdateTicket";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Charts from "./components/Charts";
import Login from "./components/login";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  return (
    <Router>
      <AuthProvider>
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
                        element={<CreateTicket />}
                      />
                      <Route
                        path="update-ticket/:id"
                        element={<UpdateTicket />}
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
      </AuthProvider>
    </Router>
  );
};

export default App;
