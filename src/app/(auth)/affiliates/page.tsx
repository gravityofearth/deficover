'use client'

import { useState } from "react";
import { useAffiliate } from "@/hooks/useAffiliate";
import { formatCurrency } from "@/utils/affiliate";
import { useEffect } from "react";
import { auth } from "@/services/firebase";

type Referral = {
  name: string;
  plan: string;
  payAmount: string;
  incentive: string;
};

export default function Home() {
    const { affiliate, loading } = useAffiliate();
    const [currentPage] = useState(1);
    const [copied, setCopied] = useState(false);
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [referralsLoading, setReferralsLoading] = useState(false);
    const [referralsError, setReferralsError] = useState<string | null>(null);

    const handleCopy = () => {
        if (affiliate?.referralLink) {
            navigator.clipboard.writeText(affiliate.referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
        }
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const fetchReferrals = async (page = 1, limit = 10) => {
        if (!affiliate) return;
        setReferralsLoading(true);
        setReferralsError(null);
        try {
            const token = await auth.currentUser?.getIdToken();
            const res = await fetch(`/api/affiliate/referrals?page=${page}&limit=${limit}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Failed to fetch referrals");
            const data = await res.json();
            setReferrals(
              data.referrals.map((ref: any) => ({
                name: ref.referredUserEmail || "N/A",
                plan: ref.planName || "N/A",
                payAmount: ref.subscriptionAmount ? `$${ref.subscriptionAmount.toFixed(2)}` : "N/A",
                incentive: ref.commissionAmount ? `$${ref.commissionAmount.toFixed(2)}` : "N/A",
              }))
            );
        } catch (err) {
            setReferralsError(err instanceof Error ? err.message : String(err));
        } finally {
            setReferralsLoading(false);
        }
    };

    useEffect(() => {
        if (affiliate) {
            fetchReferrals(currentPage, 10);
        }
    }, [affiliate, currentPage]);

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
                                    onClick={handleCopy}
                                    className="text-[13px] leading-5 border-[1px] border-white/25 rounded-lg px-6 py-2 bg-[#7D00FE]"
                                >
                                    {copied ? "Copied!" : "Copy"}
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
                        {referralsLoading ? (
                            <tr><td colSpan={4}>Loading...</td></tr>
                        ) : referralsError ? (
                            <tr><td colSpan={4}>{referralsError}</td></tr>
                        ) : referrals.length === 0 ? (
                            <tr><td colSpan={4}>No referrals found.</td></tr>
                        ) : (
                            referrals.map((referral, idx) => (
                                <tr key={idx}>
                                    <td>{referral.name}</td>
                                    <td>{referral.plan}</td>
                                    <td>{referral.payAmount}</td>
                                    <td>{referral.incentive}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
