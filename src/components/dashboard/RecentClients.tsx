
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const recentClients = [
  {
    id: "1",
    name: "Acme Inc.",
    contact: "John Doe",
    email: "john@acme.com",
    totalBilled: "$5,240.00"
  },
  {
    id: "2",
    name: "Globex Corporation",
    contact: "Jane Smith",
    email: "jane@globex.com",
    totalBilled: "$3,800.00"
  },
  {
    id: "3",
    name: "Initech",
    contact: "Michael Johnson",
    email: "michael@initech.com",
    totalBilled: "$7,320.00"
  }
];

const RecentClients = () => {
  return (
    <div className="zoho-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Clients</h3>
        <Button variant="ghost" size="sm" className="flex items-center text-zoho-blue">
          <span>View All</span>
          <ExternalLink className="ml-1 h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {recentClients.map((client) => (
          <div key={client.id} className="flex items-center justify-between rounded-md border border-zoho-border p-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 bg-zoho-blue text-white">
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-sm text-gray-500">{client.contact}</p>
                <p className="text-xs text-gray-400">{client.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Total Billed</p>
              <p className="text-lg font-semibold text-zoho-blue">{client.totalBilled}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentClients;
