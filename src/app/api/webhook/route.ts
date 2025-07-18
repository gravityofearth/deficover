import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);
        
        // Handle affiliate referral if present
        if (session.metadata?.referralCode) {
          try {
            const { AffiliateService } = await import('@/services/affiliate');
            const { getAuth } = await import('firebase-admin/auth');
            
            // Get user info from session metadata
            const userId = session.metadata.userId;
            const planName = session.metadata.planName;
            const referralCode = session.metadata.referralCode;
            
            // Get referrer ID from referral code
            const { collection, query, where, getDocs } = await import('firebase/firestore');
            const { db } = await import('@/services/firebase');
            
            const affiliatesRef = collection(db, 'affiliates');
            const q = query(affiliatesRef, where('referralCode', '==', referralCode));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
              const referrerId = querySnapshot.docs[0].data().userId;
              const userEmail = session.customer_email || '';
              
              // Calculate subscription amount
              let subscriptionAmount = 0;
              if (planName.includes('PRO_MONTHLY')) subscriptionAmount = 29.99;
              else if (planName.includes('PRO_YEARLY')) subscriptionAmount = 323.89;
              else if (planName.includes('BUSINESS_MONTHLY')) subscriptionAmount = 89;
              else if (planName.includes('BUSINESS_YEARLY')) subscriptionAmount = 961.20;
              
              // Create referral record
              await AffiliateService.createReferral(
                referrerId,
                userId,
                userEmail,
                planName,
                subscriptionAmount
              );
              
              console.log(`Affiliate referral created: ${referrerId} -> ${userId}`);
            }
          } catch (error) {
            console.error('Error processing affiliate referral:', error);
          }
        }
        
        // Here you can update user subscription status in your database
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription created:', subscription.id);
        // Handle new subscription
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription updated:', updatedSubscription.id);
        // Handle subscription updates
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', deletedSubscription.id);
        // Handle subscription cancellation
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment succeeded:', invoice.id);
        // Handle successful payment
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed:', failedInvoice.id);
        // Handle failed payment
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
} 