
import React, { useState, useEffect, useRef } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Menu, Home, Search, Bell, X, User, Moon, Sun, Globe, LogIn, LogOut, FileText, Shield, ShieldAlert, CheckCheck, Send, Calendar, Tag, MessageSquare, Info, ArrowLeft, Settings } from 'lucide-react';
import Logo from './Logo';
import { AuthService } from '../services/auth';
import { UserRole, NotificationItem } from '../types';
import { NotificationService } from '../services/notification';

const { Link, useLocation, useNavigate } = ReactRouterDOM;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;
  
  // Drawer & Theme State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  
  // --- NOTIFICATION SYSTEM STATE ---
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [newNotifText, setNewNotifText] = useState('');
  
  // Refs for click outside detection
  const notifButtonRef = useRef<HTMLButtonElement>(null);
  const notifPanelRef = useRef<HTMLDivElement>(null);

  // Initial Load & Route Change Listener
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    refreshNotifications();
  }, [location]);

  // Click Outside Listener to close panel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifPanelRef.current && 
        !notifPanelRef.current.contains(event.target as Node) &&
        notifButtonRef.current &&
        !notifButtonRef.current.contains(event.target as Node)
      ) {
        setShowNotifPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // -- Notification Logic Helpers --
  const refreshNotifications = () => {
    setNotifications(NotificationService.getNotifications());
    setUnreadCount(NotificationService.getUnreadCount());
  };

  const handleToggleNotif = () => {
    if (!showNotifPanel) {
      refreshNotifications();
    }
    setShowNotifPanel(!showNotifPanel);
  };

  const handleAddDemoNotif = () => {
    if (!newNotifText.trim()) return;
    NotificationService.addSimple(newNotifText); // Add to storage
    setNewNotifText('');
    refreshNotifications(); // Update UI
  };

  const handleMarkRead = (id: string) => {
    NotificationService.markAsRead(id);
    refreshNotifications();
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead();
    refreshNotifications();
  };

  const getNotifIcon = (kind: string) => {
    switch(kind) {
      case 'offer': return <Tag size={16} className="text-purple-500" />;
      case 'message': return <MessageSquare size={16} className="text-blue-500" />;
      case 'booking': return <Calendar size={16} className="text-green-500" />;
      default: return <Info size={16} className="text-slate-500" />;
    }
  };

  // -- Theme & Language --
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  const toggleLanguage = () => {
    const currentLang = new URLSearchParams(window.location.search).get('lang');
    const newLang = currentLang === 'he' ? 'ar' : 'he';
    window.location.search = `?lang=${newLang}`;
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4FC] text-slate-800 font-sans transition-colors duration-300 dark:bg-slate-900 dark:text-slate-100" dir="rtl">
      
      {/* ================= GLOBAL HEADER ================= */}
      <header className="bg-white shadow-soft h-[70px] sticky top-0 z-40 px-4 flex items-center justify-between dark:bg-slate-800 dark:border-b dark:border-slate-700">
        
        {/* Right Side (Logo) */}
        <Link to="/" className="flex items-center gap-2">
           <Logo className="h-10" />
        </Link>
        
        {/* Left Side (Actions) */}
        <div className="flex items-center gap-2">
          
          {/* NOTIFICATION BELL & DROPDOWN */}
          <div className="relative">
            <button 
              ref={notifButtonRef}
              onClick={handleToggleNotif}
              className={`p-2 rounded-full transition-colors relative ${showNotifPanel ? 'bg-purple-50 text-primary' : 'text-slate-600 hover:text-primary dark:text-slate-200'}`}
            >
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* THE DROPDOWN PANEL */}
            {showNotifPanel && (
              <div 
                ref={notifPanelRef}
                className="absolute top-14 left-0 w-[320px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 transform origin-top-left animate-[fadeIn_0.2s_ease-out] dark:bg-slate-800 dark:border-slate-700"
              >
                {/* Panel Header */}
                <div className="p-4 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center dark:bg-slate-700 dark:border-slate-600">
                   <h3 className="font-bold text-slate-800 text-sm dark:text-white flex items-center gap-2">
                     <Bell size={16} className="text-primary"/> الإشعارات
                   </h3>
                   <div className="flex gap-2">
                     <Link to="/notifications/settings" onClick={() => setShowNotifPanel(false)} className="text-slate-400 hover:text-primary transition-colors">
                        <Settings size={16} />
                     </Link>
                     <button onClick={handleMarkAllRead} className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                       <CheckCheck size={14} /> قراءة الكل
                     </button>
                   </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-[350px] overflow-y-auto p-2 space-y-1 custom-scrollbar bg-white dark:bg-slate-800">
                   {notifications.length === 0 ? (
                     <div className="text-center py-10 flex flex-col items-center gap-2 text-slate-400">
                       <Bell size={32} className="opacity-20" />
                       <span className="text-xs">لا توجد إشعارات جديدة</span>
                     </div>
                   ) : (
                     notifications.slice(0, 10).map(n => (
                       <div 
                         key={n.id} 
                         onClick={() => handleMarkRead(n.id)} 
                         className={`p-3 rounded-xl text-sm transition-all cursor-pointer relative group flex gap-3 ${
                           n.read 
                             ? 'bg-white hover:bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700' 
                             : 'bg-purple-50/50 hover:bg-purple-50 text-slate-800 dark:bg-slate-700 dark:text-white'
                         }`}
                       >
                          <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${n.read ? 'bg-slate-100' : 'bg-white shadow-sm'}`}>
                             {getNotifIcon(n.kind)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                               <p className={`font-bold text-sm ${!n.read ? 'text-primary' : ''}`}>{n.title}</p>
                               <span className="text-[10px] opacity-60 bg-slate-100 px-1.5 py-0.5 rounded dark:bg-slate-600 whitespace-nowrap">
                                 {new Date(n.createdAt).toLocaleTimeString('ar-EG', {hour:'2-digit', minute:'2-digit'})}
                               </span>
                            </div>
                            <p className="text-xs opacity-90 leading-relaxed line-clamp-2">{n.message}</p>
                          </div>
                          {!n.read && (
                            <div className="absolute top-1/2 -translate-y-1/2 left-2 w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                       </div>
                     ))
                   )}
                </div>
                
                {/* View All Button */}
                <div className="p-2 border-t border-slate-50 bg-white dark:bg-slate-800 dark:border-slate-600">
                   <Link 
                     to="/notifications" 
                     onClick={() => setShowNotifPanel(false)}
                     className="block w-full py-2 text-center text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-1 dark:text-slate-300 dark:hover:bg-slate-700"
                   >
                      عرض جميع الإشعارات <ArrowLeft size={12} />
                   </Link>
                </div>

                {/* DEMO ADD BOX (For Testing) */}
                <div className="p-3 border-t border-slate-50 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
                   <div className="flex gap-2">
                     <input 
                       value={newNotifText}
                       onChange={(e) => setNewNotifText(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleAddDemoNotif()}
                       placeholder="اكتب إشعار جديد للتجربة..." 
                       className="flex-1 text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                     />
                     <button onClick={handleAddDemoNotif} className="bg-primary text-white p-2.5 rounded-lg hover:bg-primary/90 active:scale-95 transition-all shadow-sm">
                       <Send size={14} />
                     </button>
                   </div>
                </div>
              </div>
            )}
          </div>

          {/* MENU TOGGLE */}
          <button onClick={() => setIsMenuOpen(true)} className="p-2 text-slate-600 hover:text-primary transition-colors dark:text-slate-200">
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* ================= SIDE MENU DRAWER ================= */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
      
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out dark:bg-slate-800 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col overflow-y-auto">
          
          <div className="flex justify-between items-center mb-8">
             <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:text-red-500 transition-colors dark:bg-slate-700 dark:text-slate-300">
               <X size={20} />
             </button>
          </div>

          {/* AVATAR SECTION */}
          <div className="flex flex-col items-center mb-8">
             <div className="w-20 h-20 rounded-full bg-slate-100 border-4 border-white shadow-glow flex items-center justify-center text-slate-400 mb-3 overflow-hidden dark:bg-slate-700 dark:border-slate-600">
               <User size={40} />
             </div>
             {currentUser ? (
               <>
                 <h3 className="font-bold text-slate-800 text-lg dark:text-white">{currentUser.name}</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400">
                   {currentUser.role === UserRole.ADMIN ? 'مشرف عام' : 'مستخدم'}
                 </p>
               </>
             ) : (
               <>
                 <h3 className="font-bold text-slate-800 text-lg dark:text-white">ضيف</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400">زائر</p>
               </>
             )}
          </div>

          <div className="border-t border-slate-100 my-2 dark:border-slate-700"></div>

          <nav className="space-y-2 py-4">
             <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors dark:text-slate-200 dark:hover:bg-slate-700">
               <Home size={20} /> الرئيسية
             </Link>
             <Link to="/marketplace" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors dark:text-slate-200 dark:hover:bg-slate-700">
               <Search size={20} /> تصفح الخدمات
             </Link>
          </nav>

          <div className="border-t border-slate-100 my-4 dark:border-slate-700"></div>

          <div className="space-y-4">
             <h4 className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">الإعدادات</h4>
             
             <button onClick={toggleDarkMode} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors dark:text-slate-200 dark:hover:bg-slate-700">
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
                </div>
                <div className={`w-10 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-primary' : 'bg-slate-300'}`}>
                   <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-1' : 'right-1'}`}></div>
                </div>
             </button>

             <button onClick={toggleLanguage} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors dark:text-slate-200 dark:hover:bg-slate-700">
                <div className="flex items-center gap-3">
                  <Globe size={20} />
                  <span>اللغة / Language</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded dark:bg-slate-600 dark:text-slate-300">
                   <span>AR</span> / <span>HE</span>
                </div>
             </button>

             {currentUser ? (
               <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 font-bold transition-colors mt-2 dark:hover:bg-slate-700">
                  <LogOut size={20} />
                  <span>تسجيل خروج</span>
               </button>
             ) : (
               <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-primary font-bold transition-colors mt-2 dark:hover:bg-slate-700">
                  <LogIn size={20} />
                  <span>تسجيل الدخول</span>
               </Link>
             )}

             {/* ADMIN LINK */}
             {currentUser && currentUser.role === UserRole.ADMIN && (
               <Link to="/admin-munasabatkom" onClick={() => setIsMenuOpen(false)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-slate-700 font-bold transition-colors mt-2 dark:text-slate-200 dark:hover:bg-slate-700">
                  <ShieldAlert size={20} className="text-red-500" />
                  <span>لوحة الإدارة (Admin)</span>
               </Link>
             )}
          </div>

          <div className="border-t border-slate-100 my-4 dark:border-slate-700"></div>

          <div className="space-y-2">
             <h4 className="text-xs font-bold text-slate-400 px-3 uppercase tracking-wider">معلومات</h4>
             <Link to="/terms" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors text-sm dark:text-slate-300 dark:hover:bg-slate-700">
                <FileText size={18} /> شروط الخدمة
             </Link>
             <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 font-medium transition-colors text-sm dark:text-slate-300 dark:hover:bg-slate-700">
                <Shield size={18} /> سياسة الخصوصية
             </Link>
          </div>

          <div className="mt-auto pt-8 pb-4 text-center text-xs text-slate-400">
             <p>إصدار 5.0.0</p>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-grow pb-24 md:pb-12 transition-all">
        {children}
      </main>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white/90 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.05)] rounded-t-3xl z-40 px-6 flex items-center justify-between dark:bg-slate-800/90 dark:border-t dark:border-slate-700">
        
        <Link to="/" className={`flex flex-col items-center gap-1 ${isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
          <Home size={24} fill={isActive('/') ? 'currentColor' : 'none'} />
        </Link>
        
        <Link to="/marketplace" className={`flex flex-col items-center gap-1 ${isActive('/marketplace') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
          <Search size={24} />
        </Link>

        {/* Floating Action Button (Create) */}
        <Link to="/dashboard/create" className="relative -top-6 group">
          <div className="w-[62px] h-[62px] rounded-full gradient-bg shadow-glow flex items-center justify-center text-white transform transition-transform group-active:scale-95 border-4 border-[#F7F4FC] dark:border-slate-900">
             <Logo showText={false} variant="white" className="h-8 w-8" />
          </div>
        </Link>

        {/* Mobile Bell: Toggles the Panel via scroll-to-top trick or direct state if visible */}
        <button 
           onClick={() => { 
             window.scrollTo({ top: 0, behavior: 'smooth' }); 
             setTimeout(() => {
                setShowNotifPanel(true);
             }, 300);
           }}
           className={`relative flex flex-col items-center gap-1 ${showNotifPanel ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800 animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
          <User size={24} fill={isActive('/dashboard') ? 'currentColor' : 'none'} />
        </Link>
      </nav>

      {/* ================= DESKTOP FOOTER ================= */}
      <footer className="hidden md:block bg-white mt-12 py-8 text-center text-slate-500 text-sm dark:bg-slate-800 dark:text-slate-400">
        <div className="flex justify-center mb-4">
          <Logo className="h-8 grayscale opacity-70" />
        </div>
        <p>&copy; {new Date().getFullYear()} مناسباتكم. جميع الحقوق محفوظة.</p>
        <div className="flex gap-4 justify-center mt-4">
          <Link to="/terms" className="hover:text-primary">شروط الخدمة</Link>
          <Link to="/privacy" className="hover:text-primary">سياسة الخصوصية</Link>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
