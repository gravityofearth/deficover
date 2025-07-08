'use client'

import Pagination from "@/components/Pagination";
import { useState } from "react";
export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);

    // const totalPages = Math.ceil(mockProtocolData.length / itemsPerPage);
    const totalPages = 40;
    // const currentData = mockProtocolData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="p-8 w-full"> {/* main contents */}
            <div className="font-bold text-[32px] leading-[1.4]">Insurance Pricing Index (IPI)</div>
            <div className="text-sm text-white/80">Real-time pricing intelligence across DeFi insurance protocols</div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 my-[22px] gap-4">
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">Overall IPI</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">3.0%</div>
                        <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3.4%</div>
                    </div>
                </div>
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">DeFi Protocols</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">3.5%</div>
                        <div className="px-2.5 py-1 font-semibold text-[#C56565] text-xs bg-[#C56565]/20 rounded-l-full rounded-r-full">-2.5%</div>
                    </div>
                </div>
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">Yield Farming</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">4.1%</div>
                        <div className="px-2.5 py-1 font-semibold text-[#C56565] text-xs bg-[#C56565]/20 rounded-l-full rounded-r-full">-2.5%</div>
                    </div>
                </div>
                <div className="w-full bg-white/3 rounded-[7px] border-[1px] border-white/15 p-6 flex flex-col justify-between gap-4">
                    <div className="text-white/80 leading-4 font-medium">CeFi Products</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[28px] font-bold leading-6">2.3%</div>
                        <div className="px-2.5 py-1 font-semibold text-[#C56565] text-xs bg-[#C56565]/20 rounded-l-full rounded-r-full">-2.5%</div>
                    </div>
                </div>
            </div>
            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6">
                <div className="font-medium text-[17px] mb-6">Protocol IPI Rankings</div>
                <table className="tableFixed w-full">
                    <thead className="border-b-[1px] border-white/15 ">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Protocol</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Category</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Current IPI</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">24h Change</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Risk Level</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Volume</th>
                        </tr>
                    </thead>
                    <tbody className="border-b-[1px] border-white/15">
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Nexus Mutual</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">Mutual</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">2.8%</td>
                            <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.2</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                            <td className="font-medium text-sm py-[11px]">$45.2M</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Unslashed</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">Parametric</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">3.1%</td>
                            <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.1</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                            <td className="font-medium text-sm py-[11px]">$36.2M</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm py-[11px]">InsurAce</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">Hybrid</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">3.4%</td>
                            <td className="font-medium text-sm py-[11px] text-[#C56565]">-0.1</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#D1A941] text-center w-[88px] bg-[#D1A941]/20 rounded-[3px] py-2">Medium</div></td>
                            <td className="font-medium text-sm py-[11px]">$42.2M</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Cover Protocol</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">P2P</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">3.8%</td>
                            <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.1</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#D1A941] text-center w-[88px] bg-[#D1A941]/20 rounded-[3px] py-2">Medium</div></td>
                            <td className="font-medium text-sm py-[11px]">$37.2M</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Nexus Mutual</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">Low</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">80%</td>
                            <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.2</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                            <td className="font-medium text-sm py-[11px]">$45.2M</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Nexus Mutual</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">Low</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">80%</td>
                            <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.2</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                            <td className="font-medium text-sm py-[11px]">$45.2M</td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm py-[11px]">Nexus Mutual</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[88px] rounded-[6px] py-1 border-[1px] border-black/50">Low</div></td>
                            <td className="font-medium text-sm py-[11px] text-white/80">80%</td>
                            <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.2</td>
                            <td className="py-[11px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                            <td className="font-medium text-sm py-[11px]">$45.2M</td>
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
