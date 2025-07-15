import { useState } from "react";
import { Plus, Clock, Baby, Milk, Moon, BabyIcon, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const RegistroPage = () => {
  const [activeTab, setActiveTab] = useState("hoy");

  const actividades = [
    {
      id: 1,
      tipo: "alimentacion",
      hora: "14:30",
      duracion: "20 min",
      notas: "Tomó bien el pecho",
      icon: Milk,
      color: "bg-secondary"
    },
    {
      id: 2,
      tipo: "sueño",
      hora: "13:00",
      duracion: "45 min",
      notas: "Siesta corta",
      icon: Moon,
      color: "bg-accent"
    },
    {
      id: 3,
      tipo: "pañal",
      hora: "12:45",
      duracion: "5 min",
      notas: "Cambio normal",
      icon: BabyIcon,
      color: "bg-warning"
    }
  ];

  const tiposActividad = [
    { id: "alimentacion", label: "Alimentación", icon: Milk, color: "bg-secondary" },
    { id: "sueño", label: "Sueño", icon: Moon, color: "bg-accent" },
    { id: "pañal", label: "Pañal", icon: BabyIcon, color: "bg-warning" },
    { id: "juego", label: "Juego", icon: Baby, color: "bg-primary" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-cool p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Registro</h1>
            <p className="text-white/80">Seguimiento de Emma</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/10 p-1 rounded-lg">
          {["hoy", "ayer", "semana"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-foreground shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/20"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 space-y-6">
        {/* Resumen del día */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Resumen de hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">6</p>
                <p className="text-sm text-muted-foreground">Comidas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">4</p>
                <p className="text-sm text-muted-foreground">Siestas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">8</p>
                <p className="text-sm text-muted-foreground">Pañales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">3h</p>
                <p className="text-sm text-muted-foreground">Juego</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones rápidas */}
        <div>
          <h2 className="text-xl font-bold mb-4">Registrar actividad</h2>
          <div className="grid grid-cols-2 gap-4">
            {tiposActividad.map((tipo) => {
              const Icon = tipo.icon;
              return (
                <Card key={tipo.id} className="shadow-card hover:shadow-button transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`h-12 w-12 ${tipo.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <p className="font-medium">{tipo.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Historial */}
        <div>
          <h2 className="text-xl font-bold mb-4">Historial</h2>
          <div className="space-y-3">
            {actividades.map((actividad) => {
              const Icon = actividad.icon;
              return (
                <Card key={actividad.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 ${actividad.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium capitalize">{actividad.tipo}</p>
                          <span className="text-sm text-muted-foreground">{actividad.hora}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{actividad.duracion}</p>
                        <p className="text-sm">{actividad.notas}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;