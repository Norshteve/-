
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { StorageService } from '../services/storage';
import { EventModel, EventType, Region, Vendor } from '../types';
import { CITIES, EVENT_TYPE_LABELS, REGION_LABELS, CATEGORY_LABELS } from '../constants';
import { Check, MapPin, Navigation, Image as ImageIcon, Calendar, Star, Sparkles } from 'lucide-react';

const { useNavigate, Link } = ReactRouterDOM;

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [suggestedVendors, setSuggestedVendors] = useState<Vendor[]>([]);

  const [formData, setFormData] = useState<Partial<EventModel>>({
    title: '',
    hostName: '',
    type: EventType.WEDDING,
    date: '',
    time: '',
    region: Region.NORTH,
    city: '',
    addressText: '',
    latitude: 31.25,
    longitude: 34.79,
    wazeUrl: '',
    description: '',
    templateType: 'luxury',
    coverImageUrl: 'https://images.unsplash.com/photo-1519225468359-2996bc01c083?auto=format&fit=crop&q=80&w=800',
    isPublic: true,
  });

  // Update suggestions when type changes
  useEffect(() => {
    if (formData.type) {
      setSuggestedVendors(StorageService.getSuggestions(formData.type).slice(0, 4));
    }
  }, [formData.type]);

  const generateWazeUrl = (lat: number, lng: number) => {
    return `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes`;
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      const newEvent: EventModel = {
        ...formData as EventModel,
        id: `e${Date.now()}`,
        ownerId: 'u1',
        wazeUrl: generateWazeUrl(formData.latitude || 0, formData.longitude || 0),
        attendees: [],
      };
      StorageService.saveEvent(newEvent);
      setLoading(false);
      navigate(`/event/${newEvent.id}`);
    }, 1500);
  };

  const updateLocation = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="flex justify-between mb-8 px-4">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= s ? 'bg-primary scale-125' : 'bg-slate-300'}`}></div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-soft overflow-hidden p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          {step === 1 && 'تفاصيل المناسبة'}
          {step === 2 && 'الموقع الجغرافي'}
          {step === 3 && 'تصميم الدعوة'}
          {step === 4 && 'مراجعة ونشر'}
        </h1>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700">عنوان المناسبة</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" placeholder="مثال: حفل زفاف أحمد وسارة" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">الداعي (المضيف)</label>
              <input type="text" value={formData.hostName} onChange={e => setFormData({...formData, hostName: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700">التاريخ</label>
                <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">الوقت</label>
                <input type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none" />
              </div>
            </div>
             <div>
              <label className="text-sm font-bold text-slate-700">نوع المناسبة</label>
              <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none">
                 {Object.entries(EVENT_TYPE_LABELS).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </div>

            {/* Smart Suggestions Block */}
            {formData.type && suggestedVendors.length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="text-primary" size={20} />
                  <h3 className="font-bold text-slate-800">اقتراحات جاهزة لمناسبتك</h3>
                </div>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                  {suggestedVendors.map(v => (
                    <Link to={`/vendor/${v.id}`} target="_blank" key={v.id} className="flex-shrink-0 w-32 bg-slate-50 rounded-xl p-2 border border-slate-100 hover:border-primary/30 transition-colors">
                      <img src={v.heroImageUrl} className="w-full h-20 object-cover rounded-lg mb-2" alt={v.name} />
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{v.name}</p>
                      <p className="text-[10px] text-slate-500">{CATEGORY_LABELS[v.category]}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700">المنطقة</label>
                <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value as any, city: ''})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none">
                  {Object.entries(REGION_LABELS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700">المدينة</label>
                <select value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none">
                  <option value="">اختر</option>
                  {formData.region && CITIES[formData.region].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">وصف العنوان</label>
              <input type="text" value={formData.addressText} onChange={e => setFormData({...formData, addressText: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none" placeholder="اسم القاعة أو الشارع" />
            </div>
            
            <div className="bg-slate-100 p-4 rounded-xl">
               <label className="text-sm font-bold text-slate-700 block mb-2">تحديد الموقع على الخريطة (تقريبي)</label>
               <div className="flex gap-2 mb-2">
                 <input type="number" placeholder="Lat" value={formData.latitude} onChange={e => updateLocation(Number(e.target.value), formData.longitude!)} className="w-1/2 p-2 rounded border" />
                 <input type="number" placeholder="Lng" value={formData.longitude} onChange={e => updateLocation(formData.latitude!, Number(e.target.value))} className="w-1/2 p-2 rounded border" />
               </div>
               <div className="h-40 bg-slate-200 rounded-lg flex items-center justify-center text-slate-500 text-sm">
                 <MapPin size={20} className="mr-2" />
                 خريطة تفاعلية (محاكاة)
               </div>
               <div className="mt-2 text-xs text-primary font-bold flex items-center">
                 <Navigation size={12} className="ml-1" />
                 سيتم إنشاء رابط Waze تلقائياً
               </div>
            </div>
          </div>
        )}

        {/* Step 3: Design */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
               <label className="text-sm font-bold text-slate-700">صورة الغلاف (رابط)</label>
               <input type="text" value={formData.coverImageUrl} onChange={e => setFormData({...formData, coverImageUrl: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none text-left" dir="ltr" />
            </div>
            {formData.coverImageUrl && (
               <div className="h-40 rounded-xl overflow-hidden shadow-sm">
                 <img src={formData.coverImageUrl} className="w-full h-full object-cover" alt="Preview" />
               </div>
            )}
            <div>
              <label className="text-sm font-bold text-slate-700">رسالة الدعوة</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full mt-2 p-3 bg-slate-50 rounded-xl border-none h-32" placeholder="اكتب تفاصيل إضافية..." />
            </div>
          </div>
        )}

        {/* Step 4: Publish */}
        {step === 4 && (
          <div className="text-center py-8">
             <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
               <Calendar size={40} />
             </div>
             <h2 className="text-xl font-bold mb-2">جاهز للنشر؟</h2>
             <p className="text-slate-500 mb-8">سيتم إنشاء رابط عام لدعوتك يمكنك مشاركته.</p>
             <button onClick={handleSubmit} disabled={loading} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:bg-primary/90 disabled:opacity-70">
               {loading ? 'جاري الإنشاء...' : 'نشر المناسبة الآن'}
             </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 && (
          <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
             {step > 1 && (
               <button onClick={() => setStep(step - 1)} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold">
                 سابق
               </button>
             )}
             <button onClick={() => setStep(step + 1)} className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-soft">
               التالي
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
