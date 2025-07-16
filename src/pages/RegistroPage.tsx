import { useState } from "react";
import { Plus, Clock, Baby, Milk, Moon, BabyIcon, ChevronDown, Edit, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useBabies } from "@/hooks/useBabies";
import { useRecords } from "@/hooks/useRecords";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const RegistroPage = () => {
  const [activeTab, setActiveTab] = useState("hoy");
  const [showNewRecordDialog, setShowNewRecordDialog] = useState(false);
  const [newRecord, setNewRecord] = useState({
    tipo: '' as 'comida' | 'sueño' | 'pañal' | 'medicamento' | 'actividad' | 'otro',
    valor: '',
    nota: '',
    fecha_hora: new Date().toISOString().slice(0, 16)
  });
  
  const { babies } = useBabies();
  const selectedBaby = babies[0];
  const { records, addRecord, updateRecord, deleteRecord, getTodaysSummary } = useRecords(selectedBaby?.id);
  const { toast } = useToast();

  const tiposActividad = [
    { id: "comida", label: "Alimentación", icon: Milk, color: "bg-secondary" },
    { id: "sueño", label: "Sueño", icon: Moon, color: "bg-accent" },
    { id: "pañal", label: "Pañal", icon: BabyIcon, color: "bg-warning" },
    { id: "actividad", label: "Actividad", icon: Baby, color: "bg-primary" }
  ];

  const handleDeleteRecord = async (recordId: string) => {
    const { error } = await deleteRecord(recordId);
    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el registro',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Registro eliminado',
        description: 'El registro ha sido eliminado correctamente'
      });
    }
  };

  const handleAddRecord = async () => {
    if (!selectedBaby || !newRecord.tipo) return;

    const { error } = await addRecord({
      baby_id: selectedBaby.id,
      tipo: newRecord.tipo,
      valor: newRecord.valor,
      nota: newRecord.nota,
      fecha_hora: newRecord.fecha_hora
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo agregar el registro',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Registro agregado',
        description: 'El registro ha sido agregado correctamente'
      });
      setShowNewRecordDialog(false);
      setNewRecord({
        tipo: '' as any,
        valor: '',
        nota: '',
        fecha_hora: new Date().toISOString().slice(0, 16)
      });
    }
  };

  const NewRecordForm = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="tipo">Tipo de registro</Label>
        <Select value={newRecord.tipo} onValueChange={(value) => setNewRecord(prev => ({ ...prev, tipo: value as any }))}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comida">Comida</SelectItem>
            <SelectItem value="sueño">Sueño</SelectItem>
            <SelectItem value="pañal">Pañal</SelectItem>
            <SelectItem value="medicamento">Medicamento</SelectItem>
            <SelectItem value="actividad">Actividad</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="fecha_hora">Fecha y hora</Label>
        <Input
          id="fecha_hora"
          type="datetime-local"
          value={newRecord.fecha_hora}
          onChange={(e) => setNewRecord(prev => ({ ...prev, fecha_hora: e.target.value }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="valor">Valor/Duración (opcional)</Label>
        <Input
          id="valor"
          placeholder="Ej: 200ml, 45min, etc."
          value={newRecord.valor}
          onChange={(e) => setNewRecord(prev => ({ ...prev, valor: e.target.value }))}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nota">Nota (opcional)</Label>
        <Textarea
          id="nota"
          placeholder="Observaciones adicionales..."
          value={newRecord.nota}
          onChange={(e) => setNewRecord(prev => ({ ...prev, nota: e.target.value }))}
        />
      </div>
      
      <Button onClick={handleAddRecord} className="w-full">
        Agregar Registro
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-cool p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Registro</h1>
            <p className="text-white/80">Seguimiento de {selectedBaby?.nombre}</p>
          </div>
          <Dialog open={showNewRecordDialog} onOpenChange={setShowNewRecordDialog}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Plus className="h-4 w-4 mr-2" />
                Nuevo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo Registro</DialogTitle>
              </DialogHeader>
              <NewRecordForm />
            </DialogContent>
          </Dialog>
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
                <p className="text-2xl font-bold text-primary">{getTodaysSummary().comidas}</p>
                <p className="text-sm text-muted-foreground">Comidas</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{getTodaysSummary().sueño}</p>
                <p className="text-sm text-muted-foreground">Sueño</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{getTodaysSummary().pañales}</p>
                <p className="text-sm text-muted-foreground">Pañales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">{getTodaysSummary().otros}</p>
                <p className="text-sm text-muted-foreground">Otros</p>
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
                <Card key={tipo.id} className="shadow-card hover:shadow-button transition-shadow cursor-pointer" onClick={() => {
                  setNewRecord(prev => ({ ...prev, tipo: tipo.id as any }));
                  setShowNewRecordDialog(true);
                }}>
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
            {records.map((record) => {
              const tipoConfig = tiposActividad.find(t => t.id === record.tipo) || tiposActividad[0];
              const Icon = tipoConfig.icon;
              return (
                <Card key={record.id} className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 ${tipoConfig.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium capitalize">{record.tipo}</p>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(record.fecha_hora), 'HH:mm', { locale: es })}
                          </span>
                        </div>
                        {record.valor && (
                          <p className="text-sm text-muted-foreground mb-1">{record.valor}</p>
                        )}
                        {record.nota && (
                          <p className="text-sm">{record.nota}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteRecord(record.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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