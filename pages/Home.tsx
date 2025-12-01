
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Star, MapPin, Search, Calendar, UserCheck, Package } from 'lucide-react';
import { StorageService } from '../services/storage';
import { CATEGORY_LABELS, EVENT_TYPE_LABELS } from '../constants';

const { Link } = ReactRouterDOM;

const Home: React.FC = () => {
  const vendors = StorageService.getVendors().slice(0, 10);
  const dresses = StorageService.getDresses().slice(0, 2);

  // Combine vendors and dresses for "Featured Ads"
  const featuredAds = [
    ...vendors.map(v => ({
      id: v.id, type: 'vendor', title: v.name, city: v.city, price: `${v.minPrice}₪`, rating: v.ratingAverage, image: v.heroImageUrl, link: `/vendor/${v.id}`
    })),
    ...dresses.map(d => ({
      id: d.id, type: 'dress', title: d.title, city: d.city, price: `${d.forSale ? d.priceSale : d.priceRent}₪`, rating: 4.5, image: d.mainImageUrl, link: `/dresses/${d.id}`
    }))
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* 1) HERO SECTION */}
      <div className="relative gradient-bg text-white pt-12 pb-24 px-6 overflow-hidden rounded-b-[40px] shadow-soft">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
           <svg width="300" height="300" viewBox="0 0 100 100" fill="white"><circle cx="50" cy="50" r="40" /></svg>
        </div>
        <div className="relative z-10 text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">كل ما تحتاجه لمناسبتك <br/> في مكان واحد</h1>
          <p className="text-lg text-white/90">اكتشف الخدمات، أنشئ المناسبات، وشارك الدعوات بسهولة.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link to="/dashboard/create" className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform">
              إنشاء مناسبة جديدة
            </Link>
            <Link to="/marketplace" className="bg-white/20 backdrop-blur border border-white/50 text-white font-bold py-3 px-8 rounded-full hover:bg-white/30 active:scale-95 transition-transform">
              تصفح الخدمات
            </Link>
          </div>
        </div>
      </div>

      {/* 2) CATEGORY GRID */}
      <div className="px-4 -mt-16 relative z-20">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3 max-w-5xl mx-auto">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link key={key} to={`/marketplace?category=${key}`} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary hover:shadow-md transition-shadow">
                <Star size={24} />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-700 text-center line-clamp-1">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* 3) EVENT TYPE SLIDER */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-slate-800 mb-4 px-2">خطط حسب المناسبة</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-2">
          {Object.entries(EVENT_TYPE_LABELS).map(([key, label]) => (
            <Link key={key} to={`/plans/${key}`} className="flex-shrink-0 relative w-32 h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <img src={`https://picsum.photos/200/300?random=${key}`} alt={label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center p-3">
                <span className="text-white font-bold text-sm">{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* 4) READY PACKAGES PROMO (NEW SECTION) */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-3xl border border-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
           <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Package className="text-primary" /> باقات جاهزة
              </h2>
              <p className="text-slate-500 mb-4">وفر الوقت والجهد مع باقات متكاملة تشمل القاعات، التصوير، والطعام.</p>
              <Link to="/bundles" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-primary/90 transition-colors">
                عرض جميع الباقات
              </Link>
           </div>
           <div className="flex gap-2">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-sm p-1">
                 <img src="https://images.unsplash.com/photo-1519225468359-2996bc01c083?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-xl" alt="Package" />
              </div>
              <div className="w-24 h-24 bg-white rounded-2xl shadow-sm p-1 mt-4">
                 <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-xl" alt="Package" />
              </div>
           </div>
        </div>
      </div>

      {/* 5) FEATURED ADS */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-4 px-2">
           <h2 className="text-xl font-bold text-slate-800">إعلانات مميزة</h2>
           <Link to="/marketplace" className="text-primary text-sm font-bold">عرض الكل</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 px-2">
          {featuredAds.map((ad, idx) => (
            <div key={idx} className="flex-shrink-0 w-48 bg-white rounded-2xl shadow-sm border border-slate-50 overflow-hidden">
              <div className="h-32 bg-slate-200">
                <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1 mb-1">{ad.title}</h3>
                <div className="flex items-center text-slate-500 text-xs mb-2">
                  <MapPin size={12} className="ml-1" />
                  {ad.city}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-sm">{ad.price}</span>
                  <div className="flex items-center text-amber-400 text-xs">
                    <Star size={10} fill="currentColor" />
                    <span className="mr-1">{ad.rating}</span>
                  </div>
                </div>
                <Link to={ad.link} className="block w-full mt-3 bg-slate-50 text-slate-600 text-xs font-bold py-2 rounded-lg text-center hover:bg-slate-100">
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6) HOW IT WORKS */}
      <div className="px-4 pb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6 px-2">كيف يعمل الموقع؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-primary flex items-center justify-center">
                <Search size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">ابحث عن الخدمة</h3>
                <p className="text-xs text-slate-500 mt-1">تصفح مئات المزودين في منطقتك</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-secondary flex items-center justify-center">
                <UserCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">اختر المزود</h3>
                <p className="text-xs text-slate-500 mt-1">قارن الأسعار والتقييمات</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">أنشئ مناسبة</h3>
                <p className="text-xs text-slate-500 mt-1">صمم دعوة وشاركها مع أحبائك</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
