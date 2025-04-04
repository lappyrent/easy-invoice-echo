
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Clients from "./pages/Clients";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/invoices" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Invoices />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clients" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Clients />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/expenses" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Expenses</h1>
                      <p className="text-muted-foreground">This page is under construction.</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/time-tracking" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Time Tracking</h1>
                      <p className="text-muted-foreground">This page is under construction.</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Reports</h1>
                      <p className="text-muted-foreground">This page is under construction.</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Settings</h1>
                      <p className="text-muted-foreground">This page is under construction.</p>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
