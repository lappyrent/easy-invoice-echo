
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

const recentInvoices = [
  {
    id: "INV-0001",
    client: "Acme Inc.",
    amount: "$1,250.00",
    date: "2025-03-28",
    status: "Paid"
  },
  {
    id: "INV-0002",
    client: "Globex Corporation",
    amount: "$950.00",
    date: "2025-03-30",
    status: "Unpaid"
  },
  {
    id: "INV-0003",
    client: "Initech",
    amount: "$2,300.00",
    date: "2025-04-01",
    status: "Unpaid"
  },
  {
    id: "INV-0004",
    client: "Massive Dynamic",
    amount: "$700.00",
    date: "2025-03-24",
    status: "Overdue"
  },
  {
    id: "INV-0005",
    client: "Stark Industries",
    amount: "$3,200.00",
    date: "2025-04-02",
    status: "Paid"
  }
];

const RecentInvoices = () => {
  return (
    <div className="zoho-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Invoices</h3>
        <Button variant="ghost" size="sm" className="flex items-center text-zoho-blue">
          <span>View All</span>
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoice.status === "Unpaid"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentInvoices;
