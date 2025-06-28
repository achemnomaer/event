export interface Event {
  id: string;
  event_id: string;
  title: string;
  slug: string;
  location: string;
  start_date: string;
  end_date: string;
  image?: string;
  short_description?: string;
  long_description?: string;
  highlights?: string[];
  who_attends?: string;
  event_programme?: string;
  register_link?: string;
  price: number;
  currency: string; // Add this field
  is_active: boolean;
  created_at: string;
  updated_at: string;
  early_bird_date?: string;
  early_bird_discount_percent: number;
  student_discount_percent: number;
  multi_event_discount_percent: number;
}

export interface EventsResponse {
  events: Event[];
  total: number;
}
