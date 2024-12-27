import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentLandingPage from "./pages/StudentLandingPage";
import StudentSignup from "./pages/StudentSignup";
import StudentOnboarding from "./pages/StudentOnboarding";
import ProfilePage from "./pages/ProfilePage";
import { OnboardingProvider } from "./contexts/OnboardingContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OnboardingProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/students" element={<StudentLandingPage />} />
            <Route path="/signup" element={<StudentSignup />} />
            <Route path="/onboarding" element={<StudentOnboarding />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </OnboardingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;