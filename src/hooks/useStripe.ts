import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';
import { STRIPE_PLANS } from '@/services/stripe';

interface UseStripeReturn {
  loading: boolean;
  error: string | null;
  createCheckoutSession: (planKey: string, isYearly: boolean) => Promise<void>;
}

export const useStripe = (): UseStripeReturn => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCheckoutSession = async (planKey: string, isYearly: boolean) => {
    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get the current user's ID token
      const token = await user.getIdToken();
      
      // Determine the price ID based on plan and billing cycle
      let priceId: string;
      let planName: string;
      
      if (planKey === 'PRO') {
        priceId = isYearly ? STRIPE_PLANS.PRO_YEARLY.priceId : STRIPE_PLANS.PRO_MONTHLY.priceId;
        planName = isYearly ? STRIPE_PLANS.PRO_YEARLY.name : STRIPE_PLANS.PRO_MONTHLY.name;
      } else if (planKey === 'BUSINESS') {
        priceId = isYearly ? STRIPE_PLANS.BUSINESS_YEARLY.priceId : STRIPE_PLANS.BUSINESS_MONTHLY.priceId;
        planName = isYearly ? STRIPE_PLANS.BUSINESS_YEARLY.name : STRIPE_PLANS.BUSINESS_MONTHLY.name;
      } else {
        throw new Error('Invalid plan selected');
      }

      // Create checkout session
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          priceId,
          planName,
          isYearly,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const stripe = await import('@stripe/stripe-js').then(({ loadStripe }) => 
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      );
      
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createCheckoutSession,
  };
}; 