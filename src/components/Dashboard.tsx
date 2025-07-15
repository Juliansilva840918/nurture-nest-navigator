import { Calendar, Settings, Bell, Baby, Heart, TrendingUp, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-soft p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">¡Hola, Mamá!</h1>
            <p className="text-white/80">Emma, 8 meses</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Calendar className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Estado del bebé */}
        <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Baby className="h-6 w-6 text-white" />
              <span className="text-white font-medium">Estado actual</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-white/80 text-sm">Última comida</p>
                <p className="text-white font-semibold">2h 15m</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Último sueño</p>
                <p className="text-white font-semibold">45m</p>
              </div>
              <div>
                <p className="text-white/80 text-sm">Pañal</p>
                <p className="text-white font-semibold">1h 30m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido principal */}
      <div className="p-6 space-y-6">
        {/* Acciones rápidas */}
        <div>
          <h2 className="text-xl font-bold mb-4">Acciones rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-card hover:shadow-button transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <Baby className="h-6 w-6 text-secondary-foreground" />
                </div>
                <p className="font-medium">Alimentación</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-button transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="h-12 w-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-accent-foreground" />
                </div>
                <p className="font-medium">Sueño</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Estadísticas */}
        <div>
          <h2 className="text-xl font-bold mb-4">Resumen de hoy</h2>
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Progreso del día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Comidas</span>
                  <span className="font-medium">6/8</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sueño</span>
                  <span className="font-medium">12h 30m</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat IA sugerencia */}
        <Card className="bg-gradient-warm shadow-card">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white mb-2">Consejo del día</h3>
                <p className="text-white/90 text-sm mb-4">
                  Emma parece estar desarrollando un patrón de sueño más regular. 
                  ¿Te gustaría que te ayude a optimizar su rutina?
                </p>
                <Button variant="secondary" size="sm">
                  Chatear con IA
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;