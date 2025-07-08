"use client"
import Image from "next/image";
import Link from "next/link";
import { sendEmailVerification, signOut } from "firebase/auth";
import { useUser } from "@/store";
import { useState } from "react";
import { auth } from "@/services/firebase";


export default function Home() {
    const [sent, setSent] = useState(false)
    const { user } = useUser()
    const sendEmail = () => {
        if (!user || user === "None") return
        sendEmailVerification(user)
        signOut(auth)
        setSent(true)
    }
    return (
        <div className="flex justify-center items-center w-full min-h-[100vh] bg-[#050520] text-white">
            <div className="w-[438px] rounded-xl border-white/10 border-[1px] bg-linear-to-b from-transparent via-white/3 to-white/5 px-6 pt-[31px] pb-[15px]">
                <div className="flex justify-center mb-[11px]">
                    <Image src={"/logo.png"} alt="logo" width={69} height={70} />
                </div>
                {sent ?
                    <div className="text-sm text-center mb-4">Verification email sent. Check your inbox.</div> :
                    <>
                        <div className="text-sm text-center mb-4">Your email is not verified.</div>
                        <button onClick={sendEmail} className="rounded-lg bg-[#7D00FE] text-lg h-[39px] w-full mb-5 border-[1px] border-white/20 hover:bg-[#7D00FE]/90 hover:cursor-pointer">Send verification email</button>
                    </>}

                <div className="text-white/60 text-sm text-center mb-7">Do you have an account? <Link href="/login" className="text-white/80 underline">Log in</Link></div>
            </div>
        </div>
    );
}
