
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Bell, Check, Trash2, Settings, MessageSquare, Tag, Calendar, Info, ArrowRight, CheckCheck } from 'lucide-react';
import { NotificationService } from '../services/notification';
import { NotificationItem } from '../types';

const { Link, useNavigate } = ReactRouterDOM;

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setNotifications(NotificationService.getNotifications());
  };

  const handleMarkRead = (id: string) => {
    NotificationService.markAsRead(id);
    refreshData();
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead();
    refreshData();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإشعار؟')) {
      NotificationService.deleteNotification(id);
      refreshData();
    }
  };

  const getNotifIcon = (kind: string) => {
    switch(kind) {
      case 'offer': return <Tag size={20} className="text-purple-500" />;
      case 'message': return <MessageSquare size={20} className="text-blue-500" />;
      case 'booking': return <Calendar size={20} className="text-green-500" />;
      default: return <Info size={20} className="text-slate-500" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-slate-500 hover:text-primary font-bold text-sm mb-2">
             <ArrowRight size={16} /> رجوع
           </button>
           <h1 className="text-2xl font-bold text-slate-800">كل الإشعارات</h1>
        </div>
        <div className="flex gap-2">
           <button onClick={handleMarkAllRead} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
             <CheckCheck size={16} /> تحديد الكل كمقروء
           </button>
           <Link to="/notifications/settings" className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
             <Settings size={16} /> الإعدادات
           </Link>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-soft border border-slate-50">
            <Bell size={48} className="mx-auto mb-4 text-slate-200" />
            <h3 className="text-lg font-bold text-slate-700">لا توجد إشعارات</h3>
            <p className="text-slate-400">ستظهر التنبيهات هنا عندما تصلك</p>
          </div>
        ) : (
          notifications.map(n => (
            <div 
              key={n.id} 
              className={`relative p-5 rounded-2xl shadow-sm border border-slate-100 transition-all flex gap-4 ${
                n.read 
                  ? 'bg-white' 
                  : 'bg-white border-l-4 border-l-primary shadow-md'
              }`}
            >
              <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.read ? 'bg-slate-50' : 'bg-purple-50'}`}>
                  {getNotifIcon(n.kind)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={`text-base ${!n.read ? 'font-bold text-slate-800' : 'font-medium text-slate-600'}`}>
                      {n.title}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(n.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                </div>
                <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                  {n.message}
                </p>
                
                <div className="flex gap-4 text-xs">
                  {!n.read && (
                    <button onClick={() => handleMarkRead(n.id)} className="text-primary font-bold hover:underline flex items-center gap-1">
                      <Check size={12} /> تحديد كمقروء
                    </button>
                  )}
                  <button onClick={() => handleDelete(n.id)} className="text-red-500 font-bold hover:underline flex items-center gap-1">
                    <Trash2 size={12} /> حذف
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
