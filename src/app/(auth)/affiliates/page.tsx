'use client'

import Pagination from "@/components/Pagination";
import { useState } from "react";
import { useAffiliate } from "@/hooks/useAffiliate";
import { formatCurrency } from "@/utils/affiliate";

export default function Home() {
    const { affiliate, loading, error, copyReferralLink } = useAffiliate();
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 40; // We'll update this later

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="p-8 w-full">

            {/* title */}
            <div className="font-bold text-[32px] leading-[1.4]">Affiliate</div>

            {/* description */}
            <div className="text-sm text-white/80">Independent Claims & Coverage Ratings (ICCR)</div>

            {/* overview */}
            <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 w-full mt-6">
                <div className="flex flex-col gap-4 col-span-2">
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                        <div className="flex flex-col gap-2 w-full border-[1px] border-white/15 bg-white/3 rounded-xl p-6">
                            <div className="text-[13px] text-white/80 font-medium leading-4">Clicks</div>
                            <div className="flex justify-between">
                                <div className="text-[21px] font-medium leading-6">{loading ? '...' : (affiliate?.totalClicks || 0)}</div>
                                <div className="px-4 py-1 font-semibold text-[#65C565] text-xs text-center bg-[#65C565]/20 rounded-l-full rounded-r-full">+{Math.floor((affiliate?.totalClicks || 0) * 0.1)}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full border-[1px] border-white/15 bg-white/3 rounded-xl p-6">
                            <div className="text-[13px] text-white/80 font-medium leading-4">Average Payout Ratio</div>
                            <div className="flex justify-between">
                                <div className="text-[21px] font-medium leading-6">94.2%</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full border-[1px] border-white/15 bg-white/3 rounded-xl p-6">
                            <div className="text-[13px] text-white/80 font-medium leading-4">Total Protocols Rated</div>
                            <div className="flex justify-between">
                                <div className="text-[21px] font-medium leading-6">41</div>
                                <div className="px-4 py-1 font-semibold text-[#65C565] text-xs text-center bg-[#65C565]/20 rounded-l-full rounded-r-full">+3</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full border-[1px] border-white/15 bg-white/3 rounded-xl p-6">
                            <div className="text-[13px] text-white/80 font-medium leading-4">Average Payout Ratio</div>
                            <div className="flex justify-between">
                                <div className="text-[21px] font-medium leading-6">94.2%</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-6 w-full border-[1px] border-white/15 bg-white/3 rounded-xl p-6">
                            <div className="text-[21px] font-medium leading-6">Your unique referral link</div>
                            <div className="flex justify-between gap-2">
                                <input 
                                    type="text" 
                                    className="w-full bg-white/3 outline-none text-white/80 border-[1px] border-white/15 rounded-lg px-3 py-2" 
                                    value={affiliate?.referralLink || ''} 
                                    readOnly 
                                />
                                <button 
                                    onClick={copyReferralLink}
                                    className="text-[13px] leading-5 border-[1px] border-white/25 rounded-lg px-6 py-2 bg-[#7D00FE]"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 p-6 border-[1px] border-white/15 rounded-xl bg-white/3">
                        <div>
                            <div className="text-xs font-medium leading-5 text-white/80">Available Commissions Balance</div>
                            <div className="text-xl font-semibold">{formatCurrency(affiliate?.totalEarnings || 0)}</div>
                        </div>
                        <div className="w-full h-[1px] bg-white/20"></div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-white/80 leading-5 font-medium w-1/2">Commissions Pending Maturation</div>
                                <div className="text-sm text-white/80 leading-5 font-semibold">$0.00 USD</div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-xs text-white/80 leading-5 font-medium w-1/2">Total Amount Withdrawn</div>
                                <div className="text-sm text-white/80 leading-5 font-semibold">$0.00 USD</div>
                            </div>
                        </div>
                        <div className="w-full h-[1px] bg-white/20"></div>
                        <button className="py-[6px] rounded-lg leading-[26px] font-medium bg-linear-to-b from-70% from-[#7D00FE] to-white/15">Request Withdrawal</button>
                    </div>
                    <div className="px-6 py-5 rounded-xl bg-[#65C565]/15 text-[#65C565] text-xs font-medium leading-5">
                        You will be able to request a withdrawal as soon as your balance reaches the minimum required amount of $25.00 USD.
                    </div>
                </div>
            </div>

            {/* table */}
            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6 mt-8">
                <div className="font-medium text-[17px] mb-6">Your referrals</div>
                <table className="tableFixed w-full">
                    <thead className="border-b-[1px] border-white/15 ">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[25%] text-start pb-2 mb-2">Name</th>
                            <th className="font-medium w-[25%] text-start pb-2 mb-2">Plan</th>
                            <th className="font-medium w-[25%] text-start pb-2 mb-2">Pay Amount</th>
                            <th className="font-medium w-[25%] text-start pb-2 mb-2">Incentive</th>
                        </tr>
                    </thead>
                    <tbody className="border-b-[1px] border-white/15">
                        <tr>
                            <td className="font-medium text-sm py-[11px]">John Doe</td>
                            <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[70px] rounded-[6px] py-1 border-[1px] border-white/20">Pro</div></td>
                            <td className="font-medium text-sm py-[11px]">$ 100.00</td>
                            <td className="font-medium text-sm py-[11px]">$ 20.00</td>
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
