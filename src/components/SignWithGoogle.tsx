import { auth, provider } from "@/services/firebase";
import { signInWithPopup } from "firebase/auth";
import { redirect } from "next/navigation";

const SignWithGoogle = () => {
    const signWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((/**result */) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                
                // const user = result.user;
                redirect("/overview")
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })

    }
    return (
        <div onClick={signWithGoogle} className="font-sm text-black">Sign with Google</div>
    )
}
export default SignWithGoogle