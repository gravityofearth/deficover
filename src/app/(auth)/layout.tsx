"use client"
import { auth } from "@/services/firebase";
import { useUser } from "@/store";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useMemo } from "react";
const SidebarItem = ({ title, icon, href }: { title: string, icon: string, href: string }) => {
    const pathname = usePathname()
    const isActive = useMemo(() => pathname === href, [pathname])

    return (
        <Link href={href} className={`px-3 py-2 rounded-lg font-medium text-sm text-white/80 flex items-center tracking-[-0.03em] hover:underline ${isActive ? "bg-white/10" : ""}`} ><svg width={15} height={15} className="m-[2.5px]"><use href={`#svg-${icon}`} /></svg><span className="ml-[7.5px]">{title}</span></Link>
    )
}

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUser()
    const exit = () => {
        signOut(auth)
    }
    useEffect(() => {
        if (!user) return
        if (user === "None") redirect("/login")
        console.log(user)
        if (!user.emailVerified) redirect("/verify-email")
    }, [user])
    return (
        <>
            {
                user && user !== "None" &&
                <div className="w-full min-h-[100vh] bg-[#050520] text-white">
                    <div className="w-full px-8 py-3 bg-white/2 flex justify-between items-center border-b-[1px] border-white/15"> {/* header */}
                        <div className="flex gap-4">
                            <button className="flex md:hidden justify-center items-center hover:cursor-pointer">
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
                                <SidebarItem title="Overview" icon="overview" href="/overview" />
                                <SidebarItem title="Insurance Pricing Index" icon="trendup" href="/ipi" />
                                <SidebarItem title="Claims & Coverage Ratings" icon="shield" href="/iccr" />
                                <SidebarItem title="Protocol Rating" icon="chart" href="/protocol-rating" />
                                <SidebarItem title="Affiliates" icon="circle" href="/affiliates" />
                                <SidebarItem title="Subscription" icon="wallet" href="/subscription" />
                            </div>
                            <div className="flex justify-between ">
                                <div className="w-5 bg-white/4"></div>
                                <div className="h-[88px] w-full bg-white/4 flex items-center justify-between border-t-[1px] border-white/20">
                                    <Image alt="user" src={"/user.png"} height={40} width={40} />
                                    <div>
                                        <div className="w-full flex flex-col">
                                            <div className="font-medium text-sm">Josh Anderson</div>
                                            <div className="font-medium text-xs text-[#525866]">josh@gmail.com</div>
                                        </div>
                                    </div>
                                    <Link href="/profile" className="hover:bg-white/10 p-2 rounded-full">
                                        <svg width={18} height={17}><use href="#svg-setting" /></svg>
                                    </Link>
                                </div>
                                <div className="w-5 bg-white/4"></div>
                            </div>
                        </div>
                        <div className="w-full overflow-y-auto">
                            {children}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
