
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { StorageService } from '../services/storage';
import { EventModel, RSVP } from '../types';
import { Calendar, Clock, MapPin, Navigation, CheckCircle, Share2, Calendar as CalIcon, X, Users, MessageSquare } from 'lucide-react';
import { EVENT_TYPE_LABELS } from '../constants';
import Logo from '../components/Logo';

const { useParams, Link } = ReactRouterDOM;

const EventInvitation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventModel | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<'yes' | 'no' | 'maybe'>('yes');
  
  // Form State
  const [formName, setFormName] = useState('');
  const [formCount, setFormCount] = useState(1);
  const [formNotes, setFormNotes] = useState('');

  // Initial input on page (preserved for design integrity)
  const [initialNameInput, setInitialNameInput] = useState('');

  useEffect(() => {
    if (id) {
      const found = StorageService.getEventById(id);
      setEvent(found || null);
    }
  }, [id]);

  const openRsvpModal = (status: 'yes' | 'no' | 'maybe') => {
    setModalStatus(status);
    setFormName(initialNameInput); // Prefill if user typed in the main input
    setShowModal(true);
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (event && formName) {
      const newRsvp: RSVP = {
        id: Date.now().toString(),
        eventId: event.id,
        name: formName,
        status: modalStatus,
        count: formCount,
        notes: formNotes,
        timestamp: new Date().toISOString()
      };
      
      StorageService.addRSVP(event.id, newRsvp);
      setSubmitted(true);
      setShowModal(false);
    }
  };

  if (!event) return <div className="p-10 text-center">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-[#F7F4FC] pb-20 relative">
      {/* Branding Watermark */}
      <div className="absolute top-4 right-4 z-50">
        <Logo className="h-8" variant="white" showText={false} />
      </div>

      {/* Organizer Dashboard Link (Hidden/Secret or visible for demo) */}
      <div className="absolute top-4 left-4 z-50">
         <Link to={`/event/${event.id}/dashboard`} className="bg-white/20 backdrop-blur text-white px-3 py-1 rounded-full text-xs hover:bg-white/30 transition-colors">
           لوحة المنظم
         </Link>
      </div>

      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        {/* Cover */}
        <div className="relative h-72">
           <img src={event.coverImageUrl} className="w-full h-full object-cover rounded-b-[40px]" alt="Cover" />
           <div className="absolute inset-0 bg-black/30 rounded-b-[40px]"></div>
           <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white pb-8">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs mb-2">
                {EVENT_TYPE_LABELS[event.type]}
              </span>
              <h1 className="text-3xl font-bold mb-1">{event.title}</h1>
              <p className="text-sm opacity-90">بدعوة من {event.hostName}</p>
           </div>
        </div>

        {/* Content */}
        <div className="px-6 -mt-6 relative z-10">
           {/* Date & Time Card */}
           <div className="bg-white rounded-2xl shadow-soft p-4 flex justify-around items-center mb-6">
              <div className="text-center">
                 <div className="text-primary mb-1"><Calendar className="mx-auto" size={24} /></div>
                 <div className="font-bold text-slate-800">{event.date}</div>
              </div>
              <div className="w-[1px] h-10 bg-slate-100"></div>
              <div className="text-center">
                 <div className="text-primary mb-1"><Clock className="mx-auto" size={24} /></div>
                 <div className="font-bold text-slate-800">{event.time}</div>
              </div>
           </div>

           {/* Location */}
           <div className="text-center mb-8">
              <h3 className="text-lg font-bold text-slate-800 mb-2">الموقع</h3>
              <p className="text-slate-600 flex items-center justify-center gap-1 mb-3">
                <MapPin size={16} /> {event.addressText}, {event.city}
              </p>
              <a href={event.wazeUrl || `https://waze.com`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#33ccff] text-white px-6 py-2 rounded-full font-bold shadow-sm hover:shadow-md transition-shadow">
                <Navigation size={18} /> افتح في Waze
              </a>
           </div>

           {/* Description */}
           <div className="bg-slate-50 p-6 rounded-2xl text-center text-slate-600 leading-relaxed mb-8 border border-slate-100">
             "{event.description}"
           </div>

           {/* Add to Calendar */}
           <button className="w-full border border-slate-200 py-3 rounded-xl text-slate-600 font-bold flex items-center justify-center gap-2 mb-8 hover:bg-slate-50">
              <CalIcon size={20} /> أضف إلى التقويم
           </button>

           {/* RSVP Section */}
           <div className="mb-12">
             <h3 className="text-center font-bold text-xl mb-4 text-slate-800">تأكيد الحضور</h3>
             {!submitted ? (
               <div className="space-y-4">
                 <input 
                   type="text" 
                   placeholder="الاسم الكريم" 
                   value={initialNameInput}
                   onChange={e => setInitialNameInput(e.target.value)}
                   className="w-full p-4 bg-slate-50 rounded-xl border-none text-center font-medium focus:ring-2 focus:ring-primary/20"
                 />
                 <div className="flex gap-3">
                    <button onClick={() => openRsvpModal('yes')} className="flex-1 py-3 rounded-xl font-bold border border-slate-200 text-slate-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors">
                      سأحضر
                    </button>
                    <button onClick={() => openRsvpModal('maybe')} className="flex-1 py-3 rounded-xl font-bold border border-slate-200 text-slate-500 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-colors">
                      متردد
                    </button>
                    <button onClick={() => openRsvpModal('no')} className="flex-1 py-3 rounded-xl font-bold border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors">
                      اعتذر
                    </button>
                 </div>
                 <button disabled className="w-full gradient-bg text-white py-4 rounded-xl font-bold shadow-glow mt-2 opacity-50 cursor-not-allowed">
                   يرجى اختيار الحالة أعلاه
                 </button>
               </div>
             ) : (
               <div className="bg-green-50 p-6 rounded-2xl text-center border border-green-100">
                 <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                 <p className="font-bold text-green-700">شكراً لك، تم إرسال ردك.</p>
               </div>
             )}
           </div>
           
           <div className="text-center pb-8 opacity-50">
             <Logo className="h-6 mx-auto" showText={true} />
           </div>
        </div>
      </div>

      {/* RSVP POPUP MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800">
                {modalStatus === 'yes' && 'تأكيد الحضور'}
                {modalStatus === 'maybe' && 'تسجيل متردد'}
                {modalStatus === 'no' && 'تسجيل اعتذار'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmitRsvp} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">الاسم الكامل <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required 
                  value={formName} 
                  onChange={e => setFormName(e.target.value)} 
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {modalStatus !== 'no' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">عدد الأشخاص (شامل أنت)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="1" 
                      value={formCount} 
                      onChange={e => setFormCount(parseInt(e.target.value))} 
                      className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 pl-10"
                    />
                    <Users className="absolute left-3 top-3 text-slate-400" size={20} />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">ملاحظات إضافية (اختياري)</label>
                <div className="relative">
                  <textarea 
                    value={formNotes} 
                    onChange={e => setFormNotes(e.target.value)} 
                    className="w-full p-3 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 h-24 resize-none"
                    placeholder="هل لديك أي حساسية من طعام معين؟ أو استفسار؟"
                  ></textarea>
                  <MessageSquare className="absolute left-3 top-3 text-slate-400" size={20} />
                </div>
              </div>

              <button type="submit" className="w-full gradient-bg text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-shadow mt-4">
                إرسال الرد
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventInvitation;
