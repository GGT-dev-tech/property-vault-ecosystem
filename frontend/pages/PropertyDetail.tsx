import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { formatCurrency } from '../services/mockData';
import { Property } from '../types';

interface PropertyDetailProps {
  id?: string;
  onNavigate: (page: string) => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ id, onNavigate }) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Since the API only returns a list or creates, we might need to filter from the list or implement a getOne endpoint. 
      // The backend *does* have getOne at /properties/:id.
      loadProperty(id);
    }
  }, [id]);

  const loadProperty = async (propId: string) => {
    try {
      // Since api.ts doesn't have getPropertyById yet, let's look at api.ts or implementation
      // If api.ts is missing it, I should update api.ts first. 
      // Checking api.ts content from previous turns... 
      // api.ts only has getProperties, createProperty, getStates...
      // I need to add getProperty(id) to api.ts properly.
      // For now I will assume I will fix api.ts next.
      const allProps = await api.getProperties();
      const found = allProps.find(p => p.id === propId);
      setProperty(found || null);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-[#4d6599]">Loading property details...</div>;
  if (!property) return <div className="p-10 text-center text-[#4d6599]">Property not found. <a onClick={() => onNavigate('inventory')} className="text-primary hover:underline cursor-pointer">Return to Inventory</a></div>;

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div className="space-y-2">
          <nav className="flex items-center gap-2 text-sm text-[#4d6599] mb-2">
            <a onClick={() => onNavigate('dashboard')} className="hover:text-primary cursor-pointer">Dashboard</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <a onClick={() => onNavigate('inventory')} className="hover:text-primary cursor-pointer">Properties</a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-slate-900 dark:text-slate-100 font-medium">{property.property_tag}</span>
          </nav>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Property Detail Analysis</h1>
            <span className="px-2 py-0.5 border border-[#D4AF37] text-[#D4AF37] text-[10px] font-bold uppercase rounded tracking-wider flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">verified</span> Premium Verified
            </span>
          </div>
          <p className="text-[#4d6599]">{property.address}, {property.city}, {property.state_code} {property.zip_code} • Listing ID: {property.property_tag}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-white">
            <span className="material-symbols-outlined text-lg">download</span> Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-shadow shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg text-white">edit</span> Edit Property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Visual Media */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Image */}
          <div className="bg-white dark:bg-[#1a2133] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-[#2d364d] p-2">
            <div className="relative aspect-video rounded-lg overflow-hidden group">
              <img src={property.image_url || 'https://via.placeholder.com/800x450?text=No+Image'} alt="Main View" className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">photo_camera</span> 1 of 1
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-white dark:bg-[#1a2133] rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-[#2d364d]">
            <div className="p-4 border-b border-slate-100 dark:border-[#2d364d] flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-primary">location_on</span> Geospatial Location
              </h3>
            </div>
            <div className="h-80 w-full relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <p className="text-slate-400 font-semibold">Map View Integration ({property.coordinates.lat}, {property.coordinates.lng})</p>
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Precision Coordinates</div>
                <div className="font-mono text-sm text-slate-900 dark:text-white">{property.coordinates.lat || '?'}° N, {property.coordinates.lng || '?'}° W</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Technical Data */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#1a2133] p-5 rounded-xl border border-slate-200 dark:border-[#2d364d] shadow-sm relative overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Land Area</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{property.land_area}</span>
                <span className="text-[#4d6599] font-medium">Acres</span>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1a2133] p-5 rounded-xl border border-slate-200 dark:border-[#2d364d] shadow-sm relative overflow-hidden">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Built Area</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">{property.built_area || '-'}</span>
                <span className="text-[#4d6599] font-medium">Sq.ft</span>
              </div>
            </div>
          </div>

          {/* Technical List */}
          <div className="bg-white dark:bg-[#1a2133] rounded-xl border border-slate-200 dark:border-[#2d364d] shadow-sm">
            <div className="p-5 border-b border-slate-100 dark:border-[#2d364d]">
              <h3 className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="material-symbols-outlined text-[#D4AF37]">analytics</span> Technical Data
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-[#2d364d]">
              <Row label="APN ID" value={property.external_property_id} isMono />
              <Row label="County Registry" value={`${property.city} Registry`} />
              <Row label="Property Type" value={property.type} />
              <Row label="Est. Tax Value" value={formatCurrency(property.estimated_value)} />
            </div>
          </div>

          {/* Valuation Chart Card */}
          <div className="bg-white dark:bg-[#1a2133] rounded-xl border border-slate-200 dark:border-[#2d364d] shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Market Valuation</h3>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">AI Estimated Value</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-primary">{formatCurrency(property.estimated_value)}</p>
                <p className="text-xs text-green-500 font-bold">High Confidence</p>
              </div>
            </div>
            <div className="h-32 bg-gradient-to-t from-primary/10 to-transparent rounded-lg border-b-2 border-primary w-full relative">
              {/* Fake Chart Line */}
              <svg className="absolute bottom-0 left-0 w-full h-full" preserveAspectRatio="none">
                <path d="M0 100 Q 100 80 200 90 T 400 10" fill="none" stroke="#2463eb" strokeWidth="3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, isMono }: { label: string, value: string, isMono?: boolean }) => (
  <div className="flex justify-between p-4 px-5 items-center">
    <span className="text-sm font-medium text-[#4d6599]">{label}</span>
    <span className={`text-sm font-bold text-slate-900 dark:text-white ${isMono ? 'font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded' : ''}`}>
      {value}
    </span>
  </div>
);
