
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import React, { useState } from 'react';

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Cart from "./pages/Cart";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import SubscriptionPlans from "./pages/SubscriptionPlans";
import SubscriptionTracking from "./pages/SubscriptionTracking";
import AppLayout from "./components/layout/AppLayout";
import MapView from "./pages/MapView";
import Orders from "./pages/Orders";

// Admin Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import MediaManagement from "./pages/admin/MediaManagement";
import AppSettings from "./pages/admin/AppSettings";

const App = () => {
  // Move QueryClient initialization inside the component
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<AppLayout requireAuth />}>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/subscriptions" element={<SubscriptionPlans />} />
                <Route path="/subscription-tracking" element={<SubscriptionTracking />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/orders" element={<Orders />} />
              </Route>
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<ProductManagement />} />
                <Route path="media" element={<MediaManagement />} />
                <Route path="settings" element={<AppSettings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Route>
              
              {/* Default Route */}
              <Route path="/index" element={<Navigate to="/" />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
