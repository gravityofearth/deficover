import { NextRequest, NextResponse } from 'next/server';
import { AffiliateService } from '@/services/affiliate';
import { isValidReferralCode } from '@/utils/affiliate';

export async function POST(request: NextRequest) {
  try {
    const { referralCode } = await request.json();

    // Validate referral code
    if (!referralCode || !isValidReferralCode(referralCode)) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 400 }
      );
    }

    // Track the click
    await AffiliateService.trackClick(referralCode);

    return NextResponse.json({ 
      success: true,
      message: 'Click tracked successfully' 
    });
  } catch (error) {
    console.error('Error tracking click:', error);
    return NextResponse.json(
      { error: 'Failed to track click' },
      { status: 500 }
    );
  }
} 