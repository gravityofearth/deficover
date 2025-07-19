"use client"
import Sidebar from "@/components/Sidebar";
import { auth } from "@/services/firebase";
import { useUser } from "@/store";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from "react";


export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUser()
    const [showSidebar, setShowSidebar] = useState(false)
    const pathname = usePathname()
    const exit = () => {
        signOut(auth)
    }
    useEffect(() => {
        if (!user) return
        if (user === "None") redirect(`/login?redirect=${pathname}`)
        console.log(user)
        if (!user.emailVerified) redirect("/verify-email")
    }, [user])
    return (
        <>
            {
                user && user !== "None" &&
                <div className="w-full min-h-[100vh] bg-[#050520] text-white relative">
                    {showSidebar &&
                        <div onClick={() => setShowSidebar(false)} className="w-full h-full bg-black absolute left-0 right-0 top-0 bottom-0 z-50 flex flex-col justify-center items-center">
                            <button onClick={() => setShowSidebar(false)} className="absolute right-2 top-2 cursor-pointer">X</button>
                            <div className="max-w-[3/4] flex flex-col justify-center items-start">
                                <Sidebar />
                            </div>
                            <div className="h-[88px] w-full bg-white/4 flex items-center justify-between border-t-[1px] border-white/20 bottom-0 absolute">
                                <Image alt="user" src={user ? user.photoURL ?? "/user.png" : "/user.png"} height={40} width={40} className="rounded-full" />
                                <div>
                                    <div className="w-full flex flex-col">
                                        <div className="font-medium text-sm">{user?.displayName}</div>
                                        <div className="font-medium text-xs text-[#525866]">{user?.email}</div>
                                    </div>
                                </div>
                                <Link href="/profile" className="hover:bg-white/10 p-2 rounded-full">
                                    <svg width={18} height={17}><use href="#svg-setting" /></svg>
                                </Link>
                            </div>
                        </div>
                    }
                    <div className="w-full px-8 py-3 bg-white/2 flex justify-between items-center border-b-[1px] border-white/15"> {/* header */}
                        <div className="flex gap-4">
                            <button onClick={() => setShowSidebar(true)} className="flex md:hidden justify-center items-center hover:cursor-pointer">
                                <span className="text-xl scale-x-125">☰</span>
                            </button>
                            <Link href={"/"} className="flex items-center">
                                <Image alt="full-logo" src={"/full-logo.png"} width={165} height={30}></Image>
                            </Link>
                        </div>
                        <div onClick={exit} className="p-2.5 border-[1px] border-white/15 bg-white/5 rounded-lg cursor-pointer"><svg width={20} height={20}><use href="#svg-exit" /></svg></div>
                    </div>
                    <div className="flex h-[calc(100vh-67px)] "> {/* content */}
                        <div className="border-r-[1px] border-white/15 flex max-md:hidden flex-col justify-between"> {/* sidebar */}
                            <div className="w-[272px] bg-white/2 p-5 flex-1">
                                <Sidebar />
                            </div>
                            <div className="flex justify-between ">
                                <div className="w-5 bg-white/4"></div>
                                <div className="h-[88px] w-full bg-white/4 flex items-center justify-between border-t-[1px] border-white/20">
                                    <Image alt="user" src={user ? user.photoURL ?? "/user.png" : "/user.png"} height={40} width={40} className="rounded-full" />
                                    <div>
                                        <div className="w-full flex flex-col">
                                            <div className="font-medium text-sm">{user?.displayName}</div>
                                            <div className="font-medium text-xs text-[#525866]">{user?.email}</div>
                                        </div>
                                    </div>
                                    <Link href="/profile" className="hover:bg-white/10 p-2 rounded-full">
                                        <svg width={18} height={17}><use href="#svg-setting" /></svg>
                                    </Link>
                                </div>
                                <div className="w-5 bg-white/4"></div>
                            </div>
                        </div>
                        <div className="w-full overflow-y-auto h-full">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
