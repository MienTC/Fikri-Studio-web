import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const barData = [
  { name: "Dec 1", created: 3000, solved: 2500 },
  { name: "Dec 2", created: 3200, solved: 2700 },
  { name: "Dec 3", created: 2800, solved: 2400 },
  { name: "Dec 4", created: 4500, solved: 3800 },
  { name: "Dec 5", created: 3100, solved: 2800 },
  { name: "Dec 6", created: 2900, solved: 2600 },
  { name: "Dec 7", created: 3300, solved: 3000 },
];

const pieData = [
  { name: "0-1 Hours", value: 81, color: "#22c55e" },
  { name: "1-8 Hours", value: 9, color: "#facc15" },
  { name: "8-24 Hours", value: 4, color: "#a855f7" },
  { name: ">24 Hours", value: 4, color: "#3b82f6" },
  { name: "No Replies", value: 2, color: "#ef4444" },
];

const channelData = [
  { name: "Email", value: 1200, color: "#3b82f6" },
  { name: "Live Chat", value: 800, color: "#a855f7" },
  { name: "Contact Form", value: 500, color: "#22c55e" },
  { name: "Messenger", value: 300, color: "#f97316" },
  { name: "Whatsapp", value: 202, color: "#facc15" },
];

const Charts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Bar Chart */}
        <div className="bg-white p-4 lg:p-8 shadow border border-gray-200 lg:col-span-4">
          <div className="flex justify-between">
            <h3 className="mb-4 font-semibold">Average Tickets Created</h3>
            <p>Dec 1-7</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>Avg, Created</p>
              <p>Avg, Solved</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="created" fill="#6366f1" />
              <Bar dataKey="solved" fill="#a5b4fc" />
            </BarChart>
          </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 lg:p-8 shadow border border-gray-200 lg:col-span-3">
          <h3 className="mb-4 font-semibold">Ticket By First Reply Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket by Channels */}
        <div className="bg-white p-4 lg:p-8 shadow">
          <h3 className="mb-4 font-semibold">Ticket by Channels</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={channelData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                label
              >
                {channelData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center mt-2 font-semibold">
            Total Active Tickets: 3002
          </p>
        </div>

        {/* Customer Satisfaction */}
        <div className="bg-white p-4 lg:p-8 shadow">
          <h3 className="mb-4 font-semibold">Customer Satisfaction</h3>
          <div className="grid grid-cols-2">
                <div>
                  <p>Responses Received</p>
                  <h2><strong>156 Customer</strong></h2>
                </div>
                <div>
                  <p>Positive</p>
                  <h2><strong>80%</strong></h2>
                </div>
                <div>
                  <p>Neutral</p>
                  <h2><strong>15%</strong></h2>
                </div>
                <div>
                  <p>Negative</p>
                  <h2><strong>5%</strong></h2>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
