import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Charts from "./components/Charts";
import Ticket from "./components/Ticket";
import CreateTicket from "./components/CreateTicket";
import UpdateTicket from "./components/UpdateTicket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/login";

const Dashboard: React.FC = () => (
  <main className="flex-1">
    <Header />
    {/* Top Cards */}
    <div className="grid grid-cols-4">
      <div className="bg-white px-10 py-4 shadow">
        <h3 className="text-gray-500">Created Tickets</h3>
        <div className="flex items-center">
          <p className="text-2xl font-bold">24,208</p>
          <p className="text-sm text-red-500 ml-5 bg-red-200 rounded-lg px-2">
            -5%
          </p>
        </div>
        <p>compared to last month</p>
      </div>
      <div className="bg-white p-4 px-10 py-4 shadow">
        <h3 className="text-gray-500">Unsolved Tickets</h3>
        <div className="flex items-center">
          <p className="text-2xl font-bold">4,564</p>
          <p className="text-sm text-green-500 ml-5 bg-green-200 rounded-lg px-2">
            +2%
          </p>
        </div>
        <p>compared to last month</p>
      </div>
      <div className="bg-white p-4 px-10 py-4 shadow">
        <h3 className="text-gray-500">Solved Tickets</h3>
        <div className="flex items-center">
          <p className="text-2xl font-bold">18,208</p>
          <p className="text-sm text-green-500 ml-5 bg-green-200 rounded-lg px-2">
            +8%
          </p>
        </div>
        <p>compared to last month</p>
      </div>
      <div className="bg-white p-4 px-10 py-4 shadow">
        <h3 className="text-gray-500">Average First Time Reply</h3>
        <div className="flex items-center">
          <p className="text-2xl font-bold">12:01 min</p>
          <p className="text-sm text-green-500 ml-5 bg-green-200 rounded-lg px-2">
            +8%
          </p>
        </div>
        <p>compared to last month</p>
      </div>
    </div>
    {/* Charts Row */}
    <Charts />
  </main>
);

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/ticket" />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route
            path="/addticket"
            element={<CreateTicket handleClose={() => {}} />}
          />
          <Route path="/update-ticket/:id" element={<UpdateTicket />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <AppContent />
    </Router>
  );
};

export default App;
