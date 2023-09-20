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
          average_rating: number | null
          created_at: string
          id: number
          name: string | null
          number_of_reviews: number | null
          participants: number | null
          price: number | null
        }
        Insert: {
          accessibility?: number | null
          average_rating?: number | null
          created_at?: string
          id?: number
          name?: string | null
          number_of_reviews?: number | null
          participants?: number | null
          price?: number | null
        }
        Update: {
          accessibility?: number | null
          average_rating?: number | null
          created_at?: string
          id?: number
          name?: string | null
          number_of_reviews?: number | null
          participants?: number | null
          price?: number | null
        }
        Relationships: []
      }
      tips: {
        Row: {
          activity_id: number | null
          created_at: string
          id: number
          image_url: string | null
          text: string | null
        }
        Insert: {
          activity_id?: number | null
          created_at?: string
          id?: number
          image_url?: string | null
          text?: string | null
        }
        Update: {
          activity_id?: number | null
          created_at?: string
          id?: number
          image_url?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tips_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "activities"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_activity_card: {
        Args: {
          activity_id: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
