
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Paid", value: 65, color: "#2962ff" },
  { name: "Unpaid", value: 25, color: "#ffe01b" },
  { name: "Overdue", value: 10, color: "#f44336" },
];

const COLORS = ["#2962ff", "#ffe01b", "#f44336"];

const InvoiceStatusChart = () => {
  return (
    <div className="zoho-card h-80">
      <h3 className="mb-4 text-lg font-semibold">Invoice Status</h3>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvoiceStatusChart;
