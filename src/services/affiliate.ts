import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { generateReferralCode } from '../utils/affiliate';

// Commission rates
export const COMMISSION_RATES = {
  PRO_MONTHLY: 0.20,
  PRO_YEARLY: 0.20,
  BUSINESS_MONTHLY: 0.15,
  BUSINESS_YEARLY: 0.15,
};

export class AffiliateService {
  // Initialize affiliate account
  static async initializeAffiliate(userId: string) {
    const referralCode = generateReferralCode();
    const referralLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${referralCode}`;
    
    const affiliateData = {
      userId,
      referralCode,
      referralLink,
      totalClicks: 0,
      totalReferrals: 0,
      totalEarnings: 0,
      pendingEarnings: 0,
      withdrawnEarnings: 0,
      isActive: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'affiliates', userId), affiliateData);
    return affiliateData;
  }

  // Get affiliate data
  static async getAffiliateData(userId: string) {
    const docRef = doc(db, 'affiliates', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  }

  // Track click
  static async trackClick(referralCode: string) {
    const affiliatesRef = collection(db, 'affiliates');
    const q = query(affiliatesRef, where('referralCode', '==', referralCode));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const affiliateDoc = querySnapshot.docs[0];
      await updateDoc(affiliateDoc.ref, {
        totalClicks: increment(1),
        updatedAt: serverTimestamp(),
      });
    }
  }

  // Get referrals for a user
  static async getReferrals(userId: string, page: number = 1, limit: number = 10) {
    const referralsRef = collection(db, 'referrals');
    const q = query(referralsRef, where('referrerId', '==', userId));
    const querySnapshot = await getDocs(q);
    const allReferrals = querySnapshot.docs.map(doc => doc.data());
    const start = (page - 1) * limit;
    const paginated = allReferrals.slice(start, start + limit);
    return { referrals: paginated };
  }

  // Get withdrawals for a user
  static async getWithdrawals(userId: string) {
    // TODO: Implement actual logic to fetch withdrawals from your database
    // Example placeholder:
    const withdrawalsRef = collection(db, 'withdrawals');
    const q = query(withdrawalsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  static async requestWithdrawal(userId: string, amount: number, paymentMethod: string, paymentDetails: any) {
    // TODO: Implement actual logic to create a withdrawal request in your database
    // Example placeholder:
    // You might want to generate a unique withdrawalId here
    const withdrawalRef = doc(collection(db, 'withdrawals'));
    await setDoc(withdrawalRef, {
      userId,
      amount,
      paymentMethod,
      paymentDetails,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return withdrawalRef.id;
  }

  static async processMaturedCommissions() {
    // TODO: Implement logic to process matured commissions
    // Example placeholder:
    console.log('Processing matured commissions...');
  }
} 