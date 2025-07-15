import { useState } from "react";
import { Plus, Camera, Video, Heart, Share, Calendar, Filter, Image } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const RecuerdosPage = () => {
  const [filtro, setFiltro] = useState("todos");

  const recuerdos = [
    {
      id: 1,
      tipo: "foto",
      fecha: "2024-01-15",
      titulo: "Primera sonrisa",
      descripcion: "Emma nos regaló su primera sonrisa real hoy. ¡Qué momento tan especial!",
      imagen: "/api/placeholder/300/200",
      likes: 12,
      hito: true
    },
    {
      id: 2,
      tipo: "video",
      fecha: "2024-01-14",
      titulo: "Hora del baño",
      descripcion: "Le encanta chapotear en el agua. Cada día es más activa.",
      imagen: "/api/placeholder/300/200",
      likes: 8,
      hito: false
    },
    {
      id: 3,
      tipo: "hito",
      fecha: "2024-01-13",
      titulo: "Primer mes",
      descripcion: "Emma cumplió su primer mes. Ha crecido tanto en estas semanas.",
      imagen: "/api/placeholder/300/200",
      likes: 25,
      hito: true
    },
    {
      id: 4,
      tipo: "foto",
      fecha: "2024-01-12",
      titulo: "Durmiendo pacíficamente",
      descripcion: "Esos momentos de calma que tanto atesoramos.",
      imagen: "/api/placeholder/300/200",
      likes: 15,
      hito: false
    }
  ];

  const filtros = [
    { id: "todos", label: "Todos", icon: Image },
    { id: "fotos", label: "Fotos", icon: Camera },
    { id: "videos", label: "Videos", icon: Video },
    { id: "hitos", label: "Hitos", icon: Heart }
  ];

  const recuerdosFiltrados = recuerdos.filter(recuerdo => {
    if (filtro === "todos") return true;
    if (filtro === "hitos") return recuerdo.hito;
    return recuerdo.tipo === filtro.slice(0, -1); // Remove 's' from 'fotos' and 'videos'
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-warm p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Recuerdos</h1>
            <p className="text-white/80">Momentos especiales de Emma</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
            <Plus className="h-4 w-4 mr-2" />
            Añadir
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filtros.map((filtroItem) => {
            const Icon = filtroItem.icon;
            return (
              <button
                key={filtroItem.id}
                onClick={() => setFiltro(filtroItem.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  filtro === filtroItem.id
                    ? "bg-white text-foreground shadow-sm"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{filtroItem.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="p-6">
        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Este mes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">Fotos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">8</p>
                <p className="text-sm text-muted-foreground">Videos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">3</p>
                <p className="text-sm text-muted-foreground">Hitos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de recuerdos */}
        <div className="space-y-4">
          {recuerdosFiltrados.map((recuerdo) => (
            <Card key={recuerdo.id} className="shadow-card overflow-hidden">
              <div className="relative">
                <img
                  src={recuerdo.imagen}
                  alt={recuerdo.titulo}
                  className="w-full h-48 object-cover"
                />
                {recuerdo.hito && (
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Hito
                  </div>
                )}
                {recuerdo.tipo === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg">{recuerdo.titulo}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(recuerdo.fecha).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {recuerdo.descripcion}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Heart className="h-4 w-4 mr-1" />
                      {recuerdo.likes}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecuerdosPage;