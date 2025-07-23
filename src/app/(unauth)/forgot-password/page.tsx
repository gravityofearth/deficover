"use client"
import Image from "next/image";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "@/services/firebase";


export default function Home() {
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const sendEmail = () => {
        sendPasswordResetEmail(auth, email)
        setSent(true)
    }
    return (
        <div className="flex justify-center items-center w-full min-h-[100vh] bg-[#050520] text-white">
            <div className="w-[438px] rounded-xl border-white/10 border-[1px] bg-linear-to-b from-transparent via-white/3 to-white/5 px-6 pt-[31px] pb-[15px]">
                <div className="flex justify-center mb-[11px]">
                    <a href="https://deficover.com" target="_self" rel="noopener noreferrer">
                        <Image src={"/logo.png"} alt="logo" width={69} height={70} className="cursor-pointer" />
                    </a>
                </div>
                {sent ?
                    <div className="text-sm text-center mb-4">Password reset email sent. Check your inbox.</div> :
                    <>
                        <div className="text-sm text-center mb-4">Password reset email will be sent to your email inbox.</div>
                        <div className="relative mb-4">
                            <svg width={16} height={12} className="absolute left-3 top-3.5"><use href="#svg-envelop" /></svg>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" type="email" className="w-full h-10 border-[1px] border-white/20 rounded-lg text-sm pl-10" placeholder="Email address" />
                        </div>
                        <button onClick={sendEmail} className="rounded-lg bg-[#7D00FE] text-lg h-[39px] w-full mb-5 border-[1px] border-white/20 hover:bg-[#7D00FE]/90 hover:cursor-pointer">Reset password</button>
                    </>}

                <div className="text-white/60 text-sm text-center mb-7">Do you have an account? <Link href="/login" className="text-white/80 underline">Log in</Link></div>
            </div>
        </div>
    );
}
