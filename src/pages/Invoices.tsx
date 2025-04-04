
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Invoice {
  id: string;
  invoice_number: string;
  client?: {
    name: string;
  };
  total_amount: number;
  issue_date: string;
  due_date: string;
  status: string;
}

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('invoices')
          .select(`
            *,
            client:client_id (
              name
            )
          `)
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
        }
        
        setInvoices(data);
      } catch (error) {
        toast({
          title: "Error fetching invoices",
          description: "Could not load invoices.",
          variant: "destructive",
        });
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInvoices();
  }, [toast]);
  
  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(
    invoice => 
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (invoice.client?.name && invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return '$' + amount.toFixed(2);
  };

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
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zoho-blue border-t-transparent"></div>
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="rounded-lg border border-zoho-border bg-white p-10 text-center">
          <h3 className="text-xl font-medium">No invoices found</h3>
          {searchTerm ? (
            <p className="mt-2 text-gray-500">Try adjusting your search terms</p>
          ) : (
            <>
              <p className="mt-2 text-gray-500">Get started by creating your first invoice</p>
              <Button className="mt-4 bg-zoho-blue hover:bg-zoho-darkblue">
                <Plus className="mr-2 h-4 w-4" />
                <span>New Invoice</span>
              </Button>
            </>
          )}
        </div>
      ) : (
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
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.client?.name || 'N/A'}</TableCell>
                  <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                  <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                  <TableCell>{formatDate(invoice.due_date)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "unpaid"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
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
      )}
    </div>
  );
};

export default Invoices;
