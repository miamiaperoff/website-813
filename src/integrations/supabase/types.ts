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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      attempt_logs: {
        Row: {
          attempted_at: string | null
          code: string
          created_at: string | null
          id: string
          ip_address: unknown
          member_id: string | null
          success: boolean
        }
        Insert: {
          attempted_at?: string | null
          code: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          member_id?: string | null
          success: boolean
        }
        Update: {
          attempted_at?: string | null
          code?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          member_id?: string | null
          success?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "attempt_logs_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      desks: {
        Row: {
          created_at: string | null
          id: string
          label: string
          member_id: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          label: string
          member_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          member_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "desks_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      drink_redemptions: {
        Row: {
          amount: number | null
          cashier: string
          created_at: string | null
          id: string
          member_id: string | null
          redeemed_at: string | null
          void_reason: string | null
          voided: boolean | null
          voucher_id: string
        }
        Insert: {
          amount?: number | null
          cashier: string
          created_at?: string | null
          id?: string
          member_id?: string | null
          redeemed_at?: string | null
          void_reason?: string | null
          voided?: boolean | null
          voucher_id: string
        }
        Update: {
          amount?: number | null
          cashier?: string
          created_at?: string | null
          id?: string
          member_id?: string | null
          redeemed_at?: string | null
          void_reason?: string | null
          voided?: boolean | null
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "drink_redemptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      guest_passes: {
        Row: {
          code: string
          created_at: string | null
          id: string
          issued_at: string | null
          member_id: string | null
          status: string | null
          used_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          issued_at?: string | null
          member_id?: string | null
          status?: string | null
          used_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          issued_at?: string | null
          member_id?: string | null
          status?: string | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guest_passes_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      job_applications: {
        Row: {
          applicant_email: string
          applicant_name: string
          applicant_phone: string | null
          cover_message: string | null
          created_at: string
          id: string
          job_listing_id: string
          notes: string | null
          resume_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          applicant_email: string
          applicant_name: string
          applicant_phone?: string | null
          cover_message?: string | null
          created_at?: string
          id?: string
          job_listing_id: string
          notes?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          applicant_email?: string
          applicant_name?: string
          applicant_phone?: string | null
          cover_message?: string | null
          created_at?: string
          id?: string
          job_listing_id?: string
          notes?: string | null
          resume_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_applications_job_listing_id_fkey"
            columns: ["job_listing_id"]
            isOneToOne: false
            referencedRelation: "job_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_listings: {
        Row: {
          created_at: string
          description: string
          employment_type: string | null
          id: string
          is_active: boolean
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          employment_type?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          employment_type?: string | null
          id?: string
          is_active?: boolean
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          created_at: string | null
          email: string
          id: string
          name: string
          plan_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          name: string
          plan_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          plan_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string | null
          id: string
          name: string
          perks: string[] | null
          term: string
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          perks?: string[] | null
          term: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          perks?: string[] | null
          term?: string
        }
        Relationships: []
      }
      policy_settings: {
        Row: {
          capacity: number | null
          created_at: string | null
          friday_slot_size: number | null
          grace_label_text: string | null
          id: string
          idle_timeout: number | null
          lockout_threshold: number | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          friday_slot_size?: number | null
          grace_label_text?: string | null
          id?: string
          idle_timeout?: number | null
          lockout_threshold?: number | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          friday_slot_size?: number | null
          grace_label_text?: string | null
          id?: string
          idle_timeout?: number | null
          lockout_threshold?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reservations: {
        Row: {
          created_at: string | null
          date: string
          end_time: string
          id: string
          member_id: string | null
          start_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          end_time: string
          id?: string
          member_id?: string | null
          start_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          end_time?: string
          id?: string
          member_id?: string | null
          start_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_daily: {
        Row: {
          am_sales: number
          created_at: string
          d: string
          eve_sales: number
          id: string
          noon_sales: number
          orders: number
          total_sales: number
          user_id: string | null
        }
        Insert: {
          am_sales?: number
          created_at?: string
          d: string
          eve_sales?: number
          id?: string
          noon_sales?: number
          orders?: number
          total_sales?: number
          user_id?: string | null
        }
        Update: {
          am_sales?: number
          created_at?: string
          d?: string
          eve_sales?: number
          id?: string
          noon_sales?: number
          orders?: number
          total_sales?: number
          user_id?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          attempts: number | null
          code: string
          created_at: string | null
          ended_at: string | null
          id: string
          is_active: boolean | null
          locked_until: string | null
          member_id: string | null
          started_at: string | null
        }
        Insert: {
          attempts?: number | null
          code: string
          created_at?: string | null
          ended_at?: string | null
          id?: string
          is_active?: boolean | null
          locked_until?: string | null
          member_id?: string | null
          started_at?: string | null
        }
        Update: {
          attempts?: number | null
          code?: string
          created_at?: string | null
          ended_at?: string | null
          id?: string
          is_active?: boolean | null
          locked_until?: string | null
          member_id?: string | null
          started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_periods: {
        Row: {
          created_at: string | null
          id: string
          is_paid: boolean | null
          marked_at: string | null
          marked_by: string
          member_id: string | null
          note: string | null
          period_end: string
          period_start: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_paid?: boolean | null
          marked_at?: string | null
          marked_by: string
          member_id?: string | null
          note?: string | null
          period_end: string
          period_start: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_paid?: boolean | null
          marked_at?: string | null
          marked_by?: string
          member_id?: string | null
          note?: string | null
          period_end?: string
          period_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_periods_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      test_table: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          category: string
          created_at: string | null
          id: string
          member_id: string | null
          status: string | null
          text: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
          text: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
          text?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      upload_logs: {
        Row: {
          completed_at: string | null
          created_at: string
          errors: string | null
          filename: string
          id: string
          rows_processed: number | null
          status: string
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          errors?: string | null
          filename: string
          id?: string
          rows_processed?: number | null
          status?: string
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          errors?: string | null
          filename?: string
          id?: string
          rows_processed?: number | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: never; Returns: boolean }
      is_admin_user: { Args: never; Returns: boolean }
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
