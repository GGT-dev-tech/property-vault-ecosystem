import React, { useState, useEffect } from 'react';
import { api, CreatePropertyData } from '../services/api';
import { PropertyType } from '../types';

interface AddPropertyProps {
    onNavigate: (page: string) => void;
}

export const AddProperty: React.FC<AddPropertyProps> = ({ onNavigate }) => {
    // Basic form state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        extId: '',
        address: '',
        cityId: '',
        countyId: '',
        stateId: '',
        type: PropertyType.HOUSE,
        price: '',
        estValue: '',
        area: '',
        desc: ''
    });

    // Location Data State
    const [states, setStates] = useState<any[]>([]);
    const [counties, setCounties] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = async () => {
        try {
            const data = await api.getStates();
            setStates(data);
            if (data.length > 0) {
                // Select first state by default or let user choose
                setFormData(prev => ({ ...prev, stateId: data[0].id }));
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        if (formData.stateId) {
            loadCounties(formData.stateId);
        }
    }, [formData.stateId]);

    const loadCounties = async (stateId: string) => {
        try {
            const data = await api.getCounties(stateId);
            setCounties(data);
            if (data.length > 0) setFormData(prev => ({ ...prev, countyId: data[0].id }));
            else setFormData(prev => ({ ...prev, countyId: '' }));
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        if (formData.countyId) {
            loadCities(formData.countyId);
        }
    }, [formData.countyId]);

    const loadCities = async (countyId: string) => {
        try {
            const data = await api.getCities(countyId);
            setCities(data);
            if (data.length > 0) setFormData(prev => ({ ...prev, cityId: data[0].id }));
            else setFormData(prev => ({ ...prev, cityId: '' }));
        } catch (e) { console.error(e); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload: CreatePropertyData = {
                externalPropertyId: formData.extId,
                type: formData.type,
                stateId: formData.stateId,
                countyId: formData.countyId,
                cityId: formData.cityId,
                address: formData.address,
                purchasePrice: Number(formData.price) || 0,
                marketEstimatedValue: Number(formData.estValue) || 0,
                landArea: Number(formData.area) || 0,
                description: formData.desc
            };

            const newProp = await api.createProperty(payload);

            if (imageFile) {
                try {
                    await api.uploadImage(newProp.id, imageFile);
                } catch (imgError) {
                    console.error("Image upload failed", imgError);
                    alert("Property created, but image upload failed.");
                }
            }

            alert(`Property Created! Tag: ${newProp.propertyTag}`);
            onNavigate('inventory');
        } catch (err: any) {
            alert(err.message || 'Error creating property');
            console.error(err);
        }
    };

    const currentStateCode = states.find(s => s.id === formData.stateId)?.code || '??';
    const currentCountyCode = counties.find(c => c.id === formData.countyId)?.code || '??';
    const previewTag = `${currentStateCode}-${currentCountyCode}-####-${formData.extId || 'EXT'}`;

    return (
        <div className="max-w-[960px] mx-auto px-6 py-8">
            <div className="mb-10">
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-2">Add New Property</h1>
                <p className="text-[#4d6599] text-base font-normal">Enter details. The unique Property Tag will be generated automatically by the backend.</p>
            </div>

            <form className="space-y-8 bg-white dark:bg-[#1a2133] p-8 rounded-xl shadow-sm border border-[#e7ebf3] dark:border-[#2d364d]" onSubmit={handleSubmit}>
                {/* Auto-Generated Tag Preview */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Preview Property Tag</p>
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
                                value={formData.stateId}
                                onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                            >
                                <option value="">Select State</option>
                                {states.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                            </select>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">County</span>
                            <select
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                value={formData.countyId}
                                onChange={(e) => setFormData({ ...formData, countyId: e.target.value })}
                                disabled={!formData.stateId}
                            >
                                <option value="">Select County</option>
                                {counties.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
                            </select>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">City</span>
                            <select
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                value={formData.cityId}
                                onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                                disabled={!formData.countyId}
                            >
                                <option value="">Select City</option>
                                {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </label>
                    </div>
                    <label className="flex flex-col gap-2 mt-4">
                        <span className="text-slate-900 dark:text-white text-sm font-semibold">Street Address</span>
                        <input
                            className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                            placeholder="123 Main St"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </label>
                </section>

                <hr className="border-[#e7ebf3] dark:border-[#2d364d]" />

                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">image</span>
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight">Property Image</h2>
                    </div>
                    <label className="flex flex-col gap-2">
                        <span className="text-slate-900 dark:text-white text-sm font-semibold">Main Photo</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 pt-2 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-700"
                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                        />
                        <p className="text-xs text-[#4d6599]">Upload a main image for the property (Max 5MB).</p>
                    </label>
                </section>

                <hr className="border-[#e7ebf3] dark:border-[#2d364d]" />

                <section>
                    <div className="flex items-center gap-2 mb-6 text-primary">
                        <span className="material-symbols-outlined">fingerprint</span>
                        <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight">Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">External ID (APN)</span>
                            <input
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                placeholder="e.g. 123-456-789"
                                value={formData.extId}
                                onChange={(e) => setFormData({ ...formData, extId: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">Property Type</span>
                            <select
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                            >
                                <option value="HOUSE">House</option>
                                <option value="LOT">Lot</option>
                                <option value="APARTMENT">Apartment</option>
                                <option value="COMMERCIAL">Commercial</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">Price ($)</span>
                            <input
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-900 dark:text-white text-sm font-semibold">Land Area (Acres)</span>
                            <input
                                className="form-input rounded-lg border-[#d0d7e7] dark:border-[#2d364d] bg-background-light dark:bg-[#111621] dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                                type="number"
                                step="0.01"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            />
                        </label>
                    </div>
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
