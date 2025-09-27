import React from "react";
import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";
import Charts from "./components/Charts.tsx";

const App: React.FC = () => {

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar></Sidebar>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <Header></Header>



        {/* Top Cards */}
        <div className="grid grid-cols-4">
          <div className="bg-white px-10 py-4 shadow">
            <h3 className="text-gray-500">Created Tickets</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold">24,208</p>
            <p className="text-sm text-red-500 ml-5 bg-red-200 rounded-lg px-2">-5%</p>
            </div>
            <p>compared to last month</p>
          </div>
          <div className="bg-white p-4 px-10 py-4 shadow">
            <h3 className="text-gray-500">Unsolved Tickets</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold">4,564</p>
            <p className="text-sm text-green-500 ml-5 bg-green-200 rounded-lg px-2">+2%</p>
            </div>
            <p>compared to last month</p>
          </div>
          <div className="bg-white p-4 px-10 py-4 shadow">
            <h3 className="text-gray-500">Solved Tickets</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold">18,208</p>
            <p className="text-sm text-green-500 ml-5 bg-green-200 rounded-lg px-2">+8%</p>
            </div>
            <p>compared to last month</p>
          </div>
          <div className="bg-white p-4 px-10 py-4 shadow">
            <h3 className="text-gray-500">Average First Time Reply</h3>
            <div className="flex items-center">
              <p className="text-2xl font-bold">12:01 min</p>
            <p className="text-sm text-green-500 ml-5 bg-green-200 rounded-lg px-2">+8%</p>
            </div>
            <p>compared to last month</p>
          </div>
          
        </div>

        {/* Charts Row */}
        <Charts></Charts>

      </main>
    </div>
  );
};

export default App;
