export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      babies: {
        Row: {
          created_at: string
          fecha_nacimiento: string
          foto_url: string | null
          genero: Database["public"]["Enums"]["gender"]
          id: string
          nombre: string
          user_id: string
        }
        Insert: {
          created_at?: string
          fecha_nacimiento: string
          foto_url?: string | null
          genero: Database["public"]["Enums"]["gender"]
          id?: string
          nombre: string
          user_id: string
        }
        Update: {
          created_at?: string
          fecha_nacimiento?: string
          foto_url?: string | null
          genero?: Database["public"]["Enums"]["gender"]
          id?: string
          nombre?: string
          user_id?: string
        }
        Relationships: []
      }
      development_tips: {
        Row: {
          baby_id: string
          contenido: string
          creado_por_ia: boolean
          created_at: string
          edad_en_meses: number
          id: string
          tema: string
          user_id: string
        }
        Insert: {
          baby_id: string
          contenido: string
          creado_por_ia?: boolean
          created_at?: string
          edad_en_meses: number
          id?: string
          tema: string
          user_id: string
        }
        Update: {
          baby_id?: string
          contenido?: string
          creado_por_ia?: boolean
          created_at?: string
          edad_en_meses?: number
          id?: string
          tema?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "development_tips_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          baby_id: string | null
          created_at: string
          descripcion: string | null
          fecha_fin: string | null
          fecha_inicio: string
          id: string
          notificar: boolean
          tipo_evento: Database["public"]["Enums"]["event_type"]
          titulo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          baby_id?: string | null
          created_at?: string
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio: string
          id?: string
          notificar?: boolean
          tipo_evento?: Database["public"]["Enums"]["event_type"]
          titulo: string
          updated_at?: string
          user_id: string
        }
        Update: {
          baby_id?: string | null
          created_at?: string
          descripcion?: string | null
          fecha_fin?: string | null
          fecha_inicio?: string
          id?: string
          notificar?: boolean
          tipo_evento?: Database["public"]["Enums"]["event_type"]
          titulo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      memories: {
        Row: {
          baby_id: string
          created_at: string
          descripcion: string | null
          etiquetas: string[] | null
          id: string
          media_url: string | null
          tipo_contenido: Database["public"]["Enums"]["content_type"]
          titulo: string
          user_id: string
        }
        Insert: {
          baby_id: string
          created_at?: string
          descripcion?: string | null
          etiquetas?: string[] | null
          id?: string
          media_url?: string | null
          tipo_contenido: Database["public"]["Enums"]["content_type"]
          titulo: string
          user_id: string
        }
        Update: {
          baby_id?: string
          created_at?: string
          descripcion?: string | null
          etiquetas?: string[] | null
          id?: string
          media_url?: string | null
          tipo_contenido?: Database["public"]["Enums"]["content_type"]
          titulo?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memories_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          baby_id: string
          created_at: string
          descripcion: string | null
          fecha_evento: string
          foto_url: string | null
          id: string
          titulo: string
          user_id: string
        }
        Insert: {
          baby_id: string
          created_at?: string
          descripcion?: string | null
          fecha_evento: string
          foto_url?: string | null
          id?: string
          titulo: string
          user_id: string
        }
        Update: {
          baby_id?: string
          created_at?: string
          descripcion?: string | null
          fecha_evento?: string
          foto_url?: string | null
          id?: string
          titulo?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          cantidad: number
          created_at: string
          id: string
          order_id: string
          precio_unitario: number
          product_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          id?: string
          order_id: string
          precio_unitario: number
          product_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          id?: string
          order_id?: string
          precio_unitario?: number
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          direccion_envio: string
          estado: Database["public"]["Enums"]["order_status"]
          fecha_pedido: string
          id: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          direccion_envio: string
          estado?: Database["public"]["Enums"]["order_status"]
          fecha_pedido?: string
          id?: string
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          direccion_envio?: string
          estado?: Database["public"]["Enums"]["order_status"]
          fecha_pedido?: string
          id?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          categoria: string
          created_at: string
          descripcion: string | null
          edad_recomendada: string | null
          foto_url: string | null
          id: string
          nombre: string
          precio_membresia: number | null
          precio_normal: number
          stock: number
          updated_at: string
        }
        Insert: {
          categoria: string
          created_at?: string
          descripcion?: string | null
          edad_recomendada?: string | null
          foto_url?: string | null
          id?: string
          nombre: string
          precio_membresia?: number | null
          precio_normal: number
          stock?: number
          updated_at?: string
        }
        Update: {
          categoria?: string
          created_at?: string
          descripcion?: string | null
          edad_recomendada?: string | null
          foto_url?: string | null
          id?: string
          nombre?: string
          precio_membresia?: number | null
          precio_normal?: number
          stock?: number
          updated_at?: string
        }
        Relationships: []
      }
      records: {
        Row: {
          baby_id: string
          created_at: string
          fecha_hora: string
          id: string
          nota: string | null
          tipo: Database["public"]["Enums"]["record_type"]
          user_id: string
          valor: string | null
        }
        Insert: {
          baby_id: string
          created_at?: string
          fecha_hora?: string
          id?: string
          nota?: string | null
          tipo: Database["public"]["Enums"]["record_type"]
          user_id: string
          valor?: string | null
        }
        Update: {
          baby_id?: string
          created_at?: string
          fecha_hora?: string
          id?: string
          nota?: string | null
          tipo?: Database["public"]["Enums"]["record_type"]
          user_id?: string
          valor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "records_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          foto_url: string | null
          id: string
          nombre: string
          tipo_usuario: Database["public"]["Enums"]["user_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          foto_url?: string | null
          id?: string
          nombre: string
          tipo_usuario?: Database["public"]["Enums"]["user_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          foto_url?: string | null
          id?: string
          nombre?: string
          tipo_usuario?: Database["public"]["Enums"]["user_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wellbeing: {
        Row: {
          actividad_recomendada: string | null
          audio_url: string | null
          created_at: string
          estado_emocional: Database["public"]["Enums"]["emotional_state"]
          fecha: string
          id: string
          nota: string | null
          user_id: string
        }
        Insert: {
          actividad_recomendada?: string | null
          audio_url?: string | null
          created_at?: string
          estado_emocional: Database["public"]["Enums"]["emotional_state"]
          fecha?: string
          id?: string
          nota?: string | null
          user_id: string
        }
        Update: {
          actividad_recomendada?: string | null
          audio_url?: string | null
          created_at?: string
          estado_emocional?: Database["public"]["Enums"]["emotional_state"]
          fecha?: string
          id?: string
          nota?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type: "foto" | "video" | "audio" | "nota"
      emotional_state:
        | "muy_bien"
        | "bien"
        | "neutral"
        | "cansado"
        | "estresado"
        | "muy_estresado"
      event_type: "cita_medica" | "vacuna" | "reunion" | "recordatorio" | "otro"
      gender: "masculino" | "femenino" | "otro"
      order_status:
        | "pendiente"
        | "procesando"
        | "enviado"
        | "entregado"
        | "cancelado"
      record_type:
        | "comida"
        | "sueño"
        | "pañal"
        | "medicamento"
        | "actividad"
        | "otro"
      user_type: "padre" | "cuidador" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      content_type: ["foto", "video", "audio", "nota"],
      emotional_state: [
        "muy_bien",
        "bien",
        "neutral",
        "cansado",
        "estresado",
        "muy_estresado",
      ],
      event_type: ["cita_medica", "vacuna", "reunion", "recordatorio", "otro"],
      gender: ["masculino", "femenino", "otro"],
      order_status: [
        "pendiente",
        "procesando",
        "enviado",
        "entregado",
        "cancelado",
      ],
      record_type: [
        "comida",
        "sueño",
        "pañal",
        "medicamento",
        "actividad",
        "otro",
      ],
      user_type: ["padre", "cuidador", "admin"],
    },
  },
} as const
