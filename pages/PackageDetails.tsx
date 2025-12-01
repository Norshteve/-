
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Navigation, Star, ArrowRight, Check, CheckCircle, Sparkles, User, FileText, CalendarCheck } from 'lucide-react';
import { StorageService } from '../services/storage';
import { PackageModel, Vendor } from '../types';
import { EVENT_TYPE_LABELS, CATEGORY_LABELS } from '../constants';

const { useParams, useNavigate, Link } = ReactRouterDOM;

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState<PackageModel | null>(null);
  const [suggestions, setSuggestions] = useState<Vendor[]>([]);
  
  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (id) {
      const found = StorageService.getPackageById(id);
      if (found) {
        setPkg(found);
        setSuggestions(StorageService.getSuggestions(found.occasionType));
      }
    }
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pkg && comment) {
      StorageService.addReview(pkg.id, {
        id: Date.now().toString(),
        userName: userName || 'ضيف',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      }, 'package');
      // Refresh
      const updated = StorageService.getPackageById(pkg.id);
      if (updated) setPkg(updated);
      setComment('');
      setUserName('');
      setRating(5);
    }
  };

  if (!pkg) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="pb-20">
      {/* 1) HEADER IMAGE */}
      <div className="relative h-72 md:h-96">
        <img src={pkg.heroImageUrl} className="w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <button onClick={() => navigate(-1)} className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full text-white hover:bg-white/30">
          <ArrowRight size={24} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
           <div className="max-w-6xl mx-auto">
             <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">
                {EVENT_TYPE_LABELS[pkg.occasionType]}
             </span>
             <h1 className="text-3xl md:text-5xl font-bold mb-2">{pkg.title}</h1>
             <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
               <span className="flex items-center gap-1"><MapPin size={16} /> {pkg.city}</span>
               <span className="flex items-center gap-1 text-amber-400"><Star size={16} fill="currentColor" /> {pkg.ratingAverage} ({pkg.ratingCount} تقييم)</span>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
           {/* 2) PACKAGE INFO */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h2 className="text-xl font-bold mb-4">تفاصيل الباقة</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{pkg.description}</p>
           </div>
           
           {/* 3) WHAT'S INCLUDED */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="text-primary" size={24} />
                ماذا تشمل الباقة؟
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pkg.includedServices.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                       <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* 4) IMAGE GALLERY */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h2 className="text-xl font-bold mb-4">معرض الصور</h2>
              {pkg.images.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {pkg.images.map((img, i) => (
                    <img key={i} src={img} className="w-64 h-48 object-cover rounded-2xl flex-shrink-0" alt="Gallery" />
                  ))}
                </div>
              ) : <p className="text-slate-400">لا توجد صور إضافية</p>}
           </div>

           {/* 7) AI SUGGESTIONS */}
           {suggestions.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-3xl border border-white shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="text-primary" size={24} />
                <h2 className="text-xl font-bold text-slate-800">اقتراحات ذكية للخدمات المرافقة</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {suggestions.map(vendor => (
                  <Link to={`/vendor/${vendor.id}`} key={vendor.id} className="flex-shrink-0 w-48 bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow block">
                    <img src={vendor.heroImageUrl} className="w-full h-24 object-cover rounded-xl mb-2" alt={vendor.name} />
                    <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{vendor.name}</h3>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">{CATEGORY_LABELS[vendor.category]}</span>
                  </Link>
                ))}
              </div>
            </div>
           )}

           {/* 9) REVIEWS */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold">التقييمات</h2>
                 <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star fill="currentColor" />
                    <span className="text-2xl text-slate-800">{pkg.ratingAverage}</span>
                    <span className="text-slate-400 text-sm font-normal">({pkg.ratingCount})</span>
                 </div>
              </div>

              <div className="space-y-4 mb-8">
                {pkg.reviews && pkg.reviews.length > 0 ? (
                  pkg.reviews.map(review => (
                    <div key={review.id} className="border-b border-slate-50 pb-4 last:border-0">
                       <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                               <User size={16} />
                             </div>
                             <span className="font-bold text-slate-700">{review.userName}</span>
                          </div>
                          <span className="text-xs text-slate-400">{review.date}</span>
                       </div>
                       <div className="flex items-center gap-1 text-amber-400 text-xs mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-200" : ""} />
                          ))}
                       </div>
                       <p className="text-slate-600 text-sm">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm">لا توجد تقييمات بعد.</p>
                )}
              </div>

              <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                 <h3 className="font-bold text-slate-700 mb-3">أضف تقييمك</h3>
                 <div className="flex gap-2 mb-3">
                   {[1, 2, 3, 4, 5].map(star => (
                     <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                       <Star size={24} className={star <= rating ? "text-amber-400 fill-current" : "text-slate-300"} />
                     </button>
                   ))}
                 </div>
                 <input 
                    type="text" 
                    placeholder="الاسم (اختياري)" 
                    value={userName} 
                    onChange={e => setUserName(e.target.value)}
                    className="w-full p-3 rounded-xl border-none mb-2 focus:ring-2 focus:ring-primary/20"
                 />
                 <textarea 
                    placeholder="اكتب تعليقك هنا..." 
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                    className="w-full p-3 rounded-xl border-none h-20 mb-3 focus:ring-2 focus:ring-primary/20"
                 ></textarea>
                 <button type="submit" className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-700">
                   إضافة تقييم
                 </button>
              </form>
           </div>
        </div>

        {/* 5 & 6) SIDEBAR: PRICE & CONTACT & LOCATION */}
        <div className="space-y-4">
           <div className="bg-white p-6 rounded-3xl shadow-soft sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-slate-50">
                 <p className="text-slate-500 text-sm font-bold mb-1">السعر يبدأ من</p>
                 <p className="text-4xl font-bold text-primary">{pkg.price} ₪</p>
                 <p className="text-xs text-slate-400 mt-2">شامل الضريبة والخدمة</p>
              </div>
              <div className="space-y-3">
                 <Link to={`/booking?package=${encodeURIComponent(pkg.title)}`} className="flex items-center justify-center gap-2 w-full py-4 gradient-bg text-white rounded-xl font-bold hover:shadow-lg transition-all shadow-glow">
                   <CalendarCheck size={20} /> احجز موعد للخدمة
                 </Link>
                 <button className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                   <MessageCircle size={20} /> تواصل عبر واتساب
                 </button>
                 <button className="flex items-center justify-center gap-2 w-full py-4 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                   <Phone size={20} /> اتصال
                 </button>
                 <button className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors">
                   <FileText size={20} /> طلب عرض سعر
                 </button>
                 
                 {/* 8) LOCATION */}
                 <a href={pkg.wazeUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#33ccff] text-white rounded-xl font-bold hover:opacity-90 transition-opacity mt-4">
                   <Navigation size={20} /> افتح في Waze
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
