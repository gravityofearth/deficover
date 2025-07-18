import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  secretKey: process.env.STRIPE_SECRET_KEY!,
};

// Plan configurations
export const STRIPE_PLANS = {
  PRO_MONTHLY: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!,
    name: 'Pro Plan - Monthly',
    price: 29.99,
  },
  PRO_YEARLY: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID!,
    name: 'Pro Plan - Yearly',
    price: 323.89, // 29.99 * 12 * 0.9
  },
  BUSINESS_MONTHLY: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID!,
    name: 'Business Plan - Monthly',
    price: 89,
  },
  BUSINESS_YEARLY: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID!,
    name: 'Business Plan - Yearly',
    price: 961.20, // 89 * 12 * 0.9
  },
}; 

// Subscription data interface
export interface SubscriptionData {
  id: string;
  status: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  planName: string;
  priceId: string;
  isYearly: boolean;
}