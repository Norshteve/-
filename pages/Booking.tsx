
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, CheckCircle, Calendar, Clock } from 'lucide-react';
import { CATEGORY_LABELS } from '../constants';

const { useSearchParams, useNavigate } = ReactRouterDOM;

const Booking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('package') || '';
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceType: initialService,
    date: '',
    time: '',
    city: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-soft text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
             <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">تم إرسال طلبك بنجاح</h2>
          <p className="text-slate-600 mb-6">شكراً لك {formData.name}، سيتم التواصل معك قريباً لتأكيد الحجز.</p>
          <button onClick={() => navigate('/')} className="bg-slate-100 text-slate-700 font-bold py-3 px-8 rounded-xl hover:bg-slate-200">
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
        <ArrowRight size={20} /> رجوع
      </button>

      <div className="bg-white rounded-3xl shadow-soft p-6 md:p-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-50 pb-4">حجز موعد للخدمات</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
             <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
           </div>
           
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف</label>
             <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
           </div>

           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">نوع الخدمة / الباقة</label>
             <input type="text" value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="أدخل اسم الباقة أو اختر خدمة..." />
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">التاريخ</label>
               <div className="relative">
                 <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
                 <Calendar className="absolute left-4 top-4 text-slate-400 pointer-events-none" size={20} />
               </div>
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">الوقت</label>
               <div className="relative">
                 <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
                 <Clock className="absolute left-4 top-4 text-slate-400 pointer-events-none" size={20} />
               </div>
             </div>
           </div>

           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">المدينة</label>
             <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
           </div>

           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">ملاحظات إضافية</label>
             <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 h-32"></textarea>
           </div>

           <button type="submit" className="w-full py-4 gradient-bg text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow text-lg">
             تأكيد الحجز
           </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
