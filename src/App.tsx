import React from "react";
import { AuthProvider, useAuth } from "./features/auth/controller/AuthProvider";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { TicketList as Ticket } from "./features/tickets";
import { CreateTicket } from "./features/tickets";
import { UpdateTicket } from "./features/tickets";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Charts from "./components/ui/Charts";
import { Login } from "./features/auth";
import UserManagement from "./features/auth/components/UserManagement";
import CreateUser from "./features/auth/components/CreateUser";
import UpdateUser from "./features/auth/components/UpdateUser";
import SignUp from "./features/auth/pages/SignUp";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      {/* Phần nội dung chính */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {isDashboard && <Header />}
        <div className="flex-1 overflow-y-auto">
          {/* Giới hạn chiều rộng nội dung */}
          <div className="max-w-7xl mx-auto w-full px-6 py-6">{children}</div>
        </div>
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Trang đăng nhập */}
      <Route path="/" element={<Login />} />

      {/* Trang đăng ký */}
      <Route path="/signup" element={<SignUp />} />

      {/* Các route sau khi đăng nhập */}
      <Route
        path="/*"
        element={
          isAuthenticated ? (
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<><Charts /><Demo /></>} />
                <Route path="ticket" element={<Ticket />} />
                <Route path="addticket" element={<CreateTicket onAdd={() => {}} />} />
                <Route path="update-ticket/:id" element={<UpdateTicket />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="users/:id/edit" element={<UpdateUser />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </DashboardLayout>
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

function Demo() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(c => c + 1);

  return <button onClick={increment}>Count: {count}</button>
}

export default App;
