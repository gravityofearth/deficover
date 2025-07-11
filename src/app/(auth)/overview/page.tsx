import { formatValueInLatin, riskStyle } from "@/utils";
import { InsuranceData } from "@/utils/data";

export default function Home() {
    return (
        <div className="p-8 w-full h-[calc(100vh-67px)] "> {/* main contents */}
            <div className="font-bold text-[32px] leading-[1.4]">Dashboard Overview</div>
            <div className="text-sm text-white/80">Manage your Monitor DeFi insurance protocols and market trends</div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 my-[22px] gap-4">
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">Market IPI Average</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">6.5%</div>
                        <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3.4%</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">Total Value Locked</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">$125.4M</div>
                        <div className="px-2.5 py-1 font-semibold text-[#C56565] bg-[#C56565]/20 text-xs rounded-l-full rounded-r-full">-2.5%</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">Active Claims</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">24</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">Active Protocols</div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">147</div>
                    </div>
                </div>
            </div>
            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6 w-full overflow-auto">
                <div className="font-medium text-[17px] mb-6 sticky left-0">Top Rated DeFi Insurance</div>
                <table className="w-full h-full overflow-x-scroll">
                    <thead className="border-b-[1px] border-white/15 sticky -top-[24px] bg-[#13122C]">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[20%] text-start pb-2 mb-2 sticky left-0 bg-[#13122C]">Protocol</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Rating</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">TVL</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Coverage</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Risk Level</th>
                        </tr>
                    </thead>
                    <tbody className="-left-[24px]">
                        {InsuranceData.map((insurance, i) =>
                            <tr key={i}>
                                <td className="font-medium text-sm pt-[22px] bg-[#13122C] sticky left-0">
                                    <div className="flex gap-3 justify-between">
                                        {insurance.protocol}
                                        {insurance.verified && (
                                            <span className="pr-2 relative group">
                                                <svg width={20} height={20}>
                                                    <use href="#svg-verified-badge" />
                                                </svg>
                                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black/80 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                                                    Verified by DeFiCover: Meets ICCR transparency and audit standards.
                                                </div>
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6C97DE] text-center w-[52px] bg-[#6C97DE]/20 rounded-[3px] py-2">{insurance.rating}</div></td>
                                <td className="font-medium text-sm pt-[22px]">${formatValueInLatin(insurance.tvl)}</td>
                                <td className="font-medium text-sm pt-[22px]">${formatValueInLatin(insurance.coverage)}</td>
                                <td className="pt-[22px]">
                                    <div className={`font-medium text-[13px] text-center w-[88px] rounded-[3px] py-2 ${riskStyle[insurance.risk_level]}`}>
                                        {insurance.risk_level}
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
