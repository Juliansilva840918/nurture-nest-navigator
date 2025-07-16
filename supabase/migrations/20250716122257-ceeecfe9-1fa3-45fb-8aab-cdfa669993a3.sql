-- Create enums
CREATE TYPE public.user_type AS ENUM ('padre', 'cuidador', 'admin');
CREATE TYPE public.gender AS ENUM ('masculino', 'femenino', 'otro');
CREATE TYPE public.record_type AS ENUM ('comida', 'sueño', 'pañal', 'medicamento', 'actividad', 'otro');
CREATE TYPE public.content_type AS ENUM ('foto', 'video', 'audio', 'nota');
CREATE TYPE public.order_status AS ENUM ('pendiente', 'procesando', 'enviado', 'entregado', 'cancelado');
CREATE TYPE public.event_type AS ENUM ('cita_medica', 'vacuna', 'reunion', 'recordatorio', 'otro');
CREATE TYPE public.emotional_state AS ENUM ('muy_bien', 'bien', 'neutral', 'cansado', 'estresado', 'muy_estresado');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Users table (extended profile)
CREATE TABLE public.users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    tipo_usuario user_type NOT NULL DEFAULT 'padre',
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Babies table
CREATE TABLE public.babies (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    nombre TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero gender NOT NULL,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Records table (daily records)
CREATE TABLE public.records (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    baby_id UUID NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    tipo record_type NOT NULL,
    valor TEXT,
    nota TEXT,
    fecha_hora TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. Milestones table
CREATE TABLE public.milestones (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    baby_id UUID NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_evento DATE NOT NULL,
    foto_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Memories table
CREATE TABLE public.memories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    baby_id UUID NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    tipo_contenido content_type NOT NULL,
    media_url TEXT,
    etiquetas TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 6. Products table (public store)
CREATE TABLE public.products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio_normal DECIMAL(10,2) NOT NULL,
    precio_membresia DECIMAL(10,2),
    categoria TEXT NOT NULL,
    edad_recomendada TEXT,
    foto_url TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 7. Orders table
CREATE TABLE public.orders (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha_pedido TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    estado order_status NOT NULL DEFAULT 'pendiente',
    total DECIMAL(10,2) NOT NULL,
    direccion_envio TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. Order items table
CREATE TABLE public.order_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 9. Events table (calendar)
CREATE TABLE public.events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    baby_id UUID REFERENCES public.babies(id) ON DELETE CASCADE,
    titulo TEXT NOT NULL,
    descripcion TEXT,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_fin TIMESTAMP WITH TIME ZONE,
    tipo_evento event_type NOT NULL DEFAULT 'recordatorio',
    notificar BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 10. Wellbeing table (self-care)
CREATE TABLE public.wellbeing (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    estado_emocional emotional_state NOT NULL,
    nota TEXT,
    audio_url TEXT,
    actividad_recomendada TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 11. Development tips table
CREATE TABLE public.development_tips (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    baby_id UUID NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    edad_en_meses INTEGER NOT NULL,
    tema TEXT NOT NULL,
    contenido TEXT NOT NULL,
    creado_por_ia BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_babies_user_id ON public.babies(user_id);
CREATE INDEX idx_records_baby_id ON public.records(baby_id);
CREATE INDEX idx_records_user_id ON public.records(user_id);
CREATE INDEX idx_records_fecha_hora ON public.records(fecha_hora);
CREATE INDEX idx_milestones_baby_id ON public.milestones(baby_id);
CREATE INDEX idx_milestones_user_id ON public.milestones(user_id);
CREATE INDEX idx_memories_baby_id ON public.memories(baby_id);
CREATE INDEX idx_memories_user_id ON public.memories(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_events_user_id ON public.events(user_id);
CREATE INDEX idx_events_baby_id ON public.events(baby_id);
CREATE INDEX idx_wellbeing_user_id ON public.wellbeing(user_id);
CREATE INDEX idx_development_tips_baby_id ON public.development_tips(baby_id);
CREATE INDEX idx_development_tips_user_id ON public.development_tips(user_id);

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security on all user-specific tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.babies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellbeing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.development_tips ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can access only their own profile" ON public.users
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for babies table
CREATE POLICY "Users can access only their own babies" ON public.babies
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for records table
CREATE POLICY "Users can access only their own records" ON public.records
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for milestones table
CREATE POLICY "Users can access only their own milestones" ON public.milestones
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for memories table
CREATE POLICY "Users can access only their own memories" ON public.memories
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for orders table
CREATE POLICY "Users can access only their own orders" ON public.orders
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for order_items table
CREATE POLICY "Users can access only their own order items" ON public.order_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );

-- Create RLS policies for events table
CREATE POLICY "Users can access only their own events" ON public.events
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for wellbeing table
CREATE POLICY "Users can access only their own wellbeing data" ON public.wellbeing
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for development_tips table
CREATE POLICY "Users can access only their own development tips" ON public.development_tips
    FOR ALL USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Products table remains public (no RLS needed)
-- Users can read all products but only admins can modify (if needed later)