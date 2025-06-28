export interface PersonalInfo {
  gender: string;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface OrganizationInfo {
  organizationName?: string;
  website?: string;
  address?: string;
  companyName?: string;
  country?: string;
  zipCode?: string;
  stateProvince?: string;
  streetAddress?: string;
  sendStudentsTo?: string[];
  organizationLocation?: string;
  interestedCountries?: string[];
}

export interface Participant {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

export interface GroupParticipants {
  participants?: Participant[];
}

export interface EventsSelection {
  selectedEvents: string[];
}

export interface RegistrationData {
  registrationType: "consultancy" | "student-guest";
  personalInfo: PersonalInfo;
  organizationInfo?: OrganizationInfo;
  events: EventsSelection;
  groupParticipants?: GroupParticipants;
}

export interface RegistrationRecord {
  id: string;
  user_id: string;
  registration_type: "consultancy" | "student-guest";
  personal_info: PersonalInfo;
  organization_info?: OrganizationInfo;
  selected_events: string[];
  group_participants?: Participant[];
  payment_status: "pending" | "succeeded" | "failed" | "cancelled";
  payment_amount?: number;
  payment_intent_id?: string;
  stripe_customer_id?: string;
  paid_at?: string;
  registration_number?: string;
  notes?: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  discount_applied?: string;
  discount_amount: number;
  group_size: number;
  created_at: string;
  updated_at: string;
}

export interface PricingCalculation {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  discountType: string | null;
  discountPercent: number;
}

export interface InstallmentPayment {
  id: string;
  registration_id: string;
  payment_intent_id: string;
  amount: number;
  payment_status: string;
  payment_date?: string;
  created_at: string;
  updated_at: string;
}
