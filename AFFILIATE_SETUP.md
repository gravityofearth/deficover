# Affiliate System Setup Guide

This guide will help you set up the complete affiliate system for your DeFiCover dashboard.

## Overview

The affiliate system includes:
- **Referral Link Generation**: Each user gets a unique referral link
- **Click Tracking**: Track clicks on referral links
- **Commission Calculation**: Automatic commission calculation based on subscription plans
- **Commission Maturity**: 30-day holding period before commissions are available
- **Withdrawal System**: Users can request withdrawals when balance reaches $25+
- **Real-time Dashboard**: Live statistics and referral tracking

## Commission Structure

| Plan | Commission Rate | Monthly Commission | Yearly Commission |
|------|----------------|-------------------|-------------------|
| Pro Monthly | 20% | $6.00 | - |
| Pro Yearly | 20% | - | $64.78 |
| Business Monthly | 15% | $13.35 | - |
| Business Yearly | 15% | - | $144.18 |

## Environment Variables

Add these to your `.env.local` file:

```bash
# Firebase Admin (for server-side operations)
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL=your-client-email
NEXT_PUBLIC_FIREBASE_PRIVATE_KEY=your-private-key

# Base URL for referral links
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# Cron job secret (generate a random string)
CRON_SECRET=your-cron-secret-key
```

## Firebase Firestore Collections

The system creates these collections automatically:

### `affiliates`
```typescript
{
  userId: string;
  referralCode: string;
  referralLink: string;
  totalClicks: number;
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  withdrawnEarnings: number;
  commissionRate: number;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `referrals`
```typescript
{
  id: string;
  referrerId: string;
  referredUserId: string;
  referredUserEmail: string;
  planName: string;
  subscriptionAmount: number;
  commissionAmount: number;
  status: 'pending' | 'matured' | 'paid';
  maturityDate: Timestamp;
  createdAt: Timestamp;
  paidAt?: Timestamp;
}
```

### `withdrawals`
```typescript
{
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedAt: Timestamp;
  processedAt?: Timestamp;
  paymentMethod: string;
  paymentDetails: string;
}
```

## API Endpoints

### GET `/api/affiliate`
Get affiliate data and statistics for the authenticated user.

### GET `/api/affiliate/referrals?page=1&limit=10`
Get paginated list of referrals for the authenticated user.

### GET `/api/affiliate/withdrawals`
Get withdrawal history for the authenticated user.

### POST `/api/affiliate/withdrawals`
Request a new withdrawal.

**Body:**
```json
{
  "amount": 50.00,
  "paymentMethod": "PayPal",
  "paymentDetails": "user@example.com"
}
```

### POST `/api/affiliate/track`
Track a click on a referral link.

**Body:**
```json
{
  "referralCode": "ABC12345"
}
```

### POST `/api/cron/process-commissions`
Process matured commissions (called by cron job).

## Cron Job Setup

Set up a daily cron job to process matured commissions:

### Vercel Cron (recommended)
Add to `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/process-commissions",
      "schedule": "0 0 * * *"
    }
  ]
}
```

### Manual Setup
Use a service like cron-job.org to call:
```
POST https://yourdomain.com/api/cron/process-commissions
Authorization: Bearer your-cron-secret-key
```

## How It Works

### 1. User Registration with Referral
1. User clicks referral link: `https://yourdomain.com/register?ref=ABC12345`
2. System tracks the click via `/api/affiliate/track`
3. User registers and subscribes
4. Webhook processes the subscription and creates referral record
5. Commission is calculated and added to pending earnings

### 2. Commission Maturity
1. Commissions are held for 30 days
2. Daily cron job processes matured commissions
3. Pending earnings move to available balance

### 3. Withdrawal Process
1. User requests withdrawal (minimum $25)
2. Admin reviews and processes withdrawal
3. Payment is sent via chosen method

## Frontend Integration

### Using the Affiliate Hook
```typescript
import { useAffiliate } from '@/hooks/useAffiliate';

function AffiliatePage() {
  const {
    affiliate,
    referrals,
    stats,
    loading,
    error,
    copyReferralLink,
    requestWithdrawal
  } = useAffiliate();

  // Use the data in your components
}
```

### Referral Link Integration
Update your registration page to handle referral codes:
```typescript
// In your registration component
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get('ref');
  if (ref) {
    // Store referral code for use during subscription
    setReferralCode(ref);
  }
}, []);
```

## Security Considerations

1. **Authentication**: All API endpoints require Firebase authentication
2. **Rate Limiting**: Implement rate limiting on tracking endpoints
3. **Validation**: All input is validated server-side
4. **Cron Security**: Use a secret key for cron job authentication
5. **Commission Limits**: Set maximum commission limits if needed

## Testing

### Test Referral Flow
1. Create a test user account
2. Get the referral link from the affiliate dashboard
3. Use the referral link to register a new account
4. Subscribe to a plan
5. Check that the referral appears in the dashboard

### Test Commission Processing
1. Create a referral with a past maturity date
2. Call the commission processing endpoint
3. Verify commissions move from pending to available

## Monitoring

Monitor these metrics:
- Total referrals per affiliate
- Conversion rates
- Commission payouts
- Withdrawal requests
- System performance

## Troubleshooting

### Common Issues

1. **Commissions not appearing**: Check webhook processing and Firebase permissions
2. **Referral links not working**: Verify base URL configuration
3. **Cron job failing**: Check cron secret and endpoint accessibility
4. **Withdrawal errors**: Verify minimum amount and balance validation

### Debug Logs
Check your server logs for:
- Webhook processing errors
- Commission calculation issues
- Authentication failures

## Support

For issues or questions:
1. Check the Firebase console for data consistency
2. Verify environment variables are set correctly
3. Test API endpoints individually
4. Review server logs for error messages

## Future Enhancements

Consider adding:
- Multi-level referral system
- Commission tiers based on performance
- Automated payout processing
- Advanced analytics and reporting
- Referral link customization
- Social media integration 