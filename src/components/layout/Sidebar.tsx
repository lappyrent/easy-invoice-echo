
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  FileText, 
  Users, 
  PieChart, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  CreditCard,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const mainNavItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/",
      id: "dashboard"
    },
    {
      name: "Invoices",
      icon: FileText,
      path: "/invoices",
      id: "invoices"
    },
    {
      name: "Clients",
      icon: Users,
      path: "/clients",
      id: "clients"
    },
    {
      name: "Expenses",
      icon: CreditCard,
      path: "/expenses",
      id: "expenses"
    },
    {
      name: "Time Tracking",
      icon: Clock,
      path: "/time-tracking",
      id: "time-tracking"
    },
    {
      name: "Reports",
      icon: PieChart,
      path: "/reports",
      id: "reports"
    }
  ];

  const secondaryNavItems = [
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      id: "settings"
    },
    {
      name: "Logout",
      icon: LogOut,
      path: "/logout",
      id: "logout"
    }
  ];

  return (
    <div 
      className={cn(
        "relative flex h-screen flex-col bg-sidebar border-r border-zoho-border", 
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-zoho-blue">ZohoClone</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={cn(
            "rounded-full p-2 hover:bg-zoho-gray", 
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="mt-8 flex flex-col space-y-8 px-2 flex-grow">
        <nav className="flex flex-col space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                active === item.id ? "zoho-sidebar-item-active" : "zoho-sidebar-item",
                "transition-all duration-200 ease-in-out"
              )}
              onClick={() => setActive(item.id)}
            >
              <item.icon size={20} className="mr-3" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <nav className="flex flex-col space-y-1">
            {secondaryNavItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  active === item.id ? "zoho-sidebar-item-active" : "zoho-sidebar-item",
                  "transition-all duration-200 ease-in-out"
                )}
                onClick={() => setActive(item.id)}
              >
                <item.icon size={20} className="mr-3" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
