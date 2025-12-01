
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Sparkles, MapPin, Star, ArrowRight, Package } from 'lucide-react';
import { StorageService } from '../services/storage';
import { EventType, Vendor, VendorCategory, PackageModel } from '../types';
import { EVENT_TYPE_LABELS, CATEGORY_LABELS } from '../constants';

const { useParams, Link } = ReactRouterDOM;

const OccasionPlan: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [suggestions, setSuggestions] = useState<Vendor[]>([]);
  const [packages, setPackages] = useState<PackageModel[]>([]);
  
  const eventType = type as EventType;
  const label = EVENT_TYPE_LABELS[eventType] || 'مناسبة';

  useEffect(() => {
    setVendors(StorageService.getVendors());
    setSuggestions(StorageService.getSuggestions(eventType));
    setPackages(StorageService.getPackagesByOccasion(eventType));
  }, [eventType]);

  // Group vendors by category
  const categoriesToDisplay = Object.values(VendorCategory) as VendorCategory[];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white p-6 md:p-10 shadow-soft mb-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-4 font-bold text-sm">
            <ArrowRight size={16} /> العودة للرئيسية
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-2">خطة {label}</h1>
          <p className="text-slate-500">كل الخدمات التي تحتاجها لـ {label} في مكان واحد</p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 space-y-12">
        
        {/* Smart Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-3xl border border-white shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-primary" size={24} />
              <h2 className="text-xl font-bold text-slate-800">اقتراحات ذكية لمناسبتك</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {suggestions.map(vendor => (
                <div key={vendor.id} className="flex-shrink-0 w-56 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow">
                  <div className="h-32 rounded-xl overflow-hidden mb-3">
                    <img src={vendor.heroImageUrl} className="w-full h-full object-cover" alt={vendor.name} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-1">{vendor.name}</h3>
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                    <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{CATEGORY_LABELS[vendor.category]}</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold"><Star size={10} fill="currentColor"/> {vendor.ratingAverage}</span>
                  </div>
                  <Link to={`/vendor/${vendor.id}`} className="block text-center bg-slate-50 text-primary text-xs font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    عرض التفاصيل
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ready-made Packages */}
        {packages.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4 px-2">
              <div className="flex items-center gap-2">
                 <Package className="text-secondary" size={24} />
                 <h3 className="text-xl font-bold text-slate-800">باقات جاهزة</h3>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-2">
              {packages.map(pkg => (
                <div key={pkg.id} className="flex-shrink-0 w-72 bg-white rounded-3xl shadow-soft border border-slate-50 overflow-hidden group hover:shadow-lg transition-all">
                  <div className="h-44 relative overflow-hidden">
                     <img src={pkg.heroImageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                       شامل
                     </div>
                  </div>
                  <div className="p-5">
                     <h3 className="font-bold text-slate-800 text-lg mb-2">{pkg.title}</h3>
                     <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
                     
                     <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                        <span className="text-primary font-bold text-lg">{pkg.price} ₪</span>
                        <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                           <Star size={16} fill="currentColor" /> {pkg.ratingAverage}
                        </div>
                     </div>
                     <Link to={`/plans/${eventType}/package/${pkg.id}`} className="block w-full mt-4 bg-slate-50 text-slate-700 font-bold py-2.5 rounded-xl text-center hover:bg-slate-100 transition-colors">
                       عرض التفاصيل
                     </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Sections */}
        {categoriesToDisplay.map(cat => {
          const categoryVendors = vendors.filter(v => v.category === cat);
          if (categoryVendors.length === 0) return null;

          return (
            <div key={cat}>
              <div className="flex justify-between items-center mb-4 px-2">
                <h3 className="text-xl font-bold text-slate-800">{CATEGORY_LABELS[cat]}</h3>
                <Link to={`/marketplace?category=${cat}`} className="text-primary text-sm font-bold">المزيد</Link>
              </div>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-2">
                {categoryVendors.map(vendor => (
                  <div key={vendor.id} className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-sm border border-slate-50 overflow-hidden group hover:shadow-md transition-all">
                    <div className="h-40 relative overflow-hidden">
                       <img src={vendor.heroImageUrl} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                       <h3 className="font-bold text-slate-800 mb-1">{vendor.name}</h3>
                       <div className="flex items-center text-slate-500 text-xs mb-3">
                         <MapPin size={12} className="ml-1" /> {vendor.city}
                       </div>
                       <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                          <span className="text-primary font-bold">{vendor.minPrice} ₪</span>
                          <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                             <Star size={14} fill="currentColor" /> {vendor.ratingAverage}
                          </div>
                       </div>
                       <Link to={`/vendor/${vendor.id}`} className="block w-full mt-3 bg-slate-50 text-slate-600 text-sm font-bold py-2 rounded-xl text-center hover:bg-slate-100">
                         التفاصيل
                       </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* View All Bundles Link */}
        <div className="mt-8 pt-8 border-t border-slate-100">
           <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">عرض جميع الباقات</h3>
              <Link to="/bundles" className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-slate-700 transition-colors">
                عرض كل الباقات
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OccasionPlan;
