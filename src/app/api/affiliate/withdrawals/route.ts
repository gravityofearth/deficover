import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { AffiliateService } from '@/services/affiliate';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase token
    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;

    // Get withdrawal history
    const withdrawals = await AffiliateService.getWithdrawals(userId);

    return NextResponse.json({ withdrawals });
  } catch (error) {
    console.error('Error getting withdrawals:', error);
    return NextResponse.json(
      { error: 'Failed to get withdrawals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the Firebase token
    let decodedToken;
    try {
      decodedToken = await getAuth().verifyIdToken(token);
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const { amount, paymentMethod, paymentDetails } = await request.json();

    // Validate input
    if (!amount || amount < 25) {
      return NextResponse.json(
        { error: 'Minimum withdrawal amount is $25.00' },
        { status: 400 }
      );
    }

    if (!paymentMethod || !paymentDetails) {
      return NextResponse.json(
        { error: 'Payment method and details are required' },
        { status: 400 }
      );
    }

    // Request withdrawal
    const withdrawalId = await AffiliateService.requestWithdrawal(
      userId,
      amount,
      paymentMethod,
      paymentDetails
    );

    return NextResponse.json({ 
      withdrawalId,
      message: 'Withdrawal request submitted successfully' 
    });
  } catch (error) {
    console.error('Error requesting withdrawal:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to request withdrawal' },
      { status: 500 }
    );
  }
} 