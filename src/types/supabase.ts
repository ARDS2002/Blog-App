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
      posts: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          created_at: string
          published: boolean
          slug: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          created_at?: string
          published?: boolean
          slug: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          created_at?: string
          published?: boolean
          slug?: string
        }
      }
    }
  }
}