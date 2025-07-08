
export default function Home() {
    return (
        <div className="p-8 w-full"> {/* main contents */}
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
                        <div className="px-2.5 py-1 font-semibold text-[#C56565] text-xs bg-[#C56565]/20 rounded-l-full rounded-r-full">-2.5%</div>
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
            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6">
                <div className="font-medium text-[17px] mb-6">Top Rated DeFi Insurance</div>
                <table className="tableFixed w-full">
                    <thead className="border-b-[1px] border-white/15">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Protocol</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Rating</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">TVL</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Coverage</th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Risk Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font-medium text-sm pt-[22px]">Nexus Mutual</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6C97DE] text-center w-[52px] bg-[#6C97DE]/20 rounded-[3px] py-2">AA+</div></td>
                            <td className="font-medium text-sm pt-[22px]">$450M</td>
                            <td className="font-medium text-sm pt-[22px]">92%</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm pt-[22px]">InsurAce Protocol</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6C97DE] text-center w-[52px] bg-[#6C97DE]/20 rounded-[3px] py-2">AA</div></td>
                            <td className="font-medium text-sm pt-[22px]">$190M</td>
                            <td className="font-medium text-sm pt-[22px]">87%</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6FB75D] text-center w-[88px] bg-[#6FB75D]/20 rounded-[3px] py-2">Low</div></td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm pt-[22px]">Unslashed Finance</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6C97DE] text-center w-[52px] bg-[#6C97DE]/20 rounded-[3px] py-2">A+</div></td>
                            <td className="font-medium text-sm pt-[22px]">$280M</td>
                            <td className="font-medium text-sm pt-[22px]">84%</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#D1A941] text-center w-[88px] bg-[#D1A941]/20 rounded-[3px] py-2">Medium</div></td>
                        </tr>
                        <tr>
                            <td className="font-medium text-sm pt-[22px]">Risk Harbor</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#6C97DE] text-center w-[52px] bg-[#6C97DE]/20 rounded-[3px] py-2">A</div></td>
                            <td className="font-medium text-sm pt-[22px]">$165M</td>
                            <td className="font-medium text-sm pt-[22px]">81%</td>
                            <td className="pt-[22px]"><div className="font-medium text-[13px] text-[#D1A941] text-center w-[88px] bg-[#D1A941]/20 rounded-[3px] py-2">Medium</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
