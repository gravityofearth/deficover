'use client'

import Pagination from "@/components/Pagination";
import { useState } from "react";
export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 7;

    // const totalPages = Math.ceil(mockProtocolData.length / itemsPerPage);
    const totalPages = 40;
    // const currentData = mockProtocolData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="p-8 w-full"> {/* main contents */}
            <div className="font-bold text-[32px] leading-[1.4]">Claims & Coverage Ratings</div>
            <div className="text-sm text-white/80">Comprehensive analysis of protocol reliability and claim settlement performance</div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1  my-[22px] gap-4">
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">Total Protocols Rated</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">41</div>
                        <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3</div>
                    </div>
                </div>
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">Average Payout Ratio</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">94.2%</div>
                    </div>
                </div>
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">Avg Settlement Time</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">6.8<span className="text-[15px] text-white/80 font-normal"> days</span></div>
                    </div>
                </div>
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">Active Claims</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">24</div>
                    </div>
                </div>
            </div>
            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6">
                <div className="font-medium text-[17px] mb-6">Protocol Ratings Breakdown</div>
                <table className="tableFixed w-full">
                    <thead className="border-b-[1px] border-white/15 ">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Protocol</th>
                            <th className="font-medium w-[10%] text-start pb-2 mb-2">Overall</th>
                            <th className="font-medium w-[10%] text-start pb-2 mb-2">Claims</th>
                            <th className="font-medium w-[10%] text-start pb-2 mb-2">Coverage</th>
                            <th className="font-medium w-[10%] text-start pb-2 mb-2">Liquidity</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Payout Ratio</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Avg Settlement</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="border-b-[1px] border-white/15">
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Nexus Mutual</td>
                            <td className="py-[11px]"><div className="px-2.5 py-1 w-[50%] text-center font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3</div></td>
                            <td className="py-[11px]"><div className="px-2.5 py-1 w-[50%] text-center font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3</div></td>
                            <td className="py-[11px]"><div className="px-2.5 py-1 w-[50%] text-center font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3</div></td>
                            <td className="py-[11px]"><div className="px-2.5 py-1 w-[50%] text-center font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3</div></td>
                            <td className="font-medium text-sm py-[11px] text-white">96.6%<span className="text-[10px]"> (142/147)</span></td>
                            <td className="font-medium text-sm py-[11px] text-white">5.2 days</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Active</div></td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-center items-center mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
        </div>
    );
}
