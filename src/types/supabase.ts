export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          client_email: string
          client_name: string
          client_whatsapp: string
          created_at: string | null
          description: string | null
          id: string
          reference: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          client_email: string
          client_name: string
          client_whatsapp: string
          created_at?: string | null
          description?: string | null
          id?: string
          reference: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          client_email?: string
          client_name?: string
          client_whatsapp?: string
          created_at?: string | null
          description?: string | null
          id?: string
          reference?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_portfolio: {
        Row: {
          emoji: string | null
          id: string
          image_url: string | null
          label: string | null
          sort_order: number | null
          student_id: string | null
        }
        Insert: {
          emoji?: string | null
          id?: string
          image_url?: string | null
          label?: string | null
          sort_order?: number | null
          student_id?: string | null
        }
        Update: {
          emoji?: string | null
          id?: string
          image_url?: string | null
          label?: string | null
          sort_order?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_portfolio_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_pricing: {
        Row: {
          description: string | null
          featured: boolean | null
          id: string
          name: string
          price: string
          sort_order: number | null
          student_id: string | null
          unit: string
        }
        Insert: {
          description?: string | null
          featured?: boolean | null
          id?: string
          name: string
          price: string
          sort_order?: number | null
          student_id?: string | null
          unit: string
        }
        Update: {
          description?: string | null
          featured?: boolean | null
          id?: string
          name?: string
          price?: string
          sort_order?: number | null
          student_id?: string | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_pricing_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_reviews: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          reviewer_name: string
          stars: number | null
          student_id: string | null
          text: string | null
          verified: boolean | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          reviewer_name: string
          stars?: number | null
          student_id?: string | null
          text?: string | null
          verified?: boolean | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          reviewer_name?: string
          stars?: number | null
          student_id?: string | null
          text?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "student_reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          active: boolean | null
          auth_user_id: string | null
          bio: string | null
          category: string
          city: string
          created_at: string | null
          degree: string
          emoji: string | null
          id: string
          name: string
          price_unit: string
          rating: number | null
          review_count: number | null
          short_name: string
          skill: string
          starting_price: string
          tags: string[] | null
          university: string
          verified: boolean | null
          year: string
        }
        Insert: {
          active?: boolean | null
          auth_user_id?: string | null
          bio?: string | null
          category: string
          city?: string
          created_at?: string | null
          degree: string
          emoji?: string | null
          id?: string
          name: string
          price_unit: string
          rating?: number | null
          review_count?: number | null
          short_name: string
          skill: string
          starting_price: string
          tags?: string[] | null
          university: string
          verified?: boolean | null
          year: string
        }
        Update: {
          active?: boolean | null
          auth_user_id?: string | null
          bio?: string | null
          category?: string
          city?: string
          created_at?: string | null
          degree?: string
          emoji?: string | null
          id?: string
          name?: string
          price_unit?: string
          rating?: number | null
          review_count?: number | null
          short_name?: string
          skill?: string
          starting_price?: string
          tags?: string[] | null
          university?: string
          verified?: boolean | null
          year?: string
        }
        Relationships: []
      }
      verification_requests: {
        Row: {
          card_image_url: string
          id: string
          rejection_note: string | null
          reviewed_at: string | null
          status: string | null
          student_id: string | null
          submitted_at: string | null
        }
        Insert: {
          card_image_url: string
          id?: string
          rejection_note?: string | null
          reviewed_at?: string | null
          status?: string | null
          student_id?: string | null
          submitted_at?: string | null
        }
        Update: {
          card_image_url?: string
          id?: string
          rejection_note?: string | null
          reviewed_at?: string | null
          status?: string | null
          student_id?: string | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "verification_requests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          skill: string | null
          university: string | null
          year: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          skill?: string | null
          university?: string | null
          year?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          skill?: string | null
          university?: string | null
          year?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_booking_ref: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
