
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Plus, Calendar, Clock, MapPin, Users, Edit, LogOut, PlusCircle, Settings } from 'lucide-react';
import { StorageService } from '../services/storage';
import { EventModel, EventType } from '../types';
import { EVENT_TYPE_LABELS } from '../constants';

const { Link, useNavigate } = ReactRouterDOM;

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState<EventModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = StorageService.getEvents();
    setEvents(data);
  }, []);

  const getStats = (event: EventModel) => {
    const yes = event.attendees.filter(r => r.status === 'yes').reduce((acc, curr) => acc + curr.count, 0);
    const maybe = event.attendees.filter(r => r.status === 'maybe').length;
    const no = event.attendees.filter(r => r.status === 'no').length;
    return { yes, maybe, no };
  };

  const handleLogout = () => {
    if(window.confirm('هل أنت متأكد من تسجيل الخروج؟')) {
      navigate('/');
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">لوحة التحكم</h1>
          <p className="text-slate-500 mt-1">أهلاً بك، محمد</p>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center md:justify-end">
          <button 
            onClick={() => alert("قريباً: صفحة إضافة خدمة أو منتج جديد للسوق")}
            className="bg-accent text-white px-5 py-2.5 rounded-full font-bold shadow-sm hover:bg-accent/90 flex items-center gap-2 transition-transform hover:scale-105"
          >
            <PlusCircle size={20} />
            <span>أضف إعلان خدمة</span>
          </button>

          <Link to="/dashboard/create" className="bg-primary text-white px-5 py-2.5 rounded-full font-bold shadow-sm hover:bg-primary/90 flex items-center gap-2 transition-transform hover:scale-105">
            <Plus size={20} />
            <span>مناسبة جديدة</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 flex items-center gap-2 transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden md:inline">خروج</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar / Quick Stats (Optional) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
             <h3 className="font-bold text-slate-700 mb-4">ملخص سريع</h3>
             <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-500">عدد المناسبات</span>
                <span className="font-bold">{events.length}</span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">إجمالي الحضور</span>
                <span className="font-bold">
                  {events.reduce((acc, curr) => acc + curr.attendees.filter(r => r.status === 'yes').reduce((sum, r) => sum + r.count, 0), 0)}
                </span>
             </div>
             <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
               <button className="w-full flex items-center justify-start gap-2 text-slate-600 hover:text-primary p-2 hover:bg-slate-50 rounded-lg">
                 <Settings size={18} />
                 <span>إعدادات الحساب</span>
               </button>
               <button onClick={handleLogout} className="w-full flex items-center justify-start gap-2 text-slate-600 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg">
                 <LogOut size={18} />
                 <span>تسجيل خروج</span>
               </button>
             </div>
          </div>
        </div>

        {/* Events List */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold text-slate-700 border-r-4 border-secondary pr-3 mb-6">مناسباتي القادمة</h2>
          
          {events.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-100">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 mb-4">ليس لديك مناسبات قادمة.</p>
              <Link to="/dashboard/create" className="text-primary font-bold hover:underline">أنشئ مناسبتك الأولى</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => {
                const stats = getStats(event);
                return (
                  <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-40 bg-slate-200 relative">
                      <img src={event.coverImageUrl} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold text-slate-800">
                        {EVENT_TYPE_LABELS[event.type]}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-800 mb-2">{event.title}</h3>
                      
                      <div className="space-y-2 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{event.city}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg mb-4">
                        <div className="text-center">
                          <span className="block text-xs text-slate-500">حضور</span>
                          <span className="font-bold text-green-600">{stats.yes}</span>
                        </div>
                        <div className="text-center border-x border-slate-200 px-4">
                          <span className="block text-xs text-slate-500">ربما</span>
                          <span className="font-bold text-amber-500">{stats.maybe}</span>
                        </div>
                        <div className="text-center">
                          <span className="block text-xs text-slate-500">اعتذر</span>
                          <span className="font-bold text-red-500">{stats.no}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/event/${event.id}`} className="flex-1 bg-primary text-white text-center py-2 rounded-lg text-sm hover:bg-primary/90 transition-colors">
                          عرض الدعوة
                        </Link>
                        <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
