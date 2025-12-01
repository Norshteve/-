
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { StorageService } from '../services/storage';
import { EventModel, RSVP } from '../types';
import { Users, UserCheck, UserX, HelpCircle, Download, Send, Edit, ArrowRight, Bell, Share2 } from 'lucide-react';

const { useParams, Link } = ReactRouterDOM;

const EventDashboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventModel | null>(null);

  useEffect(() => {
    if (id) {
      // Poll storage every 2 seconds to simulate live updates
      const interval = setInterval(() => {
        const found = StorageService.getEventById(id);
        setEvent(found || null);
      }, 2000);
      
      // Initial load
      const found = StorageService.getEventById(id);
      setEvent(found || null);

      return () => clearInterval(interval);
    }
  }, [id]);

  if (!event) return <div className="p-10 text-center">جاري التحميل...</div>;

  // Calculate Stats
  const attendeesList = event.attendees || [];
  const yesCount = attendeesList.filter(r => r.status === 'yes').reduce((sum, r) => sum + r.count, 0);
  const noCount = attendeesList.filter(r => r.status === 'no').length; // usually count is 0 or 1 per entry for 'no'
  const maybeCount = attendeesList.filter(r => r.status === 'maybe').reduce((sum, r) => sum + r.count, 0);
  const totalResponses = attendeesList.length;

  const yesPercent = totalResponses ? Math.round((attendeesList.filter(r => r.status === 'yes').length / totalResponses) * 100) : 0;
  const noPercent = totalResponses ? Math.round((attendeesList.filter(r => r.status === 'no').length / totalResponses) * 100) : 0;
  const maybePercent = totalResponses ? Math.round((attendeesList.filter(r => r.status === 'maybe').length / totalResponses) * 100) : 0;

  // Derive Notifications (sorted by timestamp desc)
  const notifications = [...attendeesList].sort((a, b) => {
    const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
    const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
    return timeB - timeA;
  }).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <Link to={`/event/${event.id}`} className="flex items-center gap-1 text-slate-500 hover:text-primary mb-2 font-bold text-sm">
             <ArrowRight size={16} /> العودة للدعوة
           </Link>
           <h1 className="text-3xl font-bold text-slate-800">لوحة تحكم المنظم</h1>
           <p className="text-slate-500 mt-1">إدارة: {event.title}</p>
        </div>
        <div className="flex gap-2">
           <button onClick={() => alert("سيتم تفعيل هذه الميزة قريباً")} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold hover:bg-slate-50 flex items-center gap-2">
             <Download size={18} /> <span className="hidden sm:inline">تحميل CSV</span>
           </button>
           <button onClick={() => alert("سيتم تفعيل هذه الميزة قريباً")} className="bg-primary text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-primary/90 flex items-center gap-2">
             <Send size={18} /> <span className="hidden sm:inline">إرسال رسالة</span>
           </button>
        </div>
      </div>

      {/* 1) Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-soft border-b-4 border-green-500">
           <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 font-bold text-sm">عدد الحضور</p>
                <h3 className="text-4xl font-bold text-slate-800 mt-1">{yesCount}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <UserCheck size={24} />
              </div>
           </div>
           <p className="text-xs text-slate-400">تم تأكيد الحضور</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-soft border-b-4 border-red-400">
           <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 font-bold text-sm">عدد المعتذرين</p>
                <h3 className="text-4xl font-bold text-slate-800 mt-1">{noCount}</h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                <UserX size={24} />
              </div>
           </div>
           <p className="text-xs text-slate-400">لن يتمكنوا من الحضور</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-soft border-b-4 border-amber-400">
           <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-500 font-bold text-sm">متردد</p>
                <h3 className="text-4xl font-bold text-slate-800 mt-1">{maybeCount}</h3>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
                <HelpCircle size={24} />
              </div>
           </div>
           <p className="text-xs text-slate-400">لم يقرروا بعد</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Guest List & Progress */}
        <div className="lg:col-span-2 space-y-8">
           {/* 2) Progress Bar Section */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h3 className="font-bold text-slate-800 mb-4">نسب الردود</h3>
              <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex mb-2">
                 <div style={{ width: `${yesPercent}%` }} className="bg-green-500 h-full"></div>
                 <div style={{ width: `${maybePercent}%` }} className="bg-amber-400 h-full"></div>
                 <div style={{ width: `${noPercent}%` }} className="bg-red-400 h-full"></div>
              </div>
              <div className="flex gap-4 text-xs font-bold text-slate-500">
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> حضور ({yesPercent}%)</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div> متردد ({maybePercent}%)</div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> اعتذار ({noPercent}%)</div>
              </div>
           </div>

           {/* 3) Guest List */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                 <Users className="text-primary" size={20} /> قائمة المدعوين
              </h3>
              
              {attendeesList.length === 0 ? (
                <div className="text-center py-8 text-slate-400">لا توجد ردود حتى الآن</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 text-sm">
                        <th className="pb-3 pr-2">الاسم</th>
                        <th className="pb-3">الحالة</th>
                        <th className="pb-3">العدد</th>
                        <th className="pb-3">ملاحظات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {attendeesList.map((rsvp) => (
                        <tr key={rsvp.id} className="text-sm">
                          <td className="py-3 pr-2 font-bold text-slate-800">{rsvp.name}</td>
                          <td className="py-3">
                            {rsvp.status === 'yes' && <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">حضور</span>}
                            {rsvp.status === 'no' && <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">اعتذار</span>}
                            {rsvp.status === 'maybe' && <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">متردد</span>}
                          </td>
                          <td className="py-3 text-slate-600">{rsvp.count}</td>
                          <td className="py-3 text-slate-500 max-w-[150px] truncate">{rsvp.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
           </div>
        </div>

        {/* Sidebar: Notifications & Tools */}
        <div className="space-y-6">
           {/* 4) Notifications */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Bell className="text-secondary" size={20} /> إشعارات جديدة
              </h3>
              <div className="space-y-4">
                 {notifications.length === 0 ? (
                   <p className="text-slate-400 text-sm">لا توجد إشعارات جديدة</p>
                 ) : (
                   notifications.map(notif => (
                     <div key={notif.id} className="flex gap-3 items-start p-3 bg-slate-50 rounded-xl">
                        <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                          notif.status === 'yes' ? 'bg-green-500' : 
                          notif.status === 'no' ? 'bg-red-500' : 'bg-amber-400'
                        }`}></div>
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {notif.status === 'yes' ? `قام ${notif.name} بتأكيد الحضور` :
                             notif.status === 'no' ? `قام ${notif.name} بالاعتذار` :
                             `قام ${notif.name} بتسجيل متردد`}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {notif.timestamp ? new Date(notif.timestamp).toLocaleTimeString('ar-EG', {hour: '2-digit', minute:'2-digit'}) : 'الآن'}
                          </p>
                        </div>
                     </div>
                   ))
                 )}
              </div>
           </div>

           {/* 5) Tools Section */}
           <div className="bg-white p-6 rounded-3xl shadow-soft">
              <h3 className="font-bold text-slate-800 mb-4">أدوات سريعة</h3>
              <div className="space-y-3">
                 <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                    <span className="font-bold text-slate-700 text-sm">تحديث تفاصيل المناسبة</span>
                    <Edit size={18} className="text-slate-400 group-hover:text-primary" />
                 </button>
                 <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors group">
                    <span className="font-bold text-slate-700 text-sm">نسخ رابط الدعوة</span>
                    <Share2 size={18} className="text-slate-400 group-hover:text-primary" />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;
