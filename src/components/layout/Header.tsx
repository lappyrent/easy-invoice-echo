
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zoho-border bg-white px-4">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-64 rounded-md border border-zoho-border bg-white pl-10 pr-4 text-sm focus:border-zoho-blue focus:outline-none focus:ring-1 focus:ring-zoho-blue"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5 text-gray-500" />
        </Button>
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-zoho-blue flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
