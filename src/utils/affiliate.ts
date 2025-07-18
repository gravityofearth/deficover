// Generate unique referral code
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

// Calculate commission amount
export function calculateCommission(amount: number, rate: number): number {
  return Math.round(amount * rate * 100) / 100;
}

// Get commission rate for plan
export function getCommissionRate(planName: string): number {
  const rates: { [key: string]: number } = {
    'PRO_MONTHLY': 0.20,
    'PRO_YEARLY': 0.20,
    'BUSINESS_MONTHLY': 0.15,
    'BUSINESS_YEARLY': 0.15,
  };
  return rates[planName] || 0.20;
}

// Validate referral code format
export function isValidReferralCode(code: string): boolean {
  return /^[A-Z0-9]{8}$/.test(code);
}

// Get plan display name
export function getPlanDisplayName(planName: string): string {
  const planNames: { [key: string]: string } = {
    'PRO_MONTHLY': 'Pro',
    'PRO_YEARLY': 'Pro',
    'BUSINESS_MONTHLY': 'Business',
    'BUSINESS_YEARLY': 'Business',
  };
  return planNames[planName] || planName;
}

// Get plan period
export function getPlanPeriod(planName: string): string {
  if (planName.includes('YEARLY')) return 'Yearly';
  if (planName.includes('MONTHLY')) return 'Monthly';
  return 'Unknown';
} 