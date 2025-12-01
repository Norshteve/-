
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { PackageModel } from '../types';
import { StorageService } from '../services/storage';
import { Star, ArrowRight } from 'lucide-react';
import { EVENT_TYPE_LABELS } from '../constants';

const { Link } = ReactRouterDOM;

const Bundles: React.FC = () => {
  const [packages, setPackages] = useState<PackageModel[]>([]);

  useEffect(() => {
    setPackages(StorageService.getAllPackages());
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6 text-slate-500 hover:text-primary font-bold w-fit">
         <Link to="/" className="flex items-center gap-1"><ArrowRight size={20}/> الرئيسية</Link>
      </div>
      
      <h1 className="text-3xl font-bold text-slate-800 mb-2">جميع الباقات الجاهزة</h1>
      <p className="text-slate-500 mb-8">اختر الباقة المناسبة لمناسبتك ووفر الوقت والمال</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map(pkg => (
          <div key={pkg.id} className="bg-white rounded-3xl shadow-soft border border-slate-50 overflow-hidden group hover:shadow-lg transition-all">
            <div className="h-56 relative overflow-hidden">
                <img src={pkg.heroImageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                  {EVENT_TYPE_LABELS[pkg.occasionType]}
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-bold text-slate-800 text-xl mb-2">{pkg.title}</h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{pkg.description}</p>
                
                <div className="space-y-2 mb-4">
                  {pkg.includedServices.slice(0, 3).map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {s}
                    </div>
                  ))}
                  {pkg.includedServices.length > 3 && (
                    <div className="text-xs text-slate-400 pr-3">+ {pkg.includedServices.length - 3} خدمات أخرى</div>
                  )}
                </div>

                <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                  <span className="text-primary font-bold text-2xl">{pkg.price} ₪</span>
                  <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                      <Star size={16} fill="currentColor" /> {pkg.ratingAverage}
                  </div>
                </div>
                <Link to={`/plans/${pkg.occasionType}/package/${pkg.id}`} className="block w-full mt-4 bg-slate-50 text-slate-700 font-bold py-3 rounded-xl text-center hover:bg-slate-100 transition-colors">
                  عرض التفاصيل
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bundles;
