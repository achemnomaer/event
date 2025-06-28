/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PaymentIntentRequest {
  amount?: number;
  registrationData: any;
  selectedEvents: string[];
  isInstallment?: boolean;
  installmentAmount?: number;
  registrationId?: string;
}

export interface PricingCalculation {
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  registrationId: string;
  pricing?: PricingCalculation;
}

export interface InstallmentPayment {
  id: string;
  registration_id: string;
  payment_intent_id: string;
  amount: number;
  payment_status: string;
  payment_date?: string;
  created_at: string;
}
