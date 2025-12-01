
import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
  ShieldAlert, Calendar, Users, Store, Shirt, Package, 
  BarChart3, MapPin, Star, Settings, ToggleLeft, ToggleRight, 
  ExternalLink, ArrowRight, List, LogOut 
} from 'lucide-react';
import { StorageService } from '../services/storage';
import { AuthService } from '../services/auth';
import { EventModel, Vendor, Dress, PackageModel, EventType, Region } from '../types';
import { EVENT_TYPE_LABELS, CATEGORY_LABELS, REGION_LABELS } from '../constants';

const { Link, useNavigate } = ReactRouterDOM;

interface SiteSettings {
  enable_bundles: boolean;
  enable_booking: boolean;
  enable_ai_suggestions: boolean;
  default_dark_mode: boolean;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // AUTH CHECK
  useEffect(() => {
    if (!AuthService.isAdmin()) {
      navigate('/login');
    }
  }, [navigate]);

  // Data State
  const [events, setEvents] = useState<EventModel[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [packages, setPackages] = useState<PackageModel[]>([]);
  
  // Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    enable_bundles: true,
    enable_booking: true,
    enable_ai_suggestions: true,
    default_dark_mode: false,
  });

  useEffect(() => {
    // Load Data
    setEvents(StorageService.getEvents());
    setVendors(StorageService.getVendors());
    setDresses(StorageService.getDresses());
    setPackages(StorageService.getAllPackages());

    // Load Settings
    const savedSettings = localStorage.getItem('site_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Toggle Handler
  const toggleSetting = (key: keyof SiteSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem('site_settings', JSON.stringify(newSettings));
  };

  // --- CALCULATIONS ---

  // 1. Global Stats
  const totalRsvpYes = events.reduce((sum, ev) => {
    return sum + (ev.attendees?.filter(a => a.status === 'yes').reduce((c, a) => c + a.count, 0) || 0);
  }, 0);

  // 2. Event Types Count
  const eventsByType = events.reduce((acc, ev) => {
    acc[ev.type] = (acc[ev.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 3. Regional Stats
  const getRegionCount = (r: Region) => {
    const eCount = events.filter(e => e.region === r).length;
    const vCount = vendors.filter(v => v.region === r).length;
    return { events: eCount, vendors: vCount };
  };

  const northStats = getRegionCount(Region.NORTH);
  const centerStats = getRegionCount(Region.CENTER);
  const southStats = getRegionCount(Region.SOUTH);

  // 4. Top Vendors (by rating)
  const topVendors = [...vendors].sort((a, b) => b.ratingAverage - a.ratingAverage).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F7F4FC] p-4 md:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="bg-white rounded-3xl p-8 shadow-soft border-l-8 border-primary relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <ShieldAlert className="text-red-500" size={24} />
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider">ADMIN ONLY</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">لوحة تحكم الإدارة – مناسباتكم</h1>
            <p className="text-slate-500 mt-2">هذه الصفحة خاصة بالإدارة ولا تظهر للمستخدمين.</p>
          </div>
          <div className="relative z-10">
             <button onClick={() => AuthService.logout()} className="flex items-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 px-5 py-3 rounded-xl font-bold transition-colors">
               <LogOut size={20} /> تسجيل خروج
             </button>
          </div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* SECTION 1: GLOBAL STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard icon={<Calendar />} label="عدد المناسبات" value={events.length} sub="إجمالي المناسبات" />
          <StatCard icon={<Users />} label="تأكيدات الحضور" value={totalRsvpYes} sub="عدد الضيوف" color="text-green-600" bg="bg-green-100" />
          <StatCard icon={<Store />} label="مزودي الخدمة" value={vendors.length} sub="في السوق" />
          <StatCard icon={<Shirt />} label="عدد الفساتين" value={dresses.length} sub="معروض للبيع/إيجار" />
          <StatCard icon={<Package />} label="الباقات الجاهزة" value={packages.length} sub="باقة متكاملة" />
          <StatCard icon={<List />} label="عدد الحجوزات" value={0} sub="طلبات جديدة" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SECTION 2: EVENTS OVERVIEW */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart3 className="text-primary" /> المناسبات حسب النوع
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {Object.entries(EVENT_TYPE_LABELS).map(([key, label]) => (
                  <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span className="block text-xs text-slate-500 mb-1">{label}</span>
                    <span className="block text-xl font-bold text-slate-800">{eventsByType[key] || 0}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-bold text-slate-700 mb-4 text-sm">أحدث المناسبات</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500">
                      <th className="pb-3 font-medium">اسم المناسبة</th>
                      <th className="pb-3 font-medium">النوع</th>
                      <th className="pb-3 font-medium">التاريخ</th>
                      <th className="pb-3 font-medium">المدينة</th>
                      <th className="pb-3 font-medium">الحضور</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {events.slice(0, 5).map(ev => {
                      const count = ev.attendees?.filter(a => a.status === 'yes').reduce((c, a) => c + a.count, 0) || 0;
                      return (
                        <tr key={ev.id}>
                          <td className="py-3 font-bold text-slate-700">{ev.title}</td>
                          <td className="py-3 text-slate-500">{EVENT_TYPE_LABELS[ev.type]}</td>
                          <td className="py-3 text-slate-500">{ev.date}</td>
                          <td className="py-3 text-slate-500">{ev.city}</td>
                          <td className="py-3 text-green-600 font-bold">{count}</td>
                        </tr>
                      );
                    })}
                    {events.length === 0 && (
                      <tr><td colSpan={5} className="py-4 text-center text-slate-400">لا توجد مناسبات مسجلة</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 4: TOP VENDORS */}
            <div className="bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Star className="text-amber-400" /> أفضل مزودي الخدمة
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500">
                      <th className="pb-3 font-medium">اسم المزود</th>
                      <th className="pb-3 font-medium">الفئة</th>
                      <th className="pb-3 font-medium">المدينة</th>
                      <th className="pb-3 font-medium">التقييم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {topVendors.map(v => (
                      <tr key={v.id}>
                        <td className="py-3 font-bold text-slate-700 flex items-center gap-2">
                          <img src={v.heroImageUrl} className="w-8 h-8 rounded-full object-cover" alt="" />
                          {v.name}
                        </td>
                        <td className="py-3 text-slate-500">{CATEGORY_LABELS[v.category]}</td>
                        <td className="py-3 text-slate-500">{v.city}</td>
                        <td className="py-3 text-amber-500 font-bold flex items-center gap-1">
                          {v.ratingAverage} <Star size={12} fill="currentColor" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* SECTION 3: REGIONAL STATS */}
            <div className="bg-white rounded-3xl shadow-soft p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MapPin className="text-secondary" /> توزيع النشاط
              </h2>
              <div className="space-y-4">
                <RegionStatRow region="الشمال" stats={northStats} color="bg-blue-500" />
                <RegionStatRow region="المركز" stats={centerStats} color="bg-purple-500" />
                <RegionStatRow region="الجنوب" stats={southStats} color="bg-pink-500" />
              </div>
            </div>

            {/* SECTION 5: RECENT BOOKINGS */}
            <div className="bg-white rounded-3xl shadow-soft p-6">
               <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <List className="text-primary" /> أحدث طلبات الحجز
              </h2>
              <div className="text-center py-8 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <p className="text-slate-400">لم يتم استلام طلبات حجز بعد.</p>
              </div>
            </div>

            {/* SECTION 6: CONTROL PANEL */}
            <div className="bg-white rounded-3xl shadow-soft p-6">
               <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Settings className="text-slate-600" /> إعدادات الموقع
              </h2>
              <div className="space-y-4">
                <ToggleRow 
                  label="تفعيل صفحة الباقات /bundles" 
                  checked={settings.enable_bundles} 
                  onChange={() => toggleSetting('enable_bundles')} 
                />
                <ToggleRow 
                  label="تفعيل نظام الحجز /booking" 
                  checked={settings.enable_booking} 
                  onChange={() => toggleSetting('enable_booking')} 
                />
                <ToggleRow 
                  label="تفعيل الاقتراحات الذكية" 
                  checked={settings.enable_ai_suggestions} 
                  onChange={() => toggleSetting('enable_ai_suggestions')} 
                />
                <ToggleRow 
                  label="تفعيل الوضع الليلي افتراضياً" 
                  checked={settings.default_dark_mode} 
                  onChange={() => toggleSetting('default_dark_mode')} 
                />
              </div>
              <p className="text-xs text-slate-400 mt-4 bg-yellow-50 p-2 rounded text-center border border-yellow-100">
                ملاحظة: هذه الإعدادات تحفظ محلياً ولا تؤثر على التصميم حالياً.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 7: QUICK LINKS */}
        <div className="bg-white rounded-3xl shadow-soft p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ExternalLink className="text-primary" /> روابط سريعة للإدارة
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/marketplace" target="_blank" className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-700 transition-colors">
               فتح صفحة السوق <ArrowRight size={16} />
            </Link>
            <Link to="/bundles" target="_blank" className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-700 transition-colors">
               فتح كل الباقات <ArrowRight size={16} />
            </Link>
            <button onClick={() => alert('الصفحة قيد الإنشاء')} className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-700 transition-colors">
               عرض جميع المناسبات <ArrowRight size={16} />
            </button>
            <Link to="/" className="flex items-center gap-2 px-5 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-700 transition-colors">
               الذهاب للرئيسية <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="text-center text-slate-400 text-xs pb-8">
           <p>هذه الصفحة خاصة بالإدارة، الرجاء عدم مشاركتها مع أي طرف آخر.</p>
           <p className="mt-1">لوحة تحكم مناسباتكم v1.0</p>
        </div>

      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: number, sub: string, color?: string, bg?: string }> = ({ 
  icon, label, value, sub, color = "text-primary", bg = "bg-primary/10" 
}) => (
  <div className="bg-white p-5 rounded-3xl shadow-soft border border-slate-50">
    <div className={`w-10 h-10 ${bg} ${color} rounded-full flex items-center justify-center mb-3`}>
      {React.cloneElement(icon as React.ReactElement<any>, { size: 20 })}
    </div>
    <div className="text-3xl font-bold text-slate-800 mb-1">{value}</div>
    <div className="font-bold text-slate-700 text-sm">{label}</div>
    <div className="text-xs text-slate-400 mt-1">{sub}</div>
  </div>
);

const RegionStatRow: React.FC<{ region: string, stats: { events: number, vendors: number }, color: string }> = ({ region, stats, color }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
    <div className="flex items-center gap-3">
       <div className={`w-2 h-8 rounded-full ${color}`}></div>
       <span className="font-bold text-slate-700">{region}</span>
    </div>
    <div className="flex gap-4 text-sm">
       <span className="text-slate-500"><strong className="text-slate-800">{stats.events}</strong> مناسبة</span>
       <span className="text-slate-500"><strong className="text-slate-800">{stats.vendors}</strong> مزود</span>
    </div>
  </div>
);

const ToggleRow: React.FC<{ label: string, checked: boolean, onChange: () => void }> = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between p-2">
    <span className="font-bold text-slate-700 text-sm">{label}</span>
    <button onClick={onChange} className={`transition-colors ${checked ? 'text-green-500' : 'text-slate-300'}`}>
      {checked ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
    </button>
  </div>
);

export default AdminDashboard;
