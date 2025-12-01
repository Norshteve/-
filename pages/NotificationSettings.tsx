
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, Bell, Volume2, Mail, Smartphone, Save } from 'lucide-react';
import { NotificationService } from '../services/notification';
import { NotificationSettings } from '../types';

const { useNavigate } = ReactRouterDOM;

const NotificationSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<NotificationSettings>(NotificationService.getSettings());
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    NotificationService.saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleSetting = (key: keyof NotificationSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
        <ArrowRight size={20} /> رجوع
      </button>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">إعدادات الإشعارات</h1>
          <p className="text-slate-500 text-sm">تحكم في طريقة وصول التنبيهات إليك</p>
        </div>
        <button 
          onClick={handleSave} 
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Save size={18} /> حفظ
        </button>
      </div>

      {saved && (
        <div className="bg-green-100 text-green-700 p-3 rounded-xl mb-6 text-sm font-bold text-center">
          تم حفظ الإعدادات بنجاح
        </div>
      )}

      <div className="space-y-4">
        
        {/* Master Switch */}
        <div className="bg-white p-5 rounded-2xl shadow-soft flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${settings.enabled ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                <Bell size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">تفعيل الإشعارات</h3>
                <p className="text-xs text-slate-500">استلام جميع التنبيهات</p>
              </div>
           </div>
           <button 
             onClick={() => toggleSetting('enabled')} 
             className={`w-14 h-8 rounded-full relative transition-colors ${settings.enabled ? 'bg-primary' : 'bg-slate-300'}`}
           >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow-sm ${settings.enabled ? 'left-1' : 'right-1'}`}></div>
           </button>
        </div>

        {/* Detailed Settings */}
        <div className={`space-y-4 transition-opacity duration-300 ${!settings.enabled ? 'opacity-50 pointer-events-none' : ''}`}>
          
          <div className="bg-white p-5 rounded-2xl shadow-soft">
             <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b border-slate-50">قنوات التنبيه</h3>
             
             {/* Push */}
             <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3 text-slate-700">
                  <Smartphone size={20} className="text-slate-400" />
                  <div>
                    <span className="block font-bold text-sm">إشعارات الهاتف (Push)</span>
                    <span className="block text-xs text-slate-400">تظهر على شاشة القفل</span>
                  </div>
                </div>
                <button onClick={() => toggleSetting('pushEnabled')} className={`w-10 h-6 rounded-full relative transition-colors ${settings.pushEnabled ? 'bg-green-500' : 'bg-slate-300'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.pushEnabled ? 'left-1' : 'right-1'}`}></div>
                </button>
             </div>

             {/* Sound */}
             <div className="flex items-center justify-between py-3 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-700">
                  <Volume2 size={20} className="text-slate-400" />
                  <div>
                    <span className="block font-bold text-sm">الأصوات</span>
                    <span className="block text-xs text-slate-400">تشغيل صوت عند وصول إشعار</span>
                  </div>
                </div>
                <button onClick={() => toggleSetting('soundEnabled')} className={`w-10 h-6 rounded-full relative transition-colors ${settings.soundEnabled ? 'bg-green-500' : 'bg-slate-300'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.soundEnabled ? 'left-1' : 'right-1'}`}></div>
                </button>
             </div>

             {/* Email */}
             <div className="flex items-center justify-between py-3 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-700">
                  <Mail size={20} className="text-slate-400" />
                  <div>
                    <span className="block font-bold text-sm">البريد الإلكتروني</span>
                    <span className="block text-xs text-slate-400">ملخص يومي عبر الإيميل</span>
                  </div>
                </div>
                <button onClick={() => toggleSetting('emailEnabled')} className={`w-10 h-6 rounded-full relative transition-colors ${settings.emailEnabled ? 'bg-green-500' : 'bg-slate-300'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.emailEnabled ? 'left-1' : 'right-1'}`}></div>
                </button>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NotificationSettingsPage;
