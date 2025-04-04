
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Client {
  id: string;
  name: string;
  contact_name: string | null;
  email: string | null;
  total_billed?: string;
}

const RecentClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentClients = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
          
        if (error) {
          throw error;
        }
        
        // For now, let's add mock total billed amounts
        const clientsWithBilling = data.map(client => ({
          ...client,
          total_billed: '$' + (Math.floor(Math.random() * 9000) + 1000) + '.00'
        }));
        
        setClients(clientsWithBilling);
      } catch (error) {
        toast({
          title: "Error fetching clients",
          description: "Could not load recent clients.",
          variant: "destructive",
        });
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentClients();
  }, [toast]);

  return (
    <div className="zoho-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Clients</h3>
        <Button variant="ghost" size="sm" className="flex items-center text-zoho-blue" asChild>
          <Link to="/clients">
            <span>View All</span>
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zoho-blue border-t-transparent"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="rounded-md border border-zoho-border p-6 text-center">
            <p className="text-gray-500">No clients yet. Add your first client!</p>
            <Button className="mt-4 bg-zoho-blue" asChild>
              <Link to="/clients">Add Client</Link>
            </Button>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="flex items-center justify-between rounded-md border border-zoho-border p-3">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 bg-zoho-blue text-white">
                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.contact_name || 'No contact name'}</p>
                  <p className="text-xs text-gray-400">{client.email || 'No email'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Total Billed</p>
                <p className="text-lg font-semibold text-zoho-blue">{client.total_billed}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentClients;
