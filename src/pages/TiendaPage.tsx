import { useState } from "react";
import { ShoppingCart, Heart, Star, Search, Filter, Tag } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";

const TiendaPage = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todos");

  const productos = [
    {
      id: 1,
      nombre: "Monitor de Sueño Inteligente",
      precio: 149.99,
      precioOriginal: 199.99,
      imagen: "/api/placeholder/300/300",
      rating: 4.8,
      reviews: 234,
      categoria: "tecnologia",
      descuento: 25,
      favorito: false,
      descripcion: "Monitorea el sueño y la respiración del bebé con tecnología avanzada"
    },
    {
      id: 2,
      nombre: "Cuna Convertible Premium",
      precio: 299.99,
      precioOriginal: 399.99,
      imagen: "/api/placeholder/300/300",
      rating: 4.9,
      reviews: 156,
      categoria: "muebles",
      descuento: 25,
      favorito: true,
      descripcion: "Cuna que se convierte en cama junior, hecha con materiales naturales"
    },
    {
      id: 3,
      nombre: "Set de Alimentación Bambú",
      precio: 29.99,
      precioOriginal: 39.99,
      imagen: "/api/placeholder/300/300",
      rating: 4.7,
      reviews: 89,
      categoria: "alimentacion",
      descuento: 25,
      favorito: false,
      descripcion: "Set completo de platos y utensilios hechos de bambú ecológico"
    },
    {
      id: 4,
      nombre: "Juguetes Sensoriales",
      precio: 24.99,
      precioOriginal: 34.99,
      imagen: "/api/placeholder/300/300",
      rating: 4.6,
      reviews: 178,
      categoria: "juguetes",
      descuento: 29,
      favorito: true,
      descripcion: "Estimula los sentidos del bebé con texturas y sonidos suaves"
    }
  ];

  const categorias = [
    { id: "todos", label: "Todos", count: 120 },
    { id: "tecnologia", label: "Tecnología", count: 25 },
    { id: "muebles", label: "Muebles", count: 35 },
    { id: "alimentacion", label: "Alimentación", count: 40 },
    { id: "juguetes", label: "Juguetes", count: 20 }
  ];

  const productosFiltrados = productos.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoria === "todos" || producto.categoria === categoria;
    return coincideBusqueda && coincideCategoria;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-soft p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Tienda</h1>
            <p className="text-white/80">Productos para Emma</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-warning text-warning-foreground text-xs">
                3
              </Badge>
            </Button>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar productos..."
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
          />
        </div>

        {/* Categorías */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoria(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                categoria === cat.id
                  ? "bg-white text-foreground shadow-sm"
                  : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              <span className="text-sm font-medium">{cat.label}</span>
              <Badge variant="secondary" className="text-xs">
                {cat.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Productos */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {productosFiltrados.map((producto) => (
            <Card key={producto.id} className="shadow-card overflow-hidden hover:shadow-button transition-shadow">
              <div className="relative">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                {producto.descuento && (
                  <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-bold">
                    -{producto.descuento}%
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 ${
                    producto.favorito 
                      ? "text-red-500 hover:text-red-600" 
                      : "text-white hover:text-red-500"
                  } bg-white/20 hover:bg-white/30`}
                >
                  <Heart className={`h-4 w-4 ${producto.favorito ? "fill-current" : ""}`} />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{producto.nombre}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {producto.descripcion}
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{producto.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({producto.reviews} reseñas)
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ${producto.precio}
                    </span>
                    {producto.precioOriginal && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${producto.precioOriginal}
                      </span>
                    )}
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-button">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar
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

export default TiendaPage;