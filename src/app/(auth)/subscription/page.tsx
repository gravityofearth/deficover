'use client'

export default function Home() {
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 7;

    // const totalPages = Math.ceil(mockProtocolData.length / itemsPerPage);
    // const totalPages = 40;
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentData = mockProtocolData.slice(startIndex, endIndex);

    // const handlePageChange = (page: number) => {
    //     setCurrentPage(page);
    // };
    return (
        <div className="p-8 w-full"> {/* main contents */}
            <div className="flex flex-col items-center">
                <div className="mt-10 text-4xl font-bold leading-[42px]">Choose Your Plan</div>
                <div className="mt-3 mb-10 text-sm text-white/80 leading-[18px]">Secure your savings with the right plan for your needs</div>
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="font-medium leading-[22px]">Monthly</div>
                    <div className="">
                        toggle
                    </div>
                    <div className="font-medium leading-[22px]">Yearly</div>
                    <div className="text-[#E8F2FF] text-[11px] leading-4 px-2.5 py-2 bg-[#0F0F0F] border-[#1F1F1F] border-[1px] rounded-full">Discount 10%</div>
                </div>
                <div className="w-full grid grid-cols-3 max-xl:grid-cols-1 max-xl:max-w-[420px] gap-4">
                    <div className="w-full flex flex-col p-6 border-white/15 border-[1px] rounded-[20px] bg-white/3 bg-linear-to-b from-transparent from-20% via-[#7D00FE]/7 via-60% to-[#7D00FE]/14 to-100%">
                        <div className="text-[20px] font-medium mb-5">FREE</div>
                        <div className="flex items-baseline">
                            <div className="text-[54px] font-medium">$0.0</div>
                            <div className="text-xl font-medium text-[#808080] ">/MONTH</div>
                        </div>
                        <div className="my-6 w-full border-[#2B2B2B] border-[0.5px]"></div>
                        <div className="h-[192px] mb-6">
                            <div className="text-sm leading-8">Essential IPI & ICCR dashboard access</div>
                            <div className="text-sm leading-8">Basic protocol ratings view</div>
                            <div className="text-sm leading-8">General market insights</div>
                            <div className="text-sm leading-8">Community access</div>
                            <div className="text-sm leading-8">Email support</div>
                        </div>
                        <button className="bg-linear-to-b from-transparent to-white/8 text-sm leading-[26px] w-full h-10 border-white/10 rounded-[6px] border-[1px]">Current Plan</button>
                    </div>
                    <div className="relative w-full flex flex-col p-6 border-white/15 border-[1px] rounded-[20px] bg-white/3 bg-linear-to-b from-transparent from-20% via-[#7D00FE]/40 via-60% to-[#7D00FE]/70 to-100%">
                        <div className="absolute right-2 top-2 px-2.5 py-2 flex items-center gap-[6px] bg-[#7D00FE]/10 border-[#7D00FE] border-[1px] rounded-full">
                            <svg width={16} height={16}><use href="#svg-best" /></svg>
                            <div className="text-sm leading-[18px] text-[#7D00FE]">
                                Most Popular
                            </div>
                        </div>
                        <div className="text-[20px] font-medium mb-5">PRO</div>
                        <div className="flex items-baseline">
                            <div className="text-[54px] font-medium">$29.99</div>
                            <div className="text-xl font-medium text-[#808080] ">/MONTH</div>
                        </div>
                        <div className="my-6 w-full border-[#2B2B2B] border-[0.5px]"></div>
                        <div className="h-[192px] mb-6">
                            <div className="text-sm leading-8">Full dashboard & analytics access</div>
                            <div className="text-sm leading-8">Complete historical data</div>
                            <div className="text-sm leading-8">Premium reports & newsletters</div>
                            <div className="text-sm leading-8">Advanced risk analytics</div>
                            <div className="text-sm leading-8">Priority email support</div>
                        </div>
                        <button className="bg-[#7D00FE] text-sm leading-[26px] w-full h-10 border-white/10 rounded-[6px] border-[1px]">Upgrade Plan</button>
                    </div>
                    <div className="w-full flex flex-col p-6 border-white/15 border-[1px] rounded-[20px] bg-white/3 bg-linear-to-b from-transparent from-20% via-[#7D00FE]/7 via-60% to-[#7D00FE]/14 to-100%">
                        <div className="text-[20px] font-medium mb-5">BUSINESS</div>
                        <div className="flex items-baseline">
                            <div className="text-[54px] font-medium">$89</div>
                            <div className="text-xl font-medium text-[#808080] ">/MONTH</div>
                        </div>
                        <div className="my-6 w-full border-[#2B2B2B] border-[0.5px]"></div>
                        <div className="h-[192px] mb-6">
                            <div className="text-sm leading-8">Full institutional dashboard</div>
                            <div className="text-sm leading-8">API access & integrations</div>
                            <div className="text-sm leading-8">White-glove onboarding</div>
                            <div className="text-sm leading-8">Dedicated account manager</div>
                            <div className="text-sm leading-8">Custom reporting</div>
                            <div className="text-sm leading-8">SLA guarantees</div>
                        </div>
                        <button className="bg-[#7D00FE] text-sm leading-[26px] w-full h-10 border-white/10 rounded-[6px] border-[1px]">Upgrade Plan</button>
                    </div>
                </div>
                <div className="w-full border-white/15 border-[1px] rounded-[20px] mt-[30px] p-4 bg-white/3 ">
                    <div className="leading-5 mb-[27px]">Current Subscription</div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs">Pro Plan</div>
                            <div className="text-xs text-white/60">Next billing: June 15, 2025</div>
                        </div>
                        <div className="flex items-baseline">
                            <div className="text-xl leading-4">$29.99</div>
                            <div className="text-xs ml-1 text-white/60">/month</div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-white/15 my-2.5"></div>
                    <div className="flex justify-end gap-[13px]">
                        <button className="w-[120px] h-10 bg-linear-to-b from-transparent to-white/8 border-[1px] border-white/10 text-sm rounded-[6px]">Cancel</button>
                        <button className="w-[136px] h-10 bg-[#7D00FE] border-[1px] border-white/20 text-sm rounded-[6px]">Upgrade Plan</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
