
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, Lock, Mail, LogIn, AlertCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { AuthService } from '../services/auth';
import { UserRole } from '../types';

const { useNavigate, Link } = ReactRouterDOM;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Now calling the async Firebase login
      const result = await AuthService.login(email, password);

      if (result.success && result.user) {
        // Direct Check Logic
        if (result.user.email.toLowerCase() === 'rimx_1984@hotmail.com') {
          navigate('/admin-munasabatkom');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(result.error || 'فشل تسجيل الدخول');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-soft p-8 dark:bg-slate-800">
        <div className="text-center mb-8">
           <div className="flex justify-center mb-4">
             <Logo className="h-12" />
           </div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">تسجيل الدخول</h1>
           <p className="text-slate-500 mt-2 dark:text-slate-400">مرحباً بك مجدداً في مناسباتكم</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm font-bold flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2 dark:text-slate-300">البريد الإلكتروني</label>
             <div className="relative">
               <input 
                 type="email" 
                 required 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 pl-12 dark:bg-slate-700 dark:text-white"
                 placeholder="your@email.com" 
               />
               <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
             </div>
           </div>

           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2 dark:text-slate-300">كلمة المرور</label>
             <div className="relative">
               <input 
                 type="password" 
                 required 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20 pl-12 dark:bg-slate-700 dark:text-white"
                 placeholder="••••••••" 
               />
               <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
             </div>
           </div>

           <div className="flex items-center justify-between text-sm">
             <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
               <input type="checkbox" className="rounded text-primary focus:ring-primary" />
               <span>تذكرني</span>
             </label>
             <a href="#" className="text-primary font-bold hover:underline">نسيت كلمة المرور؟</a>
           </div>

           <button 
             type="submit" 
             disabled={loading}
             className="w-full py-4 gradient-bg text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
           >
             {loading ? 'جاري التحقق...' : (
               <>
                 <LogIn size={20} /> تسجيل الدخول
               </>
             )}
           </button>
        </form>

        <div className="mt-8 text-center border-t border-slate-50 pt-6 dark:border-slate-700">
          <p className="text-slate-600 dark:text-slate-400">
            ليس لديك حساب؟ <Link to="/signup" className="text-primary font-bold hover:underline">إنشاء حساب جديد</Link>
          </p>
        </div>
      </div>
      
      <button onClick={() => navigate('/')} className="mt-8 text-slate-500 hover:text-primary font-bold flex items-center gap-2">
         <ArrowRight size={20} /> العودة للرئيسية
      </button>
    </div>
  );
};

export default Login;
