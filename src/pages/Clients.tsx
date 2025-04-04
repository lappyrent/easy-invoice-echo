
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  Phone, 
  Mail, 
  MoreHorizontal 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Card,
  CardContent
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const clients = [
  {
    id: "1",
    name: "Acme Inc.",
    contact: "John Doe",
    email: "john@acme.com",
    phone: "+1 (555) 123-4567",
    totalBilled: "$5,240.00",
    address: "123 Business Ave, Suite 100, San Francisco, CA 94107",
    activeInvoices: 2
  },
  {
    id: "2",
    name: "Globex Corporation",
    contact: "Jane Smith",
    email: "jane@globex.com",
    phone: "+1 (555) 987-6543",
    totalBilled: "$3,800.00",
    address: "456 Corporate Blvd, New York, NY 10001",
    activeInvoices: 1
  },
  {
    id: "3",
    name: "Initech",
    contact: "Michael Johnson",
    email: "michael@initech.com",
    phone: "+1 (555) 456-7890",
    totalBilled: "$7,320.00",
    address: "789 Tech Park, Austin, TX 78701",
    activeInvoices: 3
  },
  {
    id: "4",
    name: "Massive Dynamic",
    contact: "Sarah Williams",
    email: "sarah@massive.com",
    phone: "+1 (555) 789-0123",
    totalBilled: "$2,150.00",
    address: "321 Innovation Way, Boston, MA 02108",
    activeInvoices: 0
  },
  {
    id: "5",
    name: "Wayne Enterprises",
    contact: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "+1 (555) 321-6547",
    totalBilled: "$9,620.00",
    address: "1 Wayne Tower, Gotham City, NJ 07101",
    activeInvoices: 2
  },
  {
    id: "6",
    name: "Stark Industries",
    contact: "Tony Stark",
    email: "tony@stark.com",
    phone: "+1 (555) 432-1098",
    totalBilled: "$12,480.00",
    address: "200 Park Avenue, Manhattan, NY 10166",
    activeInvoices: 4
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter clients based on search term
  const filteredClients = clients.filter(
    client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="text-muted-foreground">Manage your client relationships</p>
      </div>
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
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
            <span>Add Client</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredClients.map((client) => (
          <Card key={client.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 bg-zoho-blue text-white">
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-gray-500">{client.contact}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Client</DropdownMenuItem>
                      <DropdownMenuItem>Edit Client</DropdownMenuItem>
                      <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Client</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{client.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{client.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                  <p className="line-clamp-2">{client.address}</p>
                </div>
              </div>
              
              <div className="border-t border-zoho-border bg-zoho-gray p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Billed</p>
                    <p className="font-semibold text-zoho-blue">{client.totalBilled}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Invoices</p>
                    <p className="font-semibold">{client.activeInvoices}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    New Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Clients;
