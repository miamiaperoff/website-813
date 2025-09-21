import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Public Pages
import Index from "./pages/Index";
import Coworking from "./pages/Coworking";
import NotFound from "./pages/NotFound";
import CheckIn from "./pages/CheckIn";
import SelfServiceCheckIn from "./pages/SelfServiceCheckIn";
import Signup from "./pages/Signup";
import SignupPayment from "./pages/SignupPayment";
import BaristaRedemption from "./pages/BaristaRedemption";

// Member Portal Pages
import MemberLogin from "./pages/member/Login";
import MemberMembership from "./pages/member/Membership";

// Admin Pages
import Admin from "./pages/admin/Admin";
import AdminLogin from "./pages/admin/AdminLogin";

// Layout Components
import MemberLayout from "@/components/member/MemberLayout";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/member/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/coworking" element={<Coworking />} />
            <Route path="/checkin" element={<CheckIn />} />
            <Route path="/self-checkin" element={<SelfServiceCheckIn />} />
            <Route path="/barista" element={<BaristaRedemption />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/payment" element={<SignupPayment />} />
            
            {/* Member Portal Routes */}
            <Route path="/member-portal/login" element={<MemberLogin />} />
            <Route path="/member-portal" element={
              <ProtectedRoute requireMember={true}>
                <MemberLayout>
                  <MemberMembership />
                </MemberLayout>
              </ProtectedRoute>
            } />
            <Route path="/member-portal/membership" element={
              <ProtectedRoute requireMember={true}>
                <MemberLayout>
                  <MemberMembership />
                </MemberLayout>
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin={true}>
                <AdminLayout>
                  <Admin />
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
