
import { useState, useEffect } from "react";
import { Wallet, FileText, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import StatCard from "@/components/dashboard/StatCard";
import InvoiceStatusChart from "@/components/dashboard/InvoiceStatusChart";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import RecentClients from "@/components/dashboard/RecentClients";
import type { Database } from "@/integrations/supabase/types";

type Invoice = Database['public']['Tables']['invoices']['Row'];

interface DashboardStats {
  totalRevenue: number;
  totalInvoices: number;
  totalClients: number;
  invoiceStatusCounts: {
    paid: number;
    unpaid: number;
    overdue: number;
    draft: number;
  }
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalInvoices: 0,
    totalClients: 0,
    invoiceStatusCounts: {
      paid: 0,
      unpaid: 0,
      overdue: 0,
      draft: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch total clients
        const { count: clientCount, error: clientError } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });
          
        if (clientError) throw clientError;
        
        // Fetch invoices
        const { data: invoices, error: invoiceError } = await supabase
          .from('invoices')
          .select('*');
          
        if (invoiceError) throw invoiceError;
        
        // Calculate invoice stats
        const totalInvoices = invoices.length;
        const totalRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total_amount), 0);
        
        // Count invoices by status
        const statusCounts = {
          paid: 0,
          unpaid: 0,
          overdue: 0,
          draft: 0
        };
        
        invoices.forEach(invoice => {
          if (statusCounts.hasOwnProperty(invoice.status.toLowerCase() as keyof typeof statusCounts)) {
            statusCounts[invoice.status.toLowerCase() as keyof typeof statusCounts]++;
          }
        });
        
        setStats({
          totalRevenue,
          totalInvoices,
          totalClients: clientCount || 0,
          invoiceStatusCounts: statusCounts
        });
      } catch (error) {
        toast({
          title: "Error loading dashboard data",
          description: "There was a problem fetching the dashboard data.",
          variant: "destructive",
        });
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [toast]);

  const formatCurrency = (amount: number) => {
    return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your invoicing activity</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zoho-blue border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              icon={<Wallet size={24} />}
              trend={{ value: "8.2%", positive: true }}
            />
            <StatCard
              title="Total Invoices"
              value={stats.totalInvoices.toString()}
              icon={<FileText size={24} />}
              trend={{ value: "12.5%", positive: true }}
            />
            <StatCard
              title="Total Clients"
              value={stats.totalClients.toString()}
              icon={<Users size={24} />}
              trend={{ value: "2.6%", positive: true }}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <InvoiceStatusChart statusCounts={stats.invoiceStatusCounts} />
            </div>
            <div className="lg:col-span-2">
              <RecentInvoices />
            </div>
          </div>
          
          <div>
            <RecentClients />
          </div>
        </>
      )}
      
      <div className="mt-8 rounded-lg border border-zoho-border bg-white p-6 text-center">
        <div className="mx-auto max-w-md">
          <h3 className="text-lg font-medium">Ready to create a new invoice?</h3>
          <p className="mt-2 text-sm text-gray-500">
            Create professional invoices in seconds and get paid faster
          </p>
          <Link to="/invoices">
            <button className="zoho-btn-primary mt-4">
              <span>Create New Invoice</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
