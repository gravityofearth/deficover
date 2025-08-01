import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";

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
        const referralCode = session.metadata?.referralCode;
        console.log('Checkout session completed:', session.id);
        
        // Here you can update user subscription status in your database
        const db = getFirestore();
        const affiliatesRef = db.collection("affiliates");
        const querySnapshot = await affiliatesRef.where("referralCode", "==", referralCode).get();

        if (!querySnapshot.empty) {
          const referrerDoc = querySnapshot.docs[0];
          const referrerId = referrerDoc.get("userId");
          const referredUserId = session.metadata?.userId;
          const referredUserEmail = session.customer_email;
          const planName = session.metadata?.planName;
          const subscriptionAmount = session.amount_total ? session.amount_total / 100 : 0;

          let commissionRate = 0.2;
          if (planName?.toLowerCase().includes("business")) commissionRate = 0.15;
          const commissionAmount = subscriptionAmount * commissionRate;

          const maturityDate = new Date();
          maturityDate.setDate(maturityDate.getDate() + 30);

          await db.collection("subscriptions").add({
            referrerId,
            referredUserId,
            referredUserEmail,
            planName,
            subscriptionAmount,
            commissionAmount,
            status: "pending",
            maturityDate,
            createdAt: new Date(),
          });
        }
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