
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MapPin, Star, Filter } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Vendor, Region, VendorCategory } from '../types';
import { CATEGORY_LABELS, REGION_LABELS, CITIES } from '../constants';

const { useSearchParams, Link } = ReactRouterDOM;

const Marketplace: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') as VendorCategory | '';
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [filtered, setFiltered] = useState<Vendor[]>([]);
  
  // Filters
  const [category, setCategory] = useState<VendorCategory | ''>(initialCategory);
  const [region, setRegion] = useState<Region | ''>('');
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = StorageService.getVendors();
    setVendors(data);
    setFiltered(data);
  }, []);

  useEffect(() => {
    let res = vendors;
    if (category) res = res.filter(v => v.category === category);
    if (region) res = res.filter(v => v.region === region);
    if (city) res = res.filter(v => v.city === city);
    if (search) res = res.filter(v => v.name.includes(search));
    setFiltered(res);
  }, [category, region, city, search, vendors]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search & Filters Header */}
      <div className="bg-white p-6 rounded-3xl shadow-soft mb-8">
         <h1 className="text-2xl font-bold mb-6 text-slate-800">سوق الخدمات</h1>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <input type="text" placeholder="ابحث عن خدمة..." value={search} onChange={e => setSearch(e.target.value)} className="p-3 bg-slate-50 rounded-xl border-none" />
           <select value={category} onChange={e => setCategory(e.target.value as any)} className="p-3 bg-slate-50 rounded-xl border-none">
             <option value="">كل الأقسام</option>
             {Object.entries(CATEGORY_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
           </select>
           <select value={region} onChange={e => setRegion(e.target.value as any)} className="p-3 bg-slate-50 rounded-xl border-none">
             <option value="">كل المناطق</option>
             {Object.entries(REGION_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
           </select>
           <select value={city} onChange={e => setCity(e.target.value)} className="p-3 bg-slate-50 rounded-xl border-none">
             <option value="">كل المدن</option>
             {region && CITIES[region].map(c => <option key={c} value={c}>{c}</option>)}
           </select>
         </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(vendor => (
          <div key={vendor.id} className="bg-white rounded-3xl shadow-soft overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
               <img src={vendor.heroImageUrl} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                 {CATEGORY_LABELS[vendor.category]}
               </div>
            </div>
            <div className="p-5">
               <h3 className="text-lg font-bold text-slate-800 mb-1">{vendor.name}</h3>
               <div className="flex items-center text-slate-500 text-sm mb-3">
                 <MapPin size={14} className="ml-1" /> {vendor.city}
               </div>
               <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                  <span className="text-primary font-bold">{vendor.minPrice} ₪</span>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                     <Star size={14} fill="currentColor" /> {vendor.ratingAverage}
                  </div>
               </div>
               <Link to={`/vendor/${vendor.id}`} className="block text-center w-full mt-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-2 rounded-xl transition-colors">
                 عرض التفاصيل
               </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
