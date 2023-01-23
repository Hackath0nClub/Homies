export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      event: {
        Row: {
          capacity: number | null
          create_at: string | null
          end_at: string | null
          id: number
          image_url: string | null
          location_name: string | null
          location_url: string | null
          note: string | null
          price: number | null
          publicly: boolean | null
          start_at: string | null
          text: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          create_at?: string | null
          end_at?: string | null
          id?: number
          image_url?: string | null
          location_name?: string | null
          location_url?: string | null
          note?: string | null
          price?: number | null
          publicly?: boolean | null
          start_at?: string | null
          text?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          create_at?: string | null
          end_at?: string | null
          id?: number
          image_url?: string | null
          location_name?: string | null
          location_url?: string | null
          note?: string | null
          price?: number | null
          publicly?: boolean | null
          start_at?: string | null
          text?: string | null
          title?: string | null
          updated_at?: string | null
        }
      }
      event_dj: {
        Row: {
          end_time: string | null
          event_id: number
          id: number
          row_number: number
          start_time: string | null
          user_id: string
        }
        Insert: {
          end_time?: string | null
          event_id?: number
          id?: number
          row_number: number
          start_time?: string | null
          user_id: string
        }
        Update: {
          end_time?: string | null
          event_id?: number
          id?: number
          row_number?: number
          start_time?: string | null
          user_id?: string
        }
      }
      event_organizer: {
        Row: {
          event_id: number
          id: number
          user_id: string
        }
        Insert: {
          event_id?: number
          id?: number
          user_id: string
        }
        Update: {
          event_id?: number
          id?: number
          user_id?: string
        }
      }
      event_vj: {
        Row: {
          end_time: string | null
          event_id: number
          id: number
          row_number: number
          start_time: string | null
          user_id: string
        }
        Insert: {
          end_time?: string | null
          event_id?: number
          id?: number
          row_number: number
          start_time?: string | null
          user_id: string
        }
        Update: {
          end_time?: string | null
          event_id?: number
          id?: number
          row_number?: number
          start_time?: string | null
          user_id?: string
        }
      }
      profile: {
        Row: {
          create_at: string | null
          icon_url: string | null
          id: string
          mixcloud_url: string | null
          name: string
          soundcloud_url: string | null
          text: string | null
          twitter_url: string | null
          updated_at: string | null
          uuid: string
        }
        Insert: {
          create_at?: string | null
          icon_url?: string | null
          id: string
          mixcloud_url?: string | null
          name: string
          soundcloud_url?: string | null
          text?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          uuid: string
        }
        Update: {
          create_at?: string | null
          icon_url?: string | null
          id?: string
          mixcloud_url?: string | null
          name?: string
          soundcloud_url?: string | null
          text?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          uuid?: string
        }
      }
      ticket: {
        Row: {
          create_at: string | null
          event_id: number
          id: string
          status: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          create_at?: string | null
          event_id?: number
          id: string
          status?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          create_at?: string | null
          event_id?: number
          id?: string
          status?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
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
  }
}

