# 📱 Copiloto de Crianza Empático

Una aplicación móvil nativa moderna y empática diseñada para acompañar a los padres en la crianza de sus bebés. Construida con React, TypeScript y Capacitor para iOS y Android.

## 🎯 Características Principales

- **📊 Seguimiento Inteligente**: Registra comidas, sueño, pañales y actividades
- **🤖 IA Empática**: Chat con inteligencia artificial para consejos personalizados
- **📸 Recuerdos**: Galería de fotos, videos y hitos importantes
- **🛒 Tienda**: Productos recomendados para el bebé
- **📱 Experiencia Móvil**: Diseñada específicamente para uso con una mano

## 🎨 Diseño

- **Fondo blanco limpio** en todas las pantallas
- **Colores pastel suaves** (celeste, lavanda, verde menta, amarillo)
- **Tipografía Inter** moderna y legible
- **Navegación inferior** con 5 secciones principales
- **Micro-interacciones** suaves y naturales

## 🚀 Tecnologías

- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Capacitor** para aplicación nativa
- **Shadcn/ui** para componentes
- **Lucide React** para iconos
- **React Router** para navegación

## 📱 Desarrollo Web

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📲 Desarrollo Móvil Nativo

### Configuración Inicial

```bash
# Inicializar Capacitor (ya configurado)
npx cap init

# Agregar plataformas
npx cap add ios
npx cap add android

# Construir y sincronizar
npm run build
npx cap sync
```

### Desarrollo iOS

```bash
# Abrir en Xcode (requiere Mac)
npx cap open ios

# Ejecutar en simulador iOS
npx cap run ios
```

### Desarrollo Android

```bash
# Abrir en Android Studio
npx cap open android

# Ejecutar en emulador Android
npx cap run android
```

## 🎯 Navegación

La aplicación cuenta con navegación inferior con 5 secciones:

1. **🏠 Inicio** - Dashboard principal con resumen
2. **📝 Registro** - Seguimiento de actividades del bebé
3. **💬 Chat IA** - Asistente empático para consejos
4. **❤️ Recuerdos** - Galería de fotos, videos y hitos
5. **🛒 Tienda** - Productos recomendados

## 🔧 Funcionalidades Móviles

- **Notificaciones Push** para recordatorios
- **Cámara y Galería** para capturar momentos
- **Grabación de Voz** para notas rápidas
- **Almacenamiento Offline** para uso sin conexión
- **Gestos Táctiles** nativos (swipe, pinch, long press)

## 🎨 Sistema de Diseño

### Colores Principales
- **Fondo**: Blanco puro (#FFFFFF)
- **Primario**: Celeste suave (HSL: 200, 85%, 60%)
- **Secundario**: Lavanda (HSL: 260, 60%, 85%)
- **Acento**: Verde menta (HSL: 140, 60%, 80%)
- **Advertencia**: Amarillo claro (HSL: 45, 90%, 75%)

### Tipografía
- **Familia**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700
- **Uso**: Sans-serif redondeada y amigable

## 🌐 URLs Importantes

- **Desarrollo**: `http://localhost:8080`
- **Producción**: `https://6719615b-680e-4fd1-819d-579ae52ffd73.lovableproject.com`
- **Showcase**: `/showcase` para ver el mockup de la aplicación

## 📋 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes de UI (Shadcn)
│   ├── Dashboard.tsx   # Pantalla principal
│   ├── MobileBottomNav.tsx # Navegación inferior
│   └── AppShowcase.tsx # Showcase de la app
├── pages/              # Páginas principales
│   ├── Index.tsx       # Página inicial
│   ├── RegistroPage.tsx # Registro de actividades
│   ├── ChatPage.tsx    # Chat con IA
│   ├── RecuerdosPage.tsx # Galería de recuerdos
│   └── TiendaPage.tsx  # Tienda de productos
├── assets/             # Recursos estáticos
└── lib/                # Utilidades y configuración
```

## 🔐 Seguridad y Privacidad

- **Datos locales** cifrados
- **Autenticación biométrica** disponible
- **HTTPS** obligatorio en producción
- **Validación** de entrada en tiempo real

## 📱 Optimización Móvil

- **Carga rápida** (< 3 segundos)
- **60fps** en animaciones
- **Gestos nativos** implementados
- **Accesibilidad** cumpliendo estándares WCAG
- **Targets táctiles** de mínimo 44px

## 🚀 Despliegue

### Web
```bash
npm run build
# Desplegar carpeta 'dist' a tu hosting preferido
```

### App Store / Play Store
1. Construir la aplicación: `npm run build`
2. Sincronizar con Capacitor: `npx cap sync`
3. Abrir IDE nativo: `npx cap open [ios|android]`
4. Seguir guías de publicación oficiales

## 🤝 Contribución

Esta aplicación fue creada para demostrar las capacidades de desarrollo móvil con tecnologías web modernas. El código está optimizado para mantenibilidad y escalabilidad.

## 📄 Licencia

Proyecto desarrollado con Lovable - Plataforma de desarrollo de aplicaciones con IA.
