export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          id: string
          name: string
          short_name: string
          university: string
          degree: string
          year: string
          skill: string
          category: string
          bio: string | null
          emoji: string
          city: string
          starting_price: string
          price_unit: string
          rating: number
          review_count: number
          tags: string[]
          verified: boolean
          active: boolean
          photo_url: string | null
          auth_user_id: string | null
          created_at: string
          availability: string[] | null
          portfolio_links: string | null
          extra_info: string | null
          secondary_skill: string | null
          whatsapp: string | null
        }
        Insert: Omit<Database['public']['Tables']['students']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['students']['Insert']>
      }
      student_pricing: {
        Row: {
          id: string
          student_id: string
          name: string
          description: string | null
          price: string
          unit: string
          featured: boolean
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['student_pricing']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['student_pricing']['Insert']>
      }
      student_portfolio: {
        Row: {
          id: string
          student_id: string
          emoji: string | null
          label: string | null
          image_url: string | null
          sort_order: number
        }
        Insert: Omit<Database['public']['Tables']['student_portfolio']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['student_portfolio']['Insert']>
      }
      student_reviews: {
        Row: {
          id: string
          student_id: string
          booking_id: string | null
          reviewer_name: string
          stars: number
          text: string | null
          verified: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['student_reviews']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['student_reviews']['Insert']>
      }
      bookings: {
        Row: {
          id: string
          student_id: string | null
          client_name: string
          client_email: string
          client_whatsapp: string
          description: string | null
          reference: string
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'reference'> & { reference?: string }
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>
      }
      waitlist: {
        Row: {
          id: string
          name: string
          email: string
          university: string | null
          year: string | null
          skill: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['waitlist']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['waitlist']['Insert']>
      }
      verification_requests: {
        Row: {
          id: string
          student_id: string
          card_image_url: string
          status: 'pending' | 'approved' | 'rejected'
          rejection_note: string | null
          submitted_at: string
          reviewed_at: string | null
        }
        Insert: Omit<Database['public']['Tables']['verification_requests']['Row'], 'id' | 'submitted_at'>
        Update: Partial<Database['public']['Tables']['verification_requests']['Insert']>
      }
    }
  }
}

// Convenient row types
export type Student = Database['public']['Tables']['students']['Row']
export type StudentPricing = Database['public']['Tables']['student_pricing']['Row']
export type StudentPortfolio = Database['public']['Tables']['student_portfolio']['Row']
export type StudentReview = Database['public']['Tables']['student_reviews']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Waitlist = Database['public']['Tables']['waitlist']['Row']
export type VerificationRequest = Database['public']['Tables']['verification_requests']['Row']

// Student with all relations
export type StudentFull = Student & {
  student_pricing: StudentPricing[]
  student_portfolio: StudentPortfolio[]
  student_reviews: StudentReview[]
}
