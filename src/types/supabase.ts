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
          category: string | null
          created_at: string
          id: number
          location: string | null
          main_image_url: string | null
          name: string | null
          number_of_reviews: number | null
          participants: number | null
          user_uuid: string | null
        }
        Insert: {
          accessibility?: number | null
          average_rating?: number | null
          category?: string | null
          created_at?: string
          id?: number
          location?: string | null
          main_image_url?: string | null
          name?: string | null
          number_of_reviews?: number | null
          participants?: number | null
          user_uuid?: string | null
        }
        Update: {
          accessibility?: number | null
          average_rating?: number | null
          category?: string | null
          created_at?: string
          id?: number
          location?: string | null
          main_image_url?: string | null
          name?: string | null
          number_of_reviews?: number | null
          participants?: number | null
          user_uuid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activities_user_uuid_fkey"
            columns: ["user_uuid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ratings: {
        Row: {
          activity_id: number | null
          created_at: string
          id: number
          user_id: string | null
          value: number | null
        }
        Insert: {
          activity_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
          value?: number | null
        }
        Update: {
          activity_id?: number | null
          created_at?: string
          id?: number
          user_id?: string | null
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_activity_id_fkey"
            columns: ["activity_id"]
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
      users: {
        Row: {
          banner_url: string | null
          birthDate: string | null
          description: string | null
          email: string | null
          home: string | null
          id: string
          last_name: string | null
          name: string | null
          profile_picture_url: string | null
        }
        Insert: {
          banner_url?: string | null
          birthDate?: string | null
          description?: string | null
          email?: string | null
          home?: string | null
          id: string
          last_name?: string | null
          name?: string | null
          profile_picture_url?: string | null
        }
        Update: {
          banner_url?: string | null
          birthDate?: string | null
          description?: string | null
          email?: string | null
          home?: string | null
          id?: string
          last_name?: string | null
          name?: string | null
          profile_picture_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_activity_main_image: {
        Args: {
          activity_id: number
        }
        Returns: string
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
