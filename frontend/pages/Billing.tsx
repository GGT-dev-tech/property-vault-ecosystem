import React from 'react';

export const Billing: React.FC = () => {
    return (
        <div className="flex flex-col items-center px-6 md:px-20 py-12 max-w-7xl mx-auto w-full">
            <div className="text-center mb-10 max-w-2xl">
                <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                    Subscription Plans
                </h1>
                <p className="text-[#4d6599] text-lg font-normal">
                    Scale your real estate operations with ease.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch">
                {/* Basic */}
                <div className="flex flex-col gap-6 rounded-xl border border-[#d0d7e7] dark:border-[#2d364d] bg-white dark:bg-[#1a2133] p-8 hover:border-primary/50 transition-all">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#4d6599] text-sm font-bold uppercase tracking-widest">Starter</h3>
                        <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                            <span className="text-4xl font-black tracking-tight">$29</span>
                            <span className="text-base font-bold text-[#4d6599]">/month</span>
                        </div>
                    </div>
                    <button className="w-full rounded-xl h-12 bg-[#e7ebf3] dark:bg-slate-700 text-slate-900 dark:text-white font-bold text-sm">Upgrade</button>
                </div>

                {/* Pro */}
                <div className="flex flex-col gap-6 rounded-xl border-2 border-primary bg-white dark:bg-[#1a2133] p-8 relative scale-105 z-10 shadow-2xl shadow-primary/10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-primary text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">Most Popular</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-primary text-sm font-bold uppercase tracking-widest">Professional</h3>
                        <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                            <span className="text-5xl font-black tracking-tight">$99</span>
                            <span className="text-base font-bold text-[#4d6599]">/month</span>
                        </div>
                    </div>
                    <button className="w-full rounded-xl h-12 bg-primary text-white font-bold text-sm">Current Plan</button>
                </div>

                {/* Enterprise */}
                <div className="flex flex-col gap-6 rounded-xl border border-[#D4AF37] bg-white dark:bg-[#1a2133] p-8 transition-all">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest">Enterprise</h3>
                        <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                            <span className="text-4xl font-black tracking-tight">$249</span>
                            <span className="text-base font-bold text-[#4d6599]">/month</span>
                        </div>
                    </div>
                    <button className="w-full rounded-xl h-12 bg-slate-900 dark:bg-[#D4AF37] text-white dark:text-slate-900 font-bold text-sm">Contact Sales</button>
                </div>
            </div>
        </div>
    );
};
