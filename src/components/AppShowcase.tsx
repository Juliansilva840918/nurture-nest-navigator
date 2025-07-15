import appMockup from "../assets/app-mockup.jpg";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Smartphone, Heart, Baby } from "lucide-react";

const AppShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Baby className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Aplicación Móvil Nativa</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Copiloto de Crianza Empático
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tu compañero empático para la crianza. Registra, aprende y disfruta cada momento con tu bebé.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-button">
              <Download className="h-5 w-5 mr-2" />
              Descargar para iOS
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Smartphone className="h-5 w-5 mr-2" />
              Descargar para Android
            </Button>
          </div>
        </div>

        <Card className="shadow-modal overflow-hidden backdrop-blur-sm bg-white/90">
          <CardContent className="p-8">
            <img 
              src={appMockup} 
              alt="Copiloto de Crianza Empático - App Mockup" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-card bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Baby className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Seguimiento Inteligente</h3>
              <p className="text-sm text-muted-foreground">
                Registra comidas, sueño, pañales y más con un solo toque
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">IA Empática</h3>
              <p className="text-sm text-muted-foreground">
                Consejos personalizados y apoyo emocional 24/7
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Experiencia Móvil</h3>
              <p className="text-sm text-muted-foreground">
                Diseñada específicamente para uso con una mano
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;