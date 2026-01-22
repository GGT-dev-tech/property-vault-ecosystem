import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatCurrency } from '../services/mockData';
import { Property } from '../types';

interface InventoryProps {
    onNavigate: (page: string, id?: string) => void;
}

export const Inventory: React.FC<InventoryProps> = ({ onNavigate }) => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterState, setFilterState] = useState('All');

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        try {
            const data = await api.getProperties();
            setProperties(data);
        } catch (error) {
            console.error("Failed to load properties", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProperties = filterState === 'All'
        ? properties
        : properties.filter(p => p.state_code === filterState);

    if (loading) {
        return <div className="p-8 text-center text-[#4d6599]">Loading inventory...</div>;
    }

    return (
        <div className="p-8 max-w-[1440px] mx-auto min-h-screen">
            <div className="mb-6">
                <nav className="flex text-sm text-[#4d6599] mb-2">
                    <span className="hover:text-primary cursor-pointer" onClick={() => onNavigate('dashboard')}>Portfolio</span>
                    <span className="mx-2 text-gray-300">/</span>
                    <span className="text-slate-900 dark:text-white font-medium">Inventory</span>
                </nav>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Property Inventory</h1>
                        <p className="text-[#4d6599] mt-1">Showing {filteredProperties.length} available properties across all markets.</p>
                    </div>
                    {/* Actions Bar */}
                    <div className="flex items-center gap-2 bg-white dark:bg-[#1a2133] p-1 rounded-xl shadow-sm border border-[#e7ebf3] dark:border-[#2d364d]">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white shadow-sm transition-all">
                            <span className="material-symbols-outlined text-[18px]">grid_view</span>
                            <span className="text-sm font-medium">Grid</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[#4d6599] hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                            <span className="material-symbols-outlined text-[18px]">list</span>
                            <span className="text-sm font-medium">List</span>
                        </button>
                        <div className="w-[1px] h-6 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                        <select
                            className="bg-transparent border-none text-sm font-medium text-[#4d6599] focus:ring-0 cursor-pointer"
                            onChange={(e) => setFilterState(e.target.value)}
                        >
                            <option value="All">All States</option>
                            <option value="TX">Texas</option>
                            <option value="FL">Florida</option>
                            <option value="CA">California</option>
                            <option value="AZ">Arizona</option>
                        </select>
                    </div>
                </div>
            </div>

            {filteredProperties.length === 0 ? (
                <div className="text-center py-20 text-[#4d6599]">
                    <p>No properties found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProperties.map(prop => (
                        <div
                            key={prop.id}
                            className="bg-white dark:bg-[#1a2133] border border-[#e7ebf3] dark:border-[#2d364d] rounded-xl overflow-hidden group hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={prop.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                                    alt={prop.address}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                                    {prop.property_tag}
                                </div>
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <span className="bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-sm uppercase">
                                        {prop.type}
                                    </span>
                                    {prop.flood_risk && (
                                        <span className="bg-amber-500 text-white px-2 py-1 rounded-lg text-[10px] font-bold shadow-sm flex items-center gap-1 uppercase">
                                            <span className="material-symbols-outlined text-[12px] fill-1">warning</span> Flood Zone
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors text-slate-900 dark:text-white cursor-pointer" onClick={() => onNavigate('detail', prop.id)}>
                                            {prop.address}
                                        </h3>
                                        <p className="text-sm text-[#4d6599] flex items-center gap-1 mt-1">
                                            <span className="material-symbols-outlined text-[16px]">location_on</span> {prop.city}, {prop.state_code} {prop.zip_code}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 my-4 p-3 bg-[#f6f6f8] dark:bg-slate-800/50 rounded-lg">
                                    <div>
                                        <p className="text-[10px] text-[#4d6599] font-bold uppercase tracking-wider mb-0.5">Purchase</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{formatCurrency(prop.price)}</p>
                                    </div>
                                    <div className="border-l border-slate-200 dark:border-slate-700 pl-4">
                                        <p className="text-[10px] text-[#4d6599] font-bold uppercase tracking-wider mb-0.5">Est. Value</p>
                                        <div className="flex items-center gap-1.5">
                                            <p className="font-bold text-emerald-600">{formatCurrency(prop.estimated_value)}</p>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                                                +{prop.price > 0 ? Math.round(((prop.estimated_value - prop.price) / prop.price) * 100) : 0}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-sm text-[#4d6599] font-medium">
                                        <span className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm">square_foot</span> {prop.land_area} ac
                                        </span>
                                        {prop.bedrooms && (
                                            <span className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">bed</span> {prop.bedrooms} BD
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => onNavigate('detail', prop.id)}
                                        className="bg-gray-100 dark:bg-slate-800 hover:bg-primary hover:text-white p-2 rounded-lg text-slate-600 dark:text-slate-300 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
