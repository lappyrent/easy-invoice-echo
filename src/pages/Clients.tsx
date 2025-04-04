
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string;
  active_invoices?: number;
  total_billed?: string;
}

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        // For now, add mock data for total_billed and active_invoices
        const clientsWithExtras = data.map(client => ({
          ...client,
          total_billed: '$' + (Math.floor(Math.random() * 9000) + 1000) + '.00',
          active_invoices: Math.floor(Math.random() * 4),
        }));
        
        setClients(clientsWithExtras);
      } catch (error) {
        toast({
          title: "Error fetching clients",
          description: "Could not load clients.",
          variant: "destructive",
        });
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, [toast]);

  // Filter clients based on search term
  const filteredClients = clients.filter(
    client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.contact_name && client.contact_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
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
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zoho-blue border-t-transparent"></div>
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="rounded-lg border border-zoho-border bg-white p-10 text-center">
          <h3 className="text-xl font-medium">No clients found</h3>
          {searchTerm ? (
            <p className="mt-2 text-gray-500">Try adjusting your search terms</p>
          ) : (
            <>
              <p className="mt-2 text-gray-500">Get started by adding your first client</p>
              <Button className="mt-4 bg-zoho-blue hover:bg-zoho-darkblue">
                <Plus className="mr-2 h-4 w-4" />
                <span>Add Client</span>
              </Button>
            </>
          )}
        </div>
      ) : (
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
                        <p className="text-sm text-gray-500">{client.contact_name || 'No contact name'}</p>
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
                    {client.email && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{client.email}</span>
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="line-clamp-2">{client.address || 'No address available'}</p>
                  </div>
                </div>
                
                <div className="border-t border-zoho-border bg-zoho-gray p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Total Billed</p>
                      <p className="font-semibold text-zoho-blue">{client.total_billed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Active Invoices</p>
                      <p className="font-semibold">{client.active_invoices}</p>
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
      )}
    </div>
  );
};

export default Clients;
