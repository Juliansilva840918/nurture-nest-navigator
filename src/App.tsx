import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RegistroPage from "./pages/RegistroPage";
import ChatPage from "./pages/ChatPage";
import RecuerdosPage from "./pages/RecuerdosPage";
import TiendaPage from "./pages/TiendaPage";
import NotFound from "./pages/NotFound";
import MobileBottomNav from "./components/MobileBottomNav";
import AppShowcase from "./components/AppShowcase";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/recuerdos" element={<RecuerdosPage />} />
            <Route path="/tienda" element={<TiendaPage />} />
            <Route path="/showcase" element={<AppShowcase />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <MobileBottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
