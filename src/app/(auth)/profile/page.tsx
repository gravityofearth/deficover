'use client'

import AvatarUploader from "@/components/Uploader";
import { auth } from "@/services/firebase";
import { useUser } from "@/store";
import { showToast } from "@/utils";
import { EmailAuthProvider, GoogleAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup, updatePassword, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";

const BillingCard = () => {
    return (
        <div className="flex flex-col gap-6 w-full border-white/15 border-[1px] p-8 rounded-xl bg-white/3 mt-6">

            {/* Current Plan */}
            <div className="p-4 flex justify-between items-center bg-white/3 rounded-lg">
                <div className="flex flex-col gap-1">
                    <div className="font-medium text-xl">Current Plan: Basic</div>
                    <div className="text-sm leading-[18px] text-white/60">$19.99/month • Next billing: June 15, 2025</div>
                </div>
                <div className="text-sm font-bold text-[#7D00FE]">Change Plan</div>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-3">
                <div className="text-xl leading-[130%]">Payment Method</div>
                <div className="p-4 flex justify-between items-center bg-white/3 rounded-lg border-white/20 border-[1.4px]">
                    <div className="flex gap-3 items-center">
                        <div className="w-8 h-8 bg-[#7D00FE]/20 rounded-sm flex justify-center items-center">
                            <Image alt="payment-card" width={24} height={24} src={"/payment-card.png"}></Image>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="font-medium">**** **** **** 4242</div>
                            <div className="text-sm leading-6">Expires 12/25</div>
                        </div>
                    </div>
                    <div className="text-sm font-bold text-[#7D00FE]">Change</div>
                </div>
            </div>

            {/* Billing History */}
            <div className="flex flex-col gap-3">
                <div className="text-xl leading-[130%]">Billing History</div>
                <div className="p-4 flex justify-between items-center bg-white/3 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <div className="font-medium">2025-03-15</div>
                        <div className="text-sm leading-[18px] text-white/60">Basic Plan</div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                        <div className="text-lg font-medium w-[76px] text-center">$19.99</div>
                        <div className="text-sm text-[#16A34A] w-[76px] text-center">Paid</div>
                        <div className="text-sm text-white/60 w-[76px] text-center">Download</div>
                    </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-white/3 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <div className="font-medium">2025-03-15</div>
                        <div className="text-sm leading-[18px] text-white/60">Basic Plan</div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                        <div className="text-lg font-medium w-[76px] text-center">$19.99</div>
                        <div className="text-sm text-[#16A34A] w-[76px] text-center">Paid</div>
                        <div className="text-sm text-white/60 w-[76px] text-center">Download</div>
                    </div>
                </div>
                <div className="p-4 flex justify-between items-center bg-white/3 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <div className="font-medium">2025-03-15</div>
                        <div className="text-sm leading-[18px] text-white/60">Basic Plan</div>
                    </div>
                    <div className="flex gap-2.5 items-center">
                        <div className="text-lg font-medium w-[76px] text-center">$19.99</div>
                        <div className="text-sm text-[#16A34A] w-[76px] text-center">Paid</div>
                        <div className="text-sm text-white/60 w-[76px] text-center">Download</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
const SecurityCard = () => {
    const { user } = useUser()
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const changePassword = async () => {
        if (user === "None") return
        if (newPassword !== confirmPassword) {
            showToast("Passwords do not match", "error")
            return
        }
        const credential = EmailAuthProvider.credential(
            user!.email!,
            currentPassword
        );
        try {
            await reauthenticateWithCredential(user!, credential)
            updatePassword(user!, newPassword).then(() => {
                showToast("Password changed successfully", "success")
            })
        } catch {
            showToast("Error changing password", "error")
        }
    }
    return (
        <div className="flex flex-col gap-4 w-full border-white/15 border-[1px] p-6 rounded-xl bg-white/3 mt-6">

            {/* Status */}
            <div className="w-full p-4 bg-white/3 rounded-lg">
                <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 flex justify-center items-center bg-[#7D00FE]/20 rounded-sm">
                        <svg width={15} height={18.42} ><use href="#svg-security-shield" /></svg>
                    </div>
                    <div>
                        <div className="font-medium text-[#16A34A]">Account Security Status</div>
                        <div className="font-medium text-[10px] leading-6 text-white/80">Your account is secure with 2FA enabled</div>
                    </div>
                </div>
            </div>

            {/* Password Part */}
            {user !== "None" && user?.providerData[0].providerId === "password" && <>
                <div className="flex flex-col gap-3">
                    <div className="text-xl leading-[130%]">Change Password</div>

                    {/* Current Password */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
                        <div className="flex flex-col gap-2 items-start w-full">
                            <div className="font-medium">Current Password</div>
                            <input value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} type="password" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="**************" />
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
                        <div className="flex flex-col gap-2 items-start w-full">
                            <div className="font-medium">New Password</div>
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="**************" />
                        </div>
                        <div className="flex flex-col gap-2 items-start w-full">
                            <div className="font-medium">Confirm New Password</div>
                            <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="**************" />
                        </div>
                    </div>
                </div>

                <button onClick={changePassword} className="w-[168px] h-10 bg-linear-to-b from-transparent to-white/8 rounded-[6px] border-[1px] border-white/30 text-sm leading-[26px] font-semibold cursor-pointer">Change Password</button>
            </>}

            {/* 2fa Part */}
            <div className="flex flex-col gap-3">
                <div className="text-xl leading-[130%]">Two-Factor Authentication</div>
                <div className="p-4 flex justify-between bg-white/3 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <div className="font-medium">SMS Authentication</div>
                        <div className="text-sm leading-[18px] text-white/60">Enabled for +1 (555) 123-4567</div>
                    </div>
                    <div>toggle</div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="flex flex-col gap-3">
                <div className="text-xl leading-[130%]">Recent Activity</div>
                <div className="p-4 flex justify-between items-center bg-white/3 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <div className="font-medium">Login from Chrome on Windows OS</div>
                        <div className="text-sm leading-[18px] text-white/60">2 hours ago • 192.168.1.1</div>
                    </div>
                    <div className="text-sm text-[#16A34A]">Current session</div>
                </div>
                <div className="p-4 flex justify-between bg-white/3 rounded-lg">
                    <div className="flex flex-col gap-1">
                        <div className="font-medium">Login from Safari on iPhone</div>
                        <div className="text-sm leading-[18px] text-white/60">1 day ago • 10.0.0.1</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
/* eslint-disable @typescript-eslint/no-explicit-any */
const ProfileCard = () => {
    const { user } = useUser()

    const [avatarFiles, setAvatarFiles] = useState<any[]>([]);
    const [email, setEmail] = useState(user && user !== "None" ? user.email! : "")
    const [displayName, setDisplayName] = useState(user && user !== "None" ? user.displayName ?? "" : "")
    const [changed, setChanged] = useState(false)
    const [emailChanged, setEmailChanged] = useState(false)
    const [saving, setSaving] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [confirmationPassword, setConfirmationPassword] = useState("")
    const doChangePassword = async () => {
        if (user === "None") return
        setShowConfirmation(false)
        const credential = EmailAuthProvider.credential(
            user!.email!,
            confirmationPassword
        );

        await reauthenticateWithCredential(user!, credential);
        verifyBeforeUpdateEmail(user!, email)
    }
    const changeProfile = async () => {
        if (user === "None") return
        if (changed) {
            setSaving(true)
            if (emailChanged) {
                if (user?.providerData[0].providerId === "password") {
                    setShowConfirmation(true)
                } else if (user?.providerData[0].providerId === "google.com") {
                    const provider = new GoogleAuthProvider();
                    await reauthenticateWithPopup(auth.currentUser!, provider);
                    verifyBeforeUpdateEmail(user!, email)
                }
            }
            if (avatarFiles.length > 0) {
                const formData = new FormData()
                formData.append("file", avatarFiles[0])
                fetch(`http://192.168.142.86:3000/api/upload`, {
                    method: "POST",
                    body: formData
                }).then(res => res.json()).then(res => {
                    updateProfile(user!, {
                        displayName: displayName,
                        photoURL: `http://192.168.142.86:3000/api/uploads/${res.fileId}`
                    }).then(() => setChanged(false))
                })
            } else {
                updateProfile(user!, {
                    displayName: displayName,
                }).then(() => setChanged(false))
            }
        }
    }
    useEffect(() => {
        if (avatarFiles.length > 0) {
            setChanged(true)
        }
    }, [avatarFiles])
    useEffect(() => {
        if (!changed) {
            setSaving(false)
        }
    }, [changed])
    return (
        <div className="flex flex-col gap-4 w-full border-white/15 border-[1px] p-6 rounded-xl bg-white/3 mt-6">

            {/* Upload Part */}
            <div className="flex flex-col gap-6 w-full">

                {/* Upload Image */}
                {/* <div className="flex gap-5">
                    <div className="flex justify-center items-center">
                        <Image alt="user" src={user && user !== "None" ? user.photoURL ?? "" : "/user.png"} width={98} height={98} className="rounded-full" />
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex flex-col gap-1">
                            <Previews />
                        </div>
                        <button className="text-sm leading-[26px] w-[102px] h-10 border-[1px] border-white/30 rounded-[6px] bg-linear-to-b from-transparent to-white/8">Upload</button>
                    </div>
                </div> */}
                <AvatarUploader avatarFiles={avatarFiles} setAvatarFiles={setAvatarFiles} />

                {/* Name & Email */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[14px]">
                    <div className="flex flex-col gap-2 items-start w-full">
                        <div className="font-medium">Full Name</div>
                        <input value={displayName} onChange={(e) => {
                            setDisplayName(e.target.value)
                            setChanged(true)
                        }} type="text" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="John Doe" />
                    </div>
                    <div className="flex flex-col gap-2 items-start w-full">
                        <div className="font-medium">Email Address</div>
                        <input value={email} onChange={(e) => {
                            setEmail(e.target.value)
                            setChanged(true)
                            setEmailChanged(true)
                        }} type="text" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="john.doe@example.com" />
                    </div>

                    <div className="flex flex-col gap-2 items-start w-full">
                        <div className="font-medium">Phone Number</div>
                        <input value={user && user !== "None" ? user.phoneNumber ?? "" : ""} type="text" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="+1 (555) 123-4567" />
                    </div>
                </div>
            </div>

            {
                changed && <>
                    <div className="w-full bg-white/20 h-[1px]"></div>
                    <div className="flex justify-end gap-[13px]">
                        <button className="w-[120px] h-10 bg-linear-to-b from-transparent to-white/8 border-[1px] border-white/10 text-sm rounded-[6px] cursor-pointer">Cancel</button>
                        <button onClick={changeProfile} disabled={saving} className="flex justify-center items-center gap-1 w-[136px] h-10 bg-[#7D00FE] border-[1px] border-white/20 text-sm rounded-[6px] cursor-pointer disabled:cursor-not-allowed">
                            <span>Save Changes</span>
                            {saving && <svg width={20} height={20}><use href="#svg-loading" /></svg>}
                        </button>
                    </div>
                </>
            }
            {showConfirmation && <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50">
                <div className="flex flex-col w-[400px] border border-white bg-black rounded-xl p-6 relative">
                    <button onClick={() => setShowConfirmation(false)} className="absolute top-0 right-0 cursor-pointer">X</button>
                    <input value={confirmationPassword} onChange={(e) => setConfirmationPassword(e.target.value)} type="password" className="w-full p-4 border-[1px] border-white/15 rounded-lg bg-white/3 font-medium" placeholder="Enter your password" />
                    <button onClick={doChangePassword} className="w-full h-10 bg-linear-to-b from-transparent to-white/8 border-[1px] border-white/10 text-sm rounded-[6px] cursor-pointer">Confirm</button>
                </div>
            </div>}
        </div>
    )
}
export default function Home() {
    const [curTab, setCurTab] = useState<"profile" | "security" | "billing">("profile")
    return (
        <div className="p-8 w-full">

            {/* title */}
            <div className="font-bold text-[32px] leading-[1.4]">Account Setting</div>

            {/* description */}
            <div className="text-sm text-white/80 mb-6">Manage your account preferences and security</div>

            {/* overview */}
            <div>

                {/* Tabs */}
                <div className="flex p-1 border-[1px] border-white/20 rounded-lg w-fit gap-1">
                    <div onClick={() => setCurTab("profile")} className={`w-24 h-8 flex justify-center items-center text-sm text-white/80 leading-[26px] cursor-pointer ${curTab === "profile" ? "bg-linear-to-b from-transparent to-white/8 border-[1px] border-white/10 rounded-[6px]" : ""}`}>Profile</div>
                    <div onClick={() => setCurTab("security")} className={`w-24 h-8 flex justify-center items-center text-sm text-white/80 leading-[26px] cursor-pointer ${curTab === "security" ? "bg-linear-to-b from-transparent to-white/8 border-[1px] border-white/10 rounded-[6px]" : ""}`}>Security</div>
                    <div onClick={() => setCurTab("billing")} className={`w-24 h-8 flex justify-center items-center text-sm text-white/80 leading-[26px] cursor-pointer ${curTab === "billing" ? "bg-linear-to-b from-transparent to-white/8 border-[1px] border-white/10 rounded-[6px]" : ""}`}>Billing</div>
                </div>

                {curTab === "profile" && <ProfileCard />}
                {curTab === "security" && <SecurityCard />}
                {curTab === "billing" && <BillingCard />}
            </div>

        </div>
    );
}
