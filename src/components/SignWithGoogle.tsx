import { auth, provider } from "@/services/firebase";
import { signInWithPopup } from "firebase/auth";
import { redirect, useSearchParams } from "next/navigation";

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
                redirect(redirectUrl ?? "/overview");
            });
    }
    return (
        <div onClick={signWithGoogle} className="font-sm text-black">Sign with Google</div>
    )
}
export default SignWithGoogle