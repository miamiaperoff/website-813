import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/authContext";
import { useEffect } from "react";

// Essential Pages Only
import Index from "./pages/Index.clean";
import Coworking from "./pages/Coworking.clean";
import NotFound from "./pages/NotFound";

// New Coworking System Pages
import Auth from "./pages/Auth";
import CoworkingAdmin from "./pages/CoworkingAdmin";
import CoworkingMembers from "./pages/CoworkingMembers";
import PlanSelection from "./pages/PlanSelection";
import DrinkRedemption from "./pages/DrinkRedemption";
import CheckIn from "./pages/CheckIn";
import FridayReservations from "./pages/FridayReservations";
import GuestPasses from "./pages/GuestPasses";
import MeetingRoom from "./pages/MeetingRoom";
import SupportTickets from "./pages/SupportTickets";
import Reporting from "./pages/Reporting";
import Careers from "./pages/Careers";
import Club813 from "./pages/Club813";
import CareersAdmin from "./pages/CareersAdmin";
import Unsubscribe from "./pages/Unsubscribe";

const MemberRedirect = () => {
  useEffect(() => {
    window.location.href = "https://popup.ph/eight-thirteen-cafe/app";
  }, []);
  return null;
};

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
            <Route path="/member" element={<MemberRedirect />} />
            <Route path="/club813" element={<Club813 />} />
            <Route path="/plans" element={<PlanSelection />} />
            <Route path="/redemption" element={<DrinkRedemption />} />
            <Route path="/checkin" element={<CheckIn />} />
            
            {/* Authentication Routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes - Club 813 Members Portal */}
            <Route path="/coworking/admin" element={<CoworkingAdmin />} />
            <Route path="/coworking/members" element={<CoworkingMembers />} />
            
            {/* Legacy Protected Routes */}
            <Route path="/friday" element={<FridayReservations />} />
            <Route path="/guests" element={<GuestPasses />} />
            <Route path="/meeting" element={<MeetingRoom />} />
            <Route path="/support" element={<SupportTickets />} />
            <Route path="/reports" element={<Reporting />} />
            
            {/* Careers */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/admin" element={<CareersAdmin />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;