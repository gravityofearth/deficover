import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/services/firebase';

export const useAffiliate = () => {
  const [user] = useAuthState(auth);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAffiliateData = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/affiliate', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load affiliate data');
      }

      const data = await response.json();
      setAffiliate(data.affiliate);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = async () => {
    if (!affiliate?.referralLink) return;
    try {
      await navigator.clipboard.writeText(affiliate.referralLink);
    } catch {
      setError('Failed to copy link');
    }
  };

  useEffect(() => {
    if (user) {
      loadAffiliateData();
    }
  }, [user]);

  return {
    affiliate,
    loading,
    error,
    copyReferralLink,
    loadAffiliateData,
  };
}; 