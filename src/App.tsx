import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/authContext";

// Essential Pages Only
import Index from "./pages/Index.clean";
import Coworking from "./pages/Coworking.clean";
import NotFound from "./pages/NotFound";

// New Coworking System Pages
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import MemberPortal from "./pages/MemberPortal";
import PlanSelection from "./pages/PlanSelection";
import DrinkRedemption from "./pages/DrinkRedemption";
import CheckIn from "./pages/CheckIn";
import FridayReservations from "./pages/FridayReservations";
import GuestPasses from "./pages/GuestPasses";
import MeetingRoom from "./pages/MeetingRoom";
import SupportTickets from "./pages/SupportTickets";
import Reporting from "./pages/Reporting";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/coworking" element={<Coworking />} />
            <Route path="/plans" element={<PlanSelection />} />
            <Route path="/redemption" element={<DrinkRedemption />} />
            <Route path="/checkin" element={<CheckIn />} />
            
            {/* Authentication Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/member" element={<MemberPortal />} />
            <Route path="/friday" element={<FridayReservations />} />
            <Route path="/guests" element={<GuestPasses />} />
            <Route path="/meeting" element={<MeetingRoom />} />
            <Route path="/support" element={<SupportTickets />} />
            <Route path="/reports" element={<Reporting />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;