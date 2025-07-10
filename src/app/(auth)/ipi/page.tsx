import { formatValueInLatin, riskStyle } from "@/utils";
import { InsuranceData } from "@/utils/data";
export default function Home() {
    return (
        <div className="p-8 w-full h-[calc(100vh-67px)]"> {/* main contents */}
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
            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6 w-full overflow-auto">
                <div className="font-medium text-[17px] mb-6 sticky left-0">Protocol IPI Rankings</div>
                <table className="w-full h-full overflow-x-scroll">
                    <thead className="border-b-[1px] border-white/15 sticky -top-[24px] bg-[#13122C]">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[20%] text-start pb-2 mb-2 sticky left-0 bg-[#13122C]">Protocol</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Category</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Current IPI</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">24h Change</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">Risk Level</th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">TVL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {InsuranceData.map((insurance, i) =>
                            <tr key={i}>
                                <td className="font-medium text-sm pt-[22px] bg-[#13122C] sticky left-0">
                                    <div className="flex gap-3 justify-between">
                                        {insurance.protocol}
                                        {insurance.verified && <span className="pr-2"><svg width={20} height={20}><use href="#svg-verified-badge" /></svg></span>}
                                    </div>
                                </td>
                                <td className="py-[11px]"><div className="font-medium text-xs text-white/80 text-center w-[120px] rounded-[6px] py-1 border-[1px] border-black/50">{insurance.product_type}</div></td>
                                <td className="font-medium text-sm py-[11px] text-white/80">{insurance.ipi}%</td>
                                <td className="font-medium text-sm py-[11px] text-[#6FB75D]">+0.2</td>
                                <td className="py-[11px]"><div className={`font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2 ${riskStyle[insurance.risk_level]}`}>{insurance.risk_level}</div></td>
                                <td className="font-medium text-sm py-[11px]">${formatValueInLatin(insurance.tvl)}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
                {/* <div className="flex justify-center items-center mt-6">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div> */}
            </div>
        </div>
    );
}
