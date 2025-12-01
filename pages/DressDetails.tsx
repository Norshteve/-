
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MapPin, MessageCircle, ArrowRight, User, Star } from 'lucide-react';
import { StorageService } from '../services/storage';
import { Dress } from '../types';
import { REGION_LABELS } from '../constants';

const { useParams, useNavigate } = ReactRouterDOM;

const DressDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dress, setDress] = useState<Dress | null>(null);

  // Review State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (id) {
      setDress(StorageService.getDressById(id) || null);
    }
  }, [id]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dress && comment) {
      StorageService.addReview(dress.id, {
        id: Date.now().toString(),
        userName: userName || 'ضيف',
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
      }, 'dress');
      setDress(StorageService.getDressById(dress.id) || null);
      setComment('');
      setUserName('');
    }
  };

  if (!dress) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="pb-20 max-w-6xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
        <ArrowRight size={20} /> رجوع
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="h-[500px] rounded-3xl overflow-hidden shadow-soft">
          <img src={dress.mainImageUrl} alt={dress.title} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-soft">
             <div className="flex gap-2 mb-4">
                {dress.forSale && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">للبيع</span>}
                {dress.forRent && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">للإيجار</span>}
             </div>
             <h1 className="text-3xl font-bold text-slate-800 mb-2">{dress.title}</h1>
             <p className="text-slate-500 flex items-center gap-1 mb-4">
               <MapPin size={16} /> {dress.city}, {REGION_LABELS[dress.region]}
             </p>
             <div className="flex items-end gap-2 mb-6">
               <span className="text-4xl font-bold text-primary">{dress.forSale ? dress.priceSale : dress.priceRent} ₪</span>
               <span className="text-slate-400 mb-1">{dress.forRent ? '/ يوم' : ''}</span>
             </div>
             <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-6">
               <div className="bg-slate-50 p-3 rounded-xl"><span className="font-bold block text-slate-800">المقاس</span>{dress.size}</div>
               <div className="bg-slate-50 p-3 rounded-xl"><span className="font-bold block text-slate-800">اللون</span>{dress.color}</div>
             </div>
             <p className="text-slate-600 leading-relaxed">{dress.description}</p>
          </div>

          <a href={`https://wa.me/`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white rounded-xl font-bold hover:opacity-90 shadow-soft">
             <MessageCircle size={24} /> تواصل مع البائع
          </a>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="bg-white p-6 rounded-3xl shadow-soft">
         <h2 className="text-xl font-bold mb-6">التقييمات</h2>
         <div className="space-y-4 mb-8">
            {dress.reviews && dress.reviews.length > 0 ? (
              dress.reviews.map(review => (
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
              <p className="text-slate-500 text-sm">لا توجد تقييمات لهذا الفستان.</p>
            )}
         </div>

         {/* Add Review Form */}
         <form onSubmit={handleReviewSubmit} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-2xl">
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
  );
};

export default DressDetails;
