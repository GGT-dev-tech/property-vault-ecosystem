import React, { useState } from 'react';
import { generateTag } from '../services/mockData';

interface AddPropertyProps {
    onNavigate: (page: string) => void;
}

export const AddProperty: React.FC<AddPropertyProps> = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        state: 'CA',
        county: 'LA',
        extId: '',
    });

    const previewTag = generateTag(formData.state, formData.county, 4, formData.extId || 'APN...');

    return (
        <div className="max-w-[960px] mx-auto px-6 py-8">
            <div className="mb-10">
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">Add New Property</h1>
                <p className="text-[#4d6599] text-base font-normal">Enter details. The unique Property Tag will be generated automatically.</p>
            </div>

            <form className="space-y-8 bg-white dark:bg-[#1a2133] p-8 rounded-xl shadow-sm border border-[#e7ebf3] dark:border-[#2d364d]" onSubmit={(e) => { e.preventDefault(); alert(`Created: ${previewTag}`); onNavigate('inventory'); }}>
                {/* Auto-Generated Tag Preview */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Generated Property Tag</p>
                        <p className="text-2xl font-mono font-black text-primary">{previewTag}</p>
                    </div>
                    <span className="material-symbols-outlined text-primary text-3xl opacity-50">fingerprint</span>
                </div>

                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">location_on</span>
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight">Location</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">State</span>
                            <select 
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                value={formData.state}
                                onChange={(e) => setFormData({...formData, state: e.target.value})}
                            >
                                <option value="CA">California</option>
                                <option value="TX">Texas</option>
                                <option value="FL">Florida</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">County Code</span>
                            <input 
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary" 
                                value={formData.county}
                                onChange={(e) => setFormData({...formData, county: e.target.value})}
                                maxLength={2}
                            />
                        </label>
                         <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">City</span>
                            <input className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary" placeholder="City Name" />
                        </label>
                    </div>
                </section>

                <hr className="border-[#e7ebf3] dark:border-[#2d364d]" />

                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">fingerprint</span>
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight">Identifiers</h2>
                    </div>
                    <label className="flex flex-col gap-2">
                        <span className="text-slate-900 dark:text-white text-sm font-semibold">External ID (APN)</span>
                        <input 
                            className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary" 
                            placeholder="e.g. 123-456-789"
                            value={formData.extId}
                            onChange={(e) => setFormData({...formData, extId: e.target.value})}
                        />
                    </label>
                </section>

                <div className="flex items-center justify-end gap-4 pt-6">
                    <button 
                        type="button" 
                        onClick={() => onNavigate('dashboard')}
                        className="px-6 py-3 rounded-lg text-sm font-semibold text-[#4d6599] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button type="submit" className="px-8 py-3 rounded-lg bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                        Save Property Details
                    </button>
                </div>
            </form>
        </div>
    );
};
