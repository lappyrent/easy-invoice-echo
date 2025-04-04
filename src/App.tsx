
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/invoices" 
            element={
              <MainLayout>
                <Invoices />
              </MainLayout>
            } 
          />
          <Route 
            path="/clients" 
            element={
              <MainLayout>
                <Clients />
              </MainLayout>
            } 
          />
          <Route 
            path="/expenses" 
            element={
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Expenses</h1>
                  <p className="text-muted-foreground">This page is under construction.</p>
                </div>
              </MainLayout>
            } 
          />
          <Route 
            path="/time-tracking" 
            element={
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Time Tracking</h1>
                  <p className="text-muted-foreground">This page is under construction.</p>
                </div>
              </MainLayout>
            } 
          />
          <Route 
            path="/reports" 
            element={
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Reports</h1>
                  <p className="text-muted-foreground">This page is under construction.</p>
                </div>
              </MainLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <MainLayout>
                <div className="p-6">
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="text-muted-foreground">This page is under construction.</p>
                </div>
              </MainLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
