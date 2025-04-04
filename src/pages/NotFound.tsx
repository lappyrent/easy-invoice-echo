
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zoho-gray px-4 text-center">
      <div className="mb-8 text-zoho-blue">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="128"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2v-9" />
          <path d="M8 15h9" />
          <path d="M8 11h5" />
          <path d="M13 2l8 8" />
          <path d="M13 10V2" />
        </svg>
      </div>
      <h1 className="mb-2 text-6xl font-bold">404</h1>
      <h2 className="mb-6 text-2xl font-medium">Page Not Found</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        The page you are looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
      </p>
      <Button asChild className="bg-zoho-blue hover:bg-zoho-darkblue">
        <a href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </a>
      </Button>
    </div>
  );
};

export default NotFound;
