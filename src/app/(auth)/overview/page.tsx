"use client";

import { useState, useMemo } from "react";
import { formatValueInLatin, riskStyle } from "@/utils";
import { InsuranceData, InsuranceType } from "@/utils/data";
import { InfoTooltip } from "@/components/InfoTooltip";

type SortField = "rating" | "risk_level" | "tvl" | "claims" | null;
type SortDirection = "asc" | "desc";

export default function Home() {
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [showOnlyVerified, setShowOnlyVerified] = useState(false);
    const [showHighRiskOnly, setShowHighRiskOnly] = useState(false);
    const [showInstitutionalOnly, setShowInstitutionalOnly] = useState(false);

    // Define institutional protocols (high TVL, verified, AA+ or AA rating)
    const institutionalProtocols = ["Nexus Mutual", "Risk Harbor", "Sherlock", "InsurAce", "Neptune Mutual", "OpenCover"];

    const filteredAndSortedData = useMemo(() => {
        let filtered = [...InsuranceData];

        // Apply filters
        if (showOnlyVerified) {
            filtered = filtered.filter(item => item.verified);
        }

        if (showHighRiskOnly) {
            filtered = filtered.filter(item => item.risk_level === "High");
        }

        if (showInstitutionalOnly) {
            filtered = filtered.filter(item => institutionalProtocols.includes(item.protocol));
        }

        // Apply sorting
        if (sortField) {
            filtered.sort((a, b) => {
                let aValue: any;
                let bValue: any;

                switch (sortField) {
                    case "rating":
                        const ratingOrder = { "AA+": 4, "AA": 3, "A+": 2, "A": 1 };
                        aValue = ratingOrder[a.rating as keyof typeof ratingOrder];
                        bValue = ratingOrder[b.rating as keyof typeof ratingOrder];
                        break;
                    case "risk_level":
                        const riskOrder = { "Low": 1, "Medium": 2, "High": 3 };
                        aValue = riskOrder[a.risk_level];
                        bValue = riskOrder[b.risk_level];
                        break;
                    case "tvl":
                        aValue = a.tvl;
                        bValue = b.tvl;
                        break;
                    case "claims":
                        aValue = a.claims;
                        bValue = b.claims;
                        break;
                    default:
                        return 0;
                }

                if (sortDirection === "asc") {
                    return aValue - bValue;
                } else {
                    return bValue - aValue;
                }
            });
        }

        return filtered;
    }, [sortField, sortDirection, showOnlyVerified, showHighRiskOnly, showInstitutionalOnly]);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("desc");
        }
    };

    const getSortIcon = (field: SortField) => {
        if (sortField !== field) return "";
        return sortDirection === "asc" ? "↑" : "↓";
    };

    return (
        <div className="p-8 w-full"> {/* main contents */}
            <div className="font-bold text-[32px] leading-[1.4]">Dashboard Overview</div>
            <div className="text-sm text-white/80">Manage your Monitor DeFi insurance protocols and market trends</div>
            <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 my-[22px] gap-4">
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">
                        Market IPI Average
                        <InfoTooltip
                            content="Insurance Premium Index averaged across all protocols. Data sourced from DeFiCover Analytics API (updated every 4 hours)"
                            link={{
                                text: "Learn about IPI methodology",
                                url: "/methodology/ipi"
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">6.5%</div>
                        <div className="px-2.5 py-1 font-semibold text-[#65C565] text-xs bg-[#65C565]/20 rounded-l-full rounded-r-full">+3.4%</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">
                        Total Value Locked
                        <InfoTooltip
                            content="Aggregated TVL from DefiLlama API and protocol-specific endpoints (last updated: 24h ago)"
                            link={{
                                text: "View data sources",
                                url: "/data-sources"
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">$125.4M</div>
                        <div className="px-2.5 py-1 font-semibold text-[#C56565] bg-[#C56565]/20 text-xs rounded-l-full rounded-r-full">-2.5%</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">
                        Active Claims
                        <InfoTooltip
                            content="Claims currently under review or processing. Data from OpenCover and Nexus Mutual APIs (real-time)"
                            link={{
                                text: "View claims process",
                                url: "/claims/process"
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">24</div>
                    </div>
                </div>
                <div className="w-full h-24 bg-white/3 rounded-[7px] border-[1px] border-white/15 px-6 pt-6 pb-4 flex flex-col justify-between">
                    <div className="text-white/80 leading-4 text-[13px]">
                        Active Protocols
                        <InfoTooltip
                            content="Protocols with active insurance coverage. Sourced from DeFiCover registry and partner APIs (updated hourly)"
                            link={{
                                text: "Browse all protocols",
                                url: "/protocols"
                            }}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-[21px] font-medium leading-6">147</div>
                    </div>
                </div>
            </div>

            

            <div className="bg-white/5 border-[1px] border-white/15 rounded-[7px] p-6 w-full overflow-auto">
                {/* Filters Section */}
                <div className="mb-6">
                    <div className="flex flex-wrap gap-3 justify-end">
                        {/* Filter Toggles */}
                        <button
                            onClick={() => setShowOnlyVerified(!showOnlyVerified)}
                            className={`px-3 py-2 text-xs font-medium rounded-[4px] transition-all duration-200 ${
                                showOnlyVerified 
                                    ? "bg-[#65C565]/20 text-[#65C565] border border-[#65C565]/30" 
                                    : "bg-white/10 text-white/60 border border-white/20 hover:bg-white/15"
                            }`}
                        >
                            Verified
                        </button>
                        <button
                            onClick={() => setShowHighRiskOnly(!showHighRiskOnly)}
                            className={`px-3 py-2 text-xs font-medium rounded-[4px] transition-all duration-200 ${
                                showHighRiskOnly 
                                    ? "bg-[#C56565]/20 text-[#C56565] border border-[#C56565]/30" 
                                    : "bg-white/10 text-white/60 border border-white/20 hover:bg-white/15"
                            }`}
                        >
                            High Risk
                        </button>
                        <button
                            onClick={() => setShowInstitutionalOnly(!showInstitutionalOnly)}
                            className={`px-3 py-2 text-xs font-medium rounded-[4px] transition-all duration-200 ${
                                showInstitutionalOnly 
                                    ? "bg-[#6C97DE]/20 text-[#6C97DE] border border-[#6C97DE]/30" 
                                    : "bg-white/10 text-white/60 border border-white/20 hover:bg-white/15"
                            }`}
                        >
                            Institutional Protocols
                        </button>
                    </div>
                </div>
                <div className="font-medium text-[17px] mb-6 sticky left-0">Top Rated DeFi Insurance</div>
                <table className="w-full h-full overflow-x-scroll">
                    <thead className="border-b-[1px] border-white/15 sticky -top-[24px] bg-[#13122C]">
                        <tr className="text-[13px] text-[#A6A9AA]">
                            <th className="font-medium w-[15%] text-start pb-2 mb-2 sticky left-0 bg-[#13122C]">Protocol</th>
                            <th 
                                className="font-medium w-[10%] text-start pb-2 mb-2 cursor-pointer hover:text-white/80 transition-colors"
                                onClick={() => handleSort("rating")}
                            >
                                Rating {getSortIcon("rating")}
                                <InfoTooltip
                                    content="ICCR composite score (AA+ to A) based on security, transparency, and performance metrics"
                                    link={{
                                        text: "Rating methodology",
                                        url: "/methodology/ratings"
                                    }}
                                />
                            </th>
                            <th 
                                className="font-medium w-[15%] text-start pb-2 mb-2 cursor-pointer hover:text-white/80 transition-colors"
                                onClick={() => handleSort("tvl")}
                            >
                                TVL {getSortIcon("tvl")}
                                <InfoTooltip
                                    content="Total Value Locked from DefiLlama API, updated every 24 hours"
                                />
                            </th>
                            <th className="font-medium w-[15%] text-start pb-2 mb-2">
                                Coverage
                                <InfoTooltip
                                    content="Maximum insurance coverage available from all providers (OpenCover, Nexus Mutual, etc.)"
                                />
                            </th>
                            <th 
                                className="font-medium w-[15%] text-start pb-2 mb-2 cursor-pointer hover:text-white/80 transition-colors"
                                onClick={() => handleSort("risk_level")}
                            >
                                Risk Level {getSortIcon("risk_level")}
                                <InfoTooltip
                                    content="Risk assessment based on smart contract audits, historical incidents, and protocol maturity"
                                    link={{
                                        text: "Risk assessment criteria",
                                        url: "/methodology/risk-assessment"
                                    }}
                                />
                            </th>
                            <th 
                                className="font-medium w-[10%] text-start pb-2 mb-2 cursor-pointer hover:text-white/80 transition-colors"
                                onClick={() => handleSort("claims")}
                            >
                                Claims {getSortIcon("claims")}
                                <InfoTooltip
                                    content="Total claims paid out by the protocol"
                                />
                            </th>
                            <th className="font-medium w-[20%] text-start pb-2 mb-2">Action</th>
                        </tr>
                    </thead>
                    <tbody className="-left-[24px]">
                        {filteredAndSortedData.map((insurance, i) =>
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
                                <td className="font-medium text-sm pt-[22px]">${formatValueInLatin(insurance.claims)}</td>
                                <td className="pt-[22px]">
                                    <a
                                        href={`https://app.nexusmutual.io/cover/buy/get-quote?address=${insurance.protocol.toLowerCase().replace(/\s+/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/80 rounded-[4px] hover:text-white transition-all duration-200"
                                    >
                                        🔗 View on Nexus Mutual
                                    </a>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {/* Data Sources Footer */}
            <div className="mt-6 p-4 bg-white/3 border-[1px] border-white/10 rounded-[7px]">
                <div className="text-xs text-white/60 mb-2 font-medium">Data Sources & Methodology:</div>
                <div className="text-xs text-white/50 space-y-1">
                    <div>• Market data aggregated from DefiLlama, OpenCover, Nexus Mutual, and protocol-specific APIs</div>
                    <div>• Ratings calculated using DeFiCover ICCR (Insurance Coverage Confidence Rating) methodology</div>
                    <div>• Risk assessments based on Consensys Diligence, Trail of Bits, and community audit reports</div>
                    <div>• Data refresh intervals: Real-time (claims), Hourly (protocols), Daily (TVL, ratings)</div>
                </div>
                {/* <div className="mt-2 text-xs">
                    <a href="/data-sources" className="text-blue-400 hover:text-blue-300 underline mr-4">
                        View detailed data sources
                    </a>
                    <a href="/methodology" className="text-blue-400 hover:text-blue-300 underline">
                        Learn about our methodology
                    </a>
                </div> */}
            </div>
        </div>
    );
}
