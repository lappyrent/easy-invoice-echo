
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface StatusCounts {
  paid: number;
  unpaid: number;
  overdue: number;
  draft?: number;
}

interface InvoiceStatusChartProps {
  statusCounts?: StatusCounts;
}

const InvoiceStatusChart = ({ statusCounts }: InvoiceStatusChartProps) => {
  // Default data if none provided
  const defaultData = [
    { name: "Paid", value: 65, color: "#2962ff" },
    { name: "Unpaid", value: 25, color: "#ffe01b" },
    { name: "Overdue", value: 10, color: "#f44336" },
  ];

  // Transform the status counts into the format needed for the chart
  const chartData = statusCounts
    ? [
        { name: "Paid", value: statusCounts.paid, color: "#2962ff" },
        { name: "Unpaid", value: statusCounts.unpaid, color: "#ffe01b" },
        { name: "Overdue", value: statusCounts.overdue, color: "#f44336" },
        ...(statusCounts.draft ? [{ name: "Draft", value: statusCounts.draft, color: "#9e9e9e" }] : []),
      ].filter(item => item.value > 0)
    : defaultData;

  const COLORS = chartData.map(item => item.color);

  const isEmpty = chartData.every(item => item.value === 0);

  return (
    <div className="zoho-card h-80">
      <h3 className="mb-4 text-lg font-semibold">Invoice Status</h3>
      {isEmpty ? (
        <div className="flex h-[calc(100%-3rem)] items-center justify-center">
          <p className="text-gray-500">No invoice data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => 
                percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} invoices`, ""]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default InvoiceStatusChart;
