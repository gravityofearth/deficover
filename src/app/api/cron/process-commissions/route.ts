import { NextRequest, NextResponse } from 'next/server';
import { AffiliateService } from '@/services/affiliate';

// This endpoint should be called by a cron job service (e.g., Vercel Cron)
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from a legitimate cron service
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Process matured commissions
    await AffiliateService.processMaturedCommissions();

    return NextResponse.json({ 
      success: true,
      message: 'Commissions processed successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing commissions:', error);
    return NextResponse.json(
      { error: 'Failed to process commissions' },
      { status: 500 }
    );
  }
} 