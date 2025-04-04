
import { Wallet, FileText, Users, ArrowUpRight } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import InvoiceStatusChart from "@/components/dashboard/InvoiceStatusChart";
import RecentInvoices from "@/components/dashboard/RecentInvoices";
import RecentClients from "@/components/dashboard/RecentClients";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your invoicing activity</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value="$24,780.00"
          icon={<Wallet size={24} />}
          trend={{ value: "8.2%", positive: true }}
        />
        <StatCard
          title="Total Invoices"
          value="142"
          icon={<FileText size={24} />}
          trend={{ value: "12.5%", positive: true }}
        />
        <StatCard
          title="Total Clients"
          value="38"
          icon={<Users size={24} />}
          trend={{ value: "2.6%", positive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <InvoiceStatusChart />
        </div>
        <div className="lg:col-span-2">
          <RecentInvoices />
        </div>
      </div>
      
      <div>
        <RecentClients />
      </div>
      
      <div className="mt-8 rounded-lg border border-zoho-border bg-white p-6 text-center">
        <div className="mx-auto max-w-md">
          <h3 className="text-lg font-medium">Ready to create a new invoice?</h3>
          <p className="mt-2 text-sm text-gray-500">
            Create professional invoices in seconds and get paid faster
          </p>
          <button className="zoho-btn-primary mt-4">
            <span>Create New Invoice</span>
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
