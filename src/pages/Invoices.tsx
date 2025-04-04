
import { useState } from "react";
import { Plus, Filter, Download, ChevronDown, MoreHorizontal, Search } from "lucide-react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const invoices = [
  {
    id: "INV-0001",
    client: "Acme Inc.",
    amount: "$1,250.00",
    date: "2025-03-28",
    dueDate: "2025-04-27",
    status: "Paid"
  },
  {
    id: "INV-0002",
    client: "Globex Corporation",
    amount: "$950.00",
    date: "2025-03-30",
    dueDate: "2025-04-29",
    status: "Unpaid"
  },
  {
    id: "INV-0003",
    client: "Initech",
    amount: "$2,300.00",
    date: "2025-04-01",
    dueDate: "2025-05-01",
    status: "Unpaid"
  },
  {
    id: "INV-0004",
    client: "Massive Dynamic",
    amount: "$700.00",
    date: "2025-03-24",
    dueDate: "2025-04-23",
    status: "Overdue"
  },
  {
    id: "INV-0005",
    client: "Stark Industries",
    amount: "$3,200.00",
    date: "2025-04-02",
    dueDate: "2025-05-02",
    status: "Paid"
  },
  {
    id: "INV-0006",
    client: "Wayne Enterprises",
    amount: "$1,800.00",
    date: "2025-04-03",
    dueDate: "2025-05-03",
    status: "Unpaid"
  },
  {
    id: "INV-0007",
    client: "Oscorp",
    amount: "$920.00",
    date: "2025-03-22",
    dueDate: "2025-04-21",
    status: "Overdue"
  }
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(
    invoice => 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-muted-foreground">Manage and track all your invoices</p>
      </div>
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="zoho-input pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown size={16} />
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button className="gap-2 bg-zoho-blue hover:bg-zoho-darkblue">
            <Plus size={16} />
            <span>New Invoice</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{invoice.amount}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
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
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Edit Invoice</DropdownMenuItem>
                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Invoices;
