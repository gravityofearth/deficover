"use client"

import React, { useState } from 'react';

interface InfoTooltipProps {
    content: string;
    link?: {
        text: string;
        url: string;
    };
    className?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ content, link, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={`relative inline-block ${className}`}>
            <button
                className="ml-1 text-white/60 hover:text-white/80 transition-colors duration-200"
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={(e) => e.preventDefault()}
            >
                <svg width={14} height={14}><use href='#svg-i' /></svg>
            </button>

            {isVisible && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-black/90 rounded-md opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 max-w-fit">
                    <div className="text-center">
                        {content}
                        {link && (
                            <div className="mt-1">
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline pointer-events-auto"
                                >
                                    {link.text}
                                </a>
                            </div>
                        )}
                    </div>
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90"></div>
                </div>
            )}
        </div>
    );
};
