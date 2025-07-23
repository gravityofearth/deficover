"use client"
import SignWithGoogle from "@/components/SignWithGoogle";
import { auth } from "@/services/firebase";
import { isValidEmail, showToast } from "@/utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, useState } from "react";

const Home = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const signUpWithEmail = () => {
        if (!isValidEmail) {
            showToast("Invalid email address", "error")
            return
        }
        if (email.trim() === "") {
            showToast("Missing email", "error")
            return
        }
        if (password.trim() === "") {
            showToast("Missing password", "error")
            return
        }
        if (password !== confirmPassword) {
            showToast("Password does not match", "error")
            return
        }
        createUserWithEmailAndPassword(auth, email.trim(), password)
            .then(async () => {
                // Add to HubSpot
                await fetch('/api/hubspot/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email.trim(),
                        // Add firstname/lastname if you collect them
                    }),
                });
                // Redirect or show success
                redirect('/verify-email');
            })
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                if (error.message === 'NEXT_REDIRECT') {
                    throw error; // re-throw so Next.js can handle redirect
                }
            });

    }
    return (
        <div className="flex justify-center items-center w-full min-h-[100vh] bg-[#050520] text-white">
            <div className="w-[438px] rounded-xl border-white/10 border-[1px] bg-linear-to-b from-transparent via-white/3 to-white/5 px-6 pt-[31px] pb-[15px]">
                <div className="flex justify-center mb-[11px]">
                    <a href="https://deficover.com" target="_self" rel="noopener noreferrer">
                        <Image src={"/logo.png"} alt="logo" width={69} height={70} className="cursor-pointer" />
                    </a>
                </div>
                <div className="font-semibold text-xl text-center mb-4">Get Started</div>
                <div className="text-white/60 text-sm text-center mb-8">Please enter your details to get started</div>
                <div className="relative mb-4">
                    <svg width={16} height={12} className="absolute left-3 top-3.5"><use href="#svg-envelop" /></svg>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className="w-full h-10 border-[1px] border-white/20 rounded-lg text-sm pl-10" placeholder="Email address" />
                </div>
                <div className="relative mb-4">
                    <svg width={14} height={17} className="absolute left-3 top-3"><use href="#svg-lock" /></svg>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" type="password" className="w-full h-10 border-[1px] border-white/20 rounded-[8px] text-sm pl-10" placeholder="Password" />
                </div>
                <div className="relative mb-6">
                    <svg width={16} height={20} className="absolute left-3 top-3"><use href="#svg-lock" /></svg>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" type="password" className="w-full h-10 border-[1px] border-white/20 rounded-[8px] text-sm pl-10" placeholder="Confirm Password" />
                </div>
                <button onClick={signUpWithEmail} className="rounded-lg bg-[#7D00FE] font-semibold text-[18px] h-[39px] w-full mb-5 border-[1px] border-white/20 hover:bg-[#7D00FE]/90 hover:cursor-pointer">Sign Up</button>
                <div className="flex justify-between items-center mb-7">
                    <div className="w-[40%] h-0 border-[0.5px] border-white/30"></div>
                    <div className="text-white/30">OR</div>
                    <div className="w-[40%] h-0 border-[0.5px] border-white/30"></div>
                </div>
                <button className="flex justify-center items-center w-full p-2.5 bg-linear-to-t from-[#999999] to-white rounded-[8px] mb-4 hover:cursor-pointer">
                    <svg width={20} height={20} className="mr-2"><use href="#svg-google" /></svg>
                    <SignWithGoogle />
                </button>
                <div className="text-white/60 text-sm text-center mb-7">Do you have an account? <Link href="./login" className="text-white/80 underline">Log in</Link></div>
            </div>
        </div>
    );
}

export default function Register() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Home />
        </Suspense>
    )
}
