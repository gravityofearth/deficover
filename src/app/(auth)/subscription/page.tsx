'use client'

import { useState } from 'react';
import { useStripe } from '@/hooks/useStripe';

export default function Home() {
    const [isYearly, setIsYearly] = useState(false);
    const { loading, error, createCheckoutSession } = useStripe();
    
    // Get referral code from URL if present
    const [referralCode, setReferralCode] = useState<string>('');
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        if (ref) {
            setReferralCode(ref);
        }
    }, []);

    // Plan pricing
    const plans = [
        {
            name: 'FREE',
            price: 0,
            priceYearly: 0,
            features: [
                'Essential IPI & ICCR dashboard access',
                'Basic protocol ratings view',
                'General market insights',
                'Community access',
                'Email support',
            ],
            button: 'Current Plan',
            highlight: false,
        },
        {
            name: 'PRO',
            price: 29.99,
            priceYearly: +(29.99 * 12 * 0.9).toFixed(2), // 10% off
            features: [
                'Full dashboard & analytics access',
                'Complete historical data',
                'Premium reports & newsletters',
                'Advanced risk analytics',
                'Priority email support',
            ],
            button: 'Upgrade Plan',
            highlight: true,
        },
        {
            name: 'BUSINESS',
            price: 89,
            priceYearly: +(89 * 12 * 0.9).toFixed(2), // 10% off
            features: [
                'Full institutional dashboard',
                'API access & integrations',
                'White-glove onboarding',
                'Dedicated account manager',
                'Custom reporting',
                'SLA guarantees',
            ],
            button: 'Upgrade Plan',
            highlight: false,
        },
    ];

    // For Current Subscription section (example: Pro plan)
    const currentPlan = isYearly ? {
        name: 'Pro Plan',
        planKey: 'PRO',
        nextBilling: 'June 15, 2025',
        price: plans[1].priceYearly,
        period: '/YEAR',
    } : {
        name: 'Pro Plan',
        planKey: 'PRO',
        nextBilling: 'June 15, 2025',
        price: plans[1].price,
        period: '/MONTH',
    };

    return (
        <div className="p-8 w-full"> {/* main contents */}
            <div className="flex flex-col items-center">
                <div className="mt-10 text-4xl font-bold leading-[42px]">Choose Your Plan</div>
                <div className="mt-3 mb-10 text-sm text-white/80 leading-[18px]">Secure your savings with the right plan for your needs</div>
                <div className="flex items-center justify-between gap-4 mb-8">
                    <div className={`font-medium leading-[22px] ${!isYearly ? 'text-[#7D00FE]' : ''}`}>Monthly</div>
                    <div className="">
                        <button
                            type="button"
                            className={`relative w-12 h-6 flex items-center bg-[#1F1F1F] rounded-full transition-colors duration-300 focus:outline-none border border-[#2B2B2B]`}
                            onClick={() => setIsYearly((prev) => !prev)}
                            aria-pressed={isYearly}
                        >
                            <span
                                className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-6 bg-[#7D00FE]' : ''}`}
                            />
                        </button>
                    </div>
                    <div className={`font-medium leading-[22px] ${isYearly ? 'text-[#7D00FE]' : ''}`}>Yearly</div>
                    <div className="text-[#E8F2FF] text-[11px] leading-4 px-2.5 py-2 bg-[#0F0F0F] border-[#1F1F1F] border-[1px] rounded-full">Discount 10%</div>
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="w-full grid grid-cols-3 max-xl:grid-cols-1 max-xl:max-w-[420px] gap-4">
                    {plans.map((plan, idx) => {
                        const isCurrent = plan.name.toUpperCase() === currentPlan.planKey;
                        const isPaidPlan = plan.name === 'PRO' || plan.name === 'BUSINESS';
                        return (
                            <div
                                key={plan.name}
                                className={
                                    plan.highlight
                                        ? "relative w-full flex flex-col p-6 border-white/15 border-[1px] rounded-[20px] bg-white/3 bg-linear-to-b from-transparent from-20% via-[#7D00FE]/40 via-60% to-[#7D00FE]/70 to-100%"
                                        : "w-full flex flex-col p-6 border-white/15 border-[1px] rounded-[20px] bg-white/3 bg-linear-to-b from-transparent from-20% via-[#7D00FE]/7 via-60% to-[#7D00FE]/14 to-100%"
                                }
                            >
                                {plan.highlight && (
                                    <div className="absolute right-2 top-2 px-2.5 py-2 flex items-center gap-[6px] bg-[#7D00FE]/10 border-[#7D00FE] border-[1px] rounded-full">
                                        <svg width={16} height={16}><use href="#svg-best" /></svg>
                                        <div className="text-sm leading-[18px] text-[#7D00FE]">
                                            Most Popular
                                        </div>
                                    </div>
                                )}
                                <div className="text-[20px] font-medium mb-5">{plan.name}</div>
                                <div className="flex items-baseline">
                                    <div className="text-[54px] font-medium">
                                        ${isYearly ? plan.priceYearly : plan.price}
                                    </div>
                                    <div className="text-xl font-medium text-[#808080] ">{isYearly ? '/YEAR' : '/MONTH'}</div>
                                </div>
                                <div className="my-6 w-full border-[#2B2B2B] border-[0.5px]"></div>
                                <div className="h-[192px] mb-6">
                                    {plan.features.map((feature, i) => (
                                        <div className="text-sm leading-8" key={i}>{feature}</div>
                                    ))}
                                </div>
                                <button
                                    className={
                                        isCurrent
                                            ? "bg-linear-to-b from-transparent to-white/8 text-sm leading-[26px] w-full h-10 border-white/10 rounded-[6px] border-[1px] opacity-60 cursor-not-allowed"
                                            : plan.highlight
                                                ? "bg-[#7D00FE] text-sm leading-[26px] w-full h-10 border-white/10 rounded-[6px] border-[1px]"
                                                : "bg-linear-to-b from-transparent to-white/8 text-sm leading-[26px] w-full h-10 border-white/10 rounded-[6px] border-[1px]"
                                    }
                                    disabled={isCurrent || loading}
                                    onClick={
                                        isPaidPlan && !isCurrent
                                            ? () => createCheckoutSession(plan.name, isYearly, referralCode)
                                            : undefined
                                    }
                                >
                                    {loading && isPaidPlan && !isCurrent ? 'Processing...' : isCurrent ? 'Current Plan' : 'Upgrade Plan'}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full border-white/15 border-[1px] rounded-[20px] mt-[30px] p-4 bg-white/3 ">
                    <div className="leading-5 mb-[27px]">Current Subscription</div>
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="text-xs">{currentPlan.name}</div>
                            <div className="text-xs text-white/60">Next billing: {currentPlan.nextBilling}</div>
                        </div>
                        <div className="flex items-baseline">
                            <div className="text-xl leading-4">${currentPlan.price}</div>
                            <div className="text-xs ml-1 text-white/60">{currentPlan.period}</div>
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
