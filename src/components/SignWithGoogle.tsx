import { auth, provider } from "@/services/firebase";
import { signInWithPopup } from "firebase/auth";
import { redirect, useSearchParams } from "next/navigation";
import { AffiliateService } from "@/services/affiliate";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

const SignWithGoogle = () => {
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get('redirect')
    const signWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // Get user info
                const user = result.user;
                // Add to HubSpot
                await fetch('/api/hubspot/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: user.email,
                        firstname: user.displayName?.split(' ')[0] || '',
                        lastname: user.displayName?.split(' ').slice(1).join(' ') || '',
                    }),
                });
                const urlParams = new URLSearchParams(window.location.search);
                const referralCode = urlParams.get('ref');
                if (referralCode) {
                    const affiliatesRef = collection(db, 'affiliates');
                    const q = query(affiliatesRef, where('referralCode', '==', referralCode));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        const referrer = querySnapshot.docs[0].data();
                        await AffiliateService.addReferral(
                            referrer.userId,
                            user.uid,
                            user.email || "",
                            referralCode
                        );
                    }
                }
                redirect(redirectUrl ?? "/overview");
            });
    }
    return (
        <div onClick={signWithGoogle} className="font-sm text-black">Sign with Google</div>
    )
}
export default SignWithGoogle