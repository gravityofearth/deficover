'use client'

import Pagination from "@/components/Pagination";
import { useState } from "react";
const CardItem = () => {
    return (
        <div className="flex flex-col gap-3 p-6 border-[1px] border-white/15 rounded-[7px] w-full">
            <div className="w-full flex gap-[10px] items-center">
                <svg width={64} height={64}><use href="#svg-samplelogo" /></svg>
                <div className="flex flex-col gap-2 w-full">
                    <div className="text-2xl font-medium leading-6">Nexus Mutual</div>
                    <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs text-center bg-[#65C565]/20 rounded-l-full rounded-r-full w-1/3">Active</div>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <div className="text-[13px] font-medium leading-4">IPI Score</div>
                    <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs text-center bg-[#65C565]/20 rounded-l-full rounded-r-full">+3.4</div>
                </div>
                <div className="text-[21px] font-medium leading-6">8.7</div>
                <div className="w-full h-[6px] bg-[#7D00FE]/30 rounded-full my-2">
                    <div className="h-full bg-[#7D00FE] w-[70%] rounded-full"></div>
                </div>
                <div className="flex justify-between items-center mt-1 py-[6px]">
                    <div className="text-[13px] leading-4">ICCR Rating</div>
                    <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs text-center bg-[#65C565]/20 rounded-l-full rounded-r-full">+3.4</div>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="text-sm leading-5">Total Value Locked</div>
                    <div className="text-sm leading-5">$450M</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-sm leading-5">Coverage Ratio</div>
                    <div className="text-sm leading-5">92%</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-sm leading-5">Premium Rate</div>
                    <div className="text-sm leading-5">2.3%</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-sm leading-5">Claims Ratio</div>
                    <div className="text-sm leading-5">0.8%</div>
                </div>
            </div>
            <div className="w-full h-[1px] bg-[#CACACA]"></div>
            <div className="flex justify-between ">
                <div className="flex items-center">
                    <div className="size-[7px] rounded-full bg-[#65C565] mr-[6px]"></div>
                    <div className="text-[10px] font-medium leading-5">Updated 2 hours ago</div>
                </div>
                <div className="text-[10px] font-medium leading-5">nexusmutual.io</div>
            </div>
        </div>
    )
}
export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 7;

    // const totalPages = Math.ceil(mockProtocolData.length / itemsPerPage);
    const totalPages = 40;
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentData = mockProtocolData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="p-8 w-full"> {/* main contents */}
            <div className="flex max-lg:flex-col justify-between lg:items-end gap-4 mb-[22px]">
                <div>
                    <div className="font-bold text-[32px] leading-[1.4]">Protocol Ratings</div>
                    <div className="text-sm text-white/80">Independent Claims & Coverage Ratings (ICCR)</div>
                </div>
                <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
                    <div className="relative">
                        <input className="w-[180px] h-10 border-[1px] border-white/20 rounded-lg text-sm p-2 pr-10" placeholder="Search ..." />
                        <svg width={16} height={16} className="absolute right-3 top-3"><use href="#svg-search" /></svg>
                    </div>
                    <select
                        name="risk level"
                        id="1"
                        className="w-[150px] h-10 border-[1px] border-white/20 rounded-lg text-xs p-2 bg-[#050520] text-white focus:outline-none focus:border-white/40"
                    >
                        <option value="all" className="bg-[#050520] text-white">All Risk Level</option>
                        <option value="low" className="bg-[#050520] text-white">Low</option>
                        <option value="medium" className="bg-[#050520] text-white">Medium</option>
                        <option value="high" className="bg-[#050520] text-white">High</option>
                    </select>
                    <select
                        name="risk level"
                        id="1"
                        className="w-[150px] h-10 border-[1px] border-white/20 rounded-lg text-xs p-2 bg-[#050520] text-white focus:outline-none focus:border-white/40"
                    >
                        <option value="all" className="bg-[#050520] text-white">All Risk Level</option>
                        <option value="low" className="bg-[#050520] text-white">Low</option>
                        <option value="medium" className="bg-[#050520] text-white">Medium</option>
                        <option value="high" className="bg-[#050520] text-white">High</option>
                    </select>
                </div>
            </div>
            {/* all titles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-[22px]">
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
            <div className="flex justify-center items-center mt-6">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
