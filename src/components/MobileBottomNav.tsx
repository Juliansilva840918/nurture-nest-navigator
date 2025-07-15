import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, MessageCircle, Heart, ShoppingBag } from "lucide-react";

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/registro", icon: BookOpen, label: "Registro" },
    { path: "/chat", icon: MessageCircle, label: "Chat IA" },
    { path: "/recuerdos", icon: Heart, label: "Recuerdos" },
    { path: "/tienda", icon: ShoppingBag, label: "Tienda" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-fast ${
                active 
                  ? "bg-primary text-primary-foreground shadow-button" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${active ? "animate-bounce-soft" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;