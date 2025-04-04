
import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Invoice {
  id: string;
  invoice_number: string;
  client_name?: string;
  client?: {
    name: string;
  };
  total_amount: number;
  issue_date: string;
  due_date: string;
  status: string;
}

const RecentInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentInvoices = async () => {
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
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) {
          throw error;
        }
        
        setInvoices(data);
      } catch (error) {
        toast({
          title: "Error fetching invoices",
          description: "Could not load recent invoices.",
          variant: "destructive",
        });
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentInvoices();
  }, [toast]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number) => {
    return '$' + amount.toFixed(2);
  };

  return (
    <div className="zoho-card">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Invoices</h3>
        <Button variant="ghost" size="sm" className="flex items-center text-zoho-blue" asChild>
          <Link to="/invoices">
            <span>View All</span>
            <ExternalLink className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-zoho-blue border-t-transparent"></div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="rounded-md border border-zoho-border p-6 text-center">
            <p className="text-gray-500">No invoices yet. Create your first invoice!</p>
            <Button className="mt-4 bg-zoho-blue" asChild>
              <Link to="/invoices">Create Invoice</Link>
            </Button>
          </div>
        ) : (
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                  <TableCell>{invoice.client?.name || 'N/A'}</TableCell>
                  <TableCell>{formatCurrency(invoice.total_amount)}</TableCell>
                  <TableCell>{formatDate(invoice.issue_date)}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "draft" || invoice.status === "unpaid"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default RecentInvoices;
