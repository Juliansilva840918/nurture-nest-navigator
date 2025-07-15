import { useState } from "react";
import { Send, Mic, MicOff, Bot, User, Heart, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

const ChatPage = () => {
  const [mensaje, setMensaje] = useState("");
  const [grabando, setGrabando] = useState(false);

  const mensajes = [
    {
      id: 1,
      tipo: "bot",
      mensaje: "¡Hola! Soy tu copiloto de crianza empático. ¿En qué puedo ayudarte hoy?",
      hora: "14:30"
    },
    {
      id: 2,
      tipo: "usuario",
      mensaje: "Emma ha estado llorando mucho últimamente, ¿qué podría ser?",
      hora: "14:32"
    },
    {
      id: 3,
      tipo: "bot",
      mensaje: "Entiendo tu preocupación. Es normal que los bebés lloren, y hay varias razones posibles. Basándome en el registro de Emma, veo que podría estar relacionado con:\n\n• Crecimiento acelerado\n• Cambios en el patrón de sueño\n• Necesidad de más contacto\n\n¿Has notado algún patrón específico en sus llantos?",
      hora: "14:33"
    }
  ];

  const sugerencias = [
    "¿Cómo establecer rutinas de sueño?",
    "Consejos para la alimentación",
    "Desarrollo por edades",
    "Autocuidado para padres"
  ];

  const enviarMensaje = () => {
    if (mensaje.trim()) {
      setMensaje("");
      // Aquí iría la lógica para enviar el mensaje
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-soft p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Chat IA</h1>
            <p className="text-white/80">Tu copiloto empático</p>
          </div>
          <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
        </div>
        
        {/* Estado del IA */}
        <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white/90 text-sm">En línea y listo para ayudar</span>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 p-6 space-y-4">
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.tipo === "usuario" ? "flex-row-reverse" : ""
            }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.tipo === "usuario" 
                ? "bg-primary text-primary-foreground" 
                : "bg-secondary text-secondary-foreground"
            }`}>
              {msg.tipo === "usuario" ? (
                <User className="h-5 w-5" />
              ) : (
                <Bot className="h-5 w-5" />
              )}
            </div>
            <div className={`flex-1 ${msg.tipo === "usuario" ? "text-right" : ""}`}>
              <Card className={`shadow-card ${
                msg.tipo === "usuario" 
                  ? "bg-primary text-primary-foreground ml-12" 
                  : "bg-white mr-12"
              }`}>
                <CardContent className="p-4">
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {msg.mensaje}
                  </p>
                  <span className={`text-xs mt-2 block ${
                    msg.tipo === "usuario" 
                      ? "text-primary-foreground/70" 
                      : "text-muted-foreground"
                  }`}>
                    {msg.hora}
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Sugerencias */}
      <div className="px-6 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Sugerencias</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sugerencias.map((sugerencia, index) => (
            <button
              key={index}
              className="flex-shrink-0 px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setMensaje(sugerencia)}
            >
              {sugerencia}
            </button>
          ))}
        </div>
      </div>

      {/* Input de mensaje */}
      <div className="px-6 pb-6">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe tu pregunta..."
                  className="pr-12 border-none focus:ring-0 bg-transparent"
                  onKeyPress={(e) => e.key === "Enter" && enviarMensaje()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    grabando ? "text-red-500 animate-pulse" : "text-muted-foreground"
                  }`}
                  onClick={() => setGrabando(!grabando)}
                >
                  {grabando ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                onClick={enviarMensaje}
                disabled={!mensaje.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-button"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatPage;