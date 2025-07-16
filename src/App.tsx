import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import RegistroPage from "./pages/RegistroPage";
import ChatPage from "./pages/ChatPage";
import RecuerdosPage from "./pages/RecuerdosPage";
import TiendaPage from "./pages/TiendaPage";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import MobileBottomNav from "./components/MobileBottomNav";
import AppShowcase from "./components/AppShowcase";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/registro" element={<ProtectedRoute><RegistroPage /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
              <Route path="/recuerdos" element={<ProtectedRoute><RecuerdosPage /></ProtectedRoute>} />
              <Route path="/tienda" element={<ProtectedRoute><TiendaPage /></ProtectedRoute>} />
              <Route path="/showcase" element={<AppShowcase />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNav />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
