"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const SidebarItem = ({ title, icon, href }: { title: string, icon: string, href: string }) => {
    const pathname = usePathname()
    const isActive = useMemo(() => pathname === href, [pathname])

    return (
        <Link href={href} className={`px-3 py-2 rounded-lg font-medium text-sm text-white/80 flex items-center tracking-[-0.03em] hover:underline ${isActive ? "bg-white/10" : ""}`} ><svg width={15} height={15} className="m-[2.5px]"><use href={`#svg-${icon}`} /></svg><span className="ml-[7.5px]">{title}</span></Link>
    )
}
const Sidebar = () => {
    return (<>
        <SidebarItem title="Overview" icon="overview" href="/overview" />
        <SidebarItem title="Insurance Pricing Index" icon="trendup" href="/ipi" />
        <SidebarItem title="Claims & Coverage Ratings" icon="shield" href="/iccr" />
        <SidebarItem title="Protocol Rating" icon="chart" href="/protocol-rating" />
        <SidebarItem title="Affiliates" icon="circle" href="/affiliates" />
        <SidebarItem title="Subscription" icon="wallet" href="/subscription" />
    </>)
}
export default Sidebar