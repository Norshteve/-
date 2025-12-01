
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MapPin, Phone, MessageCircle, Navigation, Star, ArrowRight, User } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Vendor } from '../types';
import { CATEGORY_LABELS } from '../constants';

const { useParams, useNavigate } = ReactRouterDOM;

const VendorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  
  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (id) {
      const all = StorageService.getVendors();
      setVendor(all.find(v => v.id === id) || null);
    }
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vendor && comment) {
      StorageService.addReview(vendor.id, {
        id: Date.now().toString(),
        userName: userName || 'ضيف',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      }, 'vendor');
      // Refresh vendor data
      const updated = StorageService.getVendorById(vendor.id);
      if (updated) setVendor(updated);
      setComment('');
      setUserName('');
      setRating(5);
    }
  };

  if (!vendor) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="pb-20">
      <div className="relative h-72 md:h-96">
        <img src={vendor.heroImageUrl} className="w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <button onClick={() => navigate(-1)} className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full text-white hover:bg-white/30">
          <ArrowRight size={24} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
           <div className="max-w-6xl mx-auto">
             <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">{CATEGORY_LABELS[vendor.category]}</span>
             <h1 className="text-3xl md:text-5xl font-bold mb-2">{vendor.name}</h1>
             <div className="flex items-center gap-4 text-sm md:text-base opacity-90">
               <span className="flex items-center gap-1"><MapPin size={16} /> {vendor.city}</span>
               <span className="flex items-center gap-1 text-amber-400"><Star size={16} fill="currentColor" /> {vendor.ratingAverage} ({vendor.ratingCount} تقييم)</span>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h2 className="text-xl font-bold mb-4">الوصف</h2>
              <p className="text-slate-600 leading-relaxed">{vendor.description}</p>
           </div>
           
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h2 className="text-xl font-bold mb-4">معرض الصور</h2>
              {vendor.galleryImages.length > 0 ? (
                <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                  {vendor.galleryImages.map((img, i) => (
                    <img key={i} src={img} className="w-64 h-48 object-cover rounded-2xl flex-shrink-0" alt="Gallery" />
                  ))}
                </div>
              ) : <p className="text-slate-400">لا توجد صور إضافية</p>}
           </div>

           {/* REVIEWS SECTION */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-xl font-bold">التقييمات</h2>
                 <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star fill="currentColor" />
                    <span className="text-2xl text-slate-800">{vendor.ratingAverage}</span>
                    <span className="text-slate-400 text-sm font-normal">({vendor.ratingCount})</span>
                 </div>
              </div>

              {/* List */}
              <div className="space-y-4 mb-8">
                {vendor.reviews && vendor.reviews.length > 0 ? (
                  vendor.reviews.map(review => (
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
                  <p className="text-slate-500 text-sm">لا توجد تقييمات بعد. كن أول من يقيم!</p>
                )}
              </div>

              {/* Add Review Form */}
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

        <div className="space-y-4">
           <div className="bg-white p-6 rounded-3xl shadow-soft sticky top-24">
              <div className="text-center mb-6 pb-6 border-b border-slate-50">
                 <p className="text-slate-500 text-sm">تبدأ الأسعار من</p>
                 <p className="text-3xl font-bold text-primary">{vendor.minPrice} ₪</p>
              </div>
              <div className="space-y-3">
                 <a href={`https://wa.me/${vendor.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90">
                   <MessageCircle size={20} /> تواصل عبر واتساب
                 </a>
                 <a href={`tel:${vendor.phone}`} className="flex items-center justify-center gap-2 w-full py-4 bg-slate-100 text-slate-800 rounded-xl font-bold hover:bg-slate-200">
                   <Phone size={20} /> اتصال هاتفي
                 </a>
                 <a href={vendor.wazeUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#33ccff] text-white rounded-xl font-bold hover:opacity-90">
                   <Navigation size={20} /> افتح في Waze
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
