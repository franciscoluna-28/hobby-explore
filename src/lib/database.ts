export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          accessibility: number | null
          activity_id: number
          created_at: string
          display_image_url: string | null
          location: string | null
          name: string | null
          participants: number | null
        }
        Insert: {
          accessibility?: number | null
          activity_id?: number
          created_at?: string
          display_image_url?: string | null
          location?: string | null
          name?: string | null
          participants?: number | null
        }
        Update: {
          accessibility?: number | null
          activity_id?: number
          created_at?: string
          display_image_url?: string | null
          location?: string | null
          name?: string | null
          participants?: number | null
        }
        Relationships: []
      }
      activities_relationships: {
        Row: {
          activity_id: number
          category_id: number | null
          created_by_user_id: string
        }
        Insert: {
          activity_id: number
          category_id?: number | null
          created_by_user_id: string
        }
        Update: {
          activity_id?: number
          category_id?: number | null
          created_by_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_relationships_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: true
            referencedRelation: "activities"
            referencedColumns: ["activity_id"]
          },
          {
            foreignKeyName: "activities_relationships_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "activities_relationships_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      categories: {
        Row: {
          category_id: number
          name: string
        }
        Insert: {
          category_id?: number
          name: string
        }
        Update: {
          category_id?: number
          name?: string
        }
        Relationships: []
      }
      tips: {
        Row: {
          created_at: string
          description: string | null
          display_image_url: string | null
          tip_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_image_url?: string | null
          tip_id?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          display_image_url?: string | null
          tip_id?: number
        }
        Relationships: []
      }
      tips_relationships: {
        Row: {
          activity_id: number
          created_by_user_id: string
          tip_id: number
        }
        Insert: {
          activity_id: number
          created_by_user_id: string
          tip_id: number
        }
        Update: {
          activity_id?: number
          created_by_user_id?: string
          tip_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tips_relationships_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["activity_id"]
          },
          {
            foreignKeyName: "tips_relationships_created_by_user_id_fkey"
            columns: ["created_by_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tips_relationships_tip_id_fkey"
            columns: ["tip_id"]
            isOneToOne: true
            referencedRelation: "tips"
            referencedColumns: ["tip_id"]
          }
        ]
      }
      users: {
        Row: {
          banner_picture_url: string | null
          birth_date: string | null
          created_at: string
          description: string | null
          displayName: string | null
          email: string | null
          location: string | null
          profile_picture_url: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          banner_picture_url?: string | null
          birth_date?: string | null
          created_at?: string
          description?: string | null
          displayName?: string | null
          email?: string | null
          location?: string | null
          profile_picture_url?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          banner_picture_url?: string | null
          birth_date?: string | null
          created_at?: string
          description?: string | null
          displayName?: string | null
          email?: string | null
          location?: string | null
          profile_picture_url?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
