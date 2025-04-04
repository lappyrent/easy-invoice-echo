
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
      clients: {
        Row: {
          id: string
          user_id: string
          name: string
          contact_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          billing_address: string | null
          shipping_address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          billing_address?: string | null
          shipping_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          contact_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          billing_address?: string | null
          shipping_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          date: string
          category: string
          amount: number
          notes: string | null
          billable: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id?: string | null
          date: string
          category: string
          amount: number
          notes?: string | null
          billable?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string | null
          date?: string
          category?: string
          amount?: number
          notes?: string | null
          billable?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      invoice_items: {
        Row: {
          id: string
          invoice_id: string
          description: string
          quantity: number
          unit_price: number
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          description: string
          quantity: number
          unit_price: number
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          description?: string
          quantity?: number
          unit_price?: number
          amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          invoice_number: string
          issue_date: string
          due_date: string
          status: string
          total_amount: number
          notes: string | null
          terms: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id?: string | null
          invoice_number: string
          issue_date: string
          due_date: string
          status?: string
          total_amount?: number
          notes?: string | null
          terms?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string | null
          invoice_number?: string
          issue_date?: string
          due_date?: string
          status?: string
          total_amount?: number
          notes?: string | null
          terms?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          user_id: string
          company_name: string | null
          company_address: string | null
          company_email: string | null
          company_phone: string | null
          company_website: string | null
          tax_number: string | null
          currency: string | null
          invoice_prefix: string | null
          next_invoice_number: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name?: string | null
          company_address?: string | null
          company_email?: string | null
          company_phone?: string | null
          company_website?: string | null
          tax_number?: string | null
          currency?: string | null
          invoice_prefix?: string | null
          next_invoice_number?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string | null
          company_address?: string | null
          company_email?: string | null
          company_phone?: string | null
          company_website?: string | null
          tax_number?: string | null
          currency?: string | null
          invoice_prefix?: string | null
          next_invoice_number?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      time_entries: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          project_name: string | null
          task_name: string | null
          date: string
          start_time: string | null
          end_time: string | null
          duration: number
          notes: string | null
          billable: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id?: string | null
          project_name?: string | null
          task_name?: string | null
          date: string
          start_time?: string | null
          end_time?: string | null
          duration: number
          notes?: string | null
          billable?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string | null
          project_name?: string | null
          task_name?: string | null
          date?: string
          start_time?: string | null
          end_time?: string | null
          duration?: number
          notes?: string | null
          billable?: boolean | null
          created_at?: string
          updated_at?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
