import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBabies } from '@/hooks/useBabies';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Baby, Calendar, Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BabyOnboardingProps {
  onComplete: () => void;
}

const BabyOnboarding = ({ onComplete }: BabyOnboardingProps) => {
  const { user } = useAuth();
  const { addBaby } = useBabies();
  const [formData, setFormData] = useState({
    nombre: '',
    fecha_nacimiento: '',
    genero: '' as 'masculino' | 'femenino' | 'otro'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.nombre || !formData.fecha_nacimiento || !formData.genero) {
      setError('Por favor completa todos los campos');
      setIsLoading(false);
      return;
    }

    const { error } = await addBaby({
      nombre: formData.nombre,
      fecha_nacimiento: formData.fecha_nacimiento,
      genero: formData.genero,
      foto_url: null
    });

    if (error) {
      setError('Error al registrar el bebé');
      toast({
        title: 'Error',
        description: 'No se pudo registrar el bebé. Intenta nuevamente.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: '¡Bebé registrado!',
        description: `${formData.nombre} ha sido registrado correctamente`
      });
      onComplete();
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-modal">
        <CardHeader className="text-center">
          <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Baby className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">¡Hola {user?.user_metadata?.name}!</CardTitle>
          <p className="text-muted-foreground">Registra a tu bebé para comenzar</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del bebé</Label>
              <Input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Nombre del bebé"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
              <Input
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={formData.fecha_nacimiento}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="genero">Género</Label>
              <Select value={formData.genero} onValueChange={(value) => setFormData(prev => ({ ...prev, genero: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registrando...
                </>
              ) : (
                'Registrar Bebé'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BabyOnboarding;