import React from 'react';
import { PROPERTIES, formatCurrency } from '../services/mockData';
import { StatCardProps } from '../types';

interface DashboardProps {
    onNavigate: (page: string, id?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
    
    // Derived stats from mock data
    const totalValue = PROPERTIES.reduce((acc, curr) => acc + curr.estimated_value, 0);
    const activeCount = PROPERTIES.filter(p => p.status === 'Active').length;
    
    return (
        <div className="p-4 md:p-8 max-w-[1440px] mx-auto">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                    <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Portfolio Overview</h3>
                    <p className="text-[#4d6599] mt-2">Welcome back! Here's the latest activity on your managed assets.</p>
                </div>
                <button 
                    onClick={() => onNavigate('add-property')}
                    className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined">add_business</span>
                    <span>Add Property</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard 
                    label="Total Properties" 
                    value={PROPERTIES.length.toString()} 
                    trend="+2.1%" 
                    trendUp={true} 
                    icon="home_work" 
                    colorClass="text-primary bg-blue-50 dark:bg-blue-900/20"
                />
                <div className="bg-white dark:bg-[#1a2133] p-6 rounded-xl border border-[#e7ebf3] dark:border-[#2d364d] shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div className="size-12 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-[#07883d]">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-[#07883d] text-sm font-bold bg-[#07883d]/10 px-2 py-1 rounded-md">+5.2%</span>
                    </div>
                    <div>
                        <p className="text-[#4d6599] text-sm font-medium">Estimated Market Value</p>
                        <div className="flex items-end gap-4">
                            <p className="text-3xl font-black mt-1 text-slate-900 dark:text-white">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: "compact" }).format(totalValue)}
                            </p>
                            <div className="flex-1 pb-2">
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <StatCard 
                    label="Active Listings" 
                    value={activeCount.toString()} 
                    trend="Stable" 
                    trendUp={true} 
                    icon="sell" 
                    colorClass="text-amber-600 bg-amber-50 dark:bg-amber-900/20"
                />
            </div>

            {/* Recent Properties Section */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">Recent Properties</h4>
                    <button onClick={() => onNavigate('inventory')} className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROPERTIES.map((prop) => (
                        <div 
                            key={prop.id} 
                            onClick={() => onNavigate('detail', prop.id)}
                            className="bg-white dark:bg-[#1a2133] rounded-xl border border-[#e7ebf3] dark:border-[#2d364d] shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-primary/30 transition-all duration-300 group cursor-pointer overflow-hidden flex flex-col"
                        >
                            <div 
                                className="h-40 bg-cover bg-center relative" 
                                style={{ backgroundImage: `url('${prop.image_url}')` }}
                            >
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-extrabold text-primary shadow-sm uppercase tracking-wider">
                                    {prop.property_tag}
                                </div>
                                <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase ${
                                    prop.status === 'Active' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                                }`}>
                                    {prop.status}
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-1">
                                <h5 className="font-bold text-base truncate text-slate-900 dark:text-white">{prop.address}</h5>
                                <p className="text-[#4d6599] text-xs mt-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {prop.city}, {prop.state_code}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                                    <span className="text-lg font-black text-slate-900 dark:text-white">{formatCurrency(prop.price)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, trendUp, icon, colorClass }) => (
    <div className="bg-white dark:bg-[#1a2133] p-6 rounded-xl border border-[#e7ebf3] dark:border-[#2d364d] shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-start">
            <div className={`size-12 rounded-lg flex items-center justify-center ${colorClass}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>
            <span className={`text-sm font-bold px-2 py-1 rounded-md ${trendUp ? 'text-[#07883d] bg-[#07883d]/10' : 'text-red-500 bg-red-500/10'}`}>
                {trend}
            </span>
        </div>
        <div>
            <p className="text-[#4d6599] text-sm font-medium">{label}</p>
            <p className="text-3xl font-black mt-1 text-slate-900 dark:text-white">{value}</p>
        </div>
    </div>
);
