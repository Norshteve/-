
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

const { useNavigate } = ReactRouterDOM;

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
        <ArrowRight size={20} /> رجوع
      </button>

      <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
             <FileText size={24} />
           </div>
           <h1 className="text-3xl font-bold text-slate-800">شروط الخدمة</h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
           <p>أهلاً بك في منصة <strong>مناسباتكم</strong>. يرجى قراءة الشروط التالية بعناية قبل استخدام الموقع.</p>

           <h3 className="text-xl font-bold text-slate-800">1. قبول الشروط</h3>
           <p>بوصولك إلى هذا الموقع واستخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها.</p>

           <h3 className="text-xl font-bold text-slate-800">2. وصف الخدمة</h3>
           <p>توفر منصة مناسباتكم أدوات لتخطيط المناسبات، وحجز الخدمات، وإرسال الدعوات الإلكترونية. نحن نعمل كوسيط بين المستخدمين ومزودي الخدمات.</p>

           <h3 className="text-xl font-bold text-slate-800">3. حسابات المستخدمين</h3>
           <p>أنت مسؤول عن الحفاظ على سرية حسابك وكلمة المرور الخاصة بك. تحتفظ المنصة بالحق في إيقاف أي حساب ينتهك سياسات الاستخدام.</p>

           <h3 className="text-xl font-bold text-slate-800">4. الحجوزات والمدفوعات</h3>
           <p>جميع الاتفاقيات المالية تتم مباشرة بين العميل ومزود الخدمة. منصة مناسباتكم ليست طرفاً في المعاملات المالية المباشرة ولا تتحمل مسؤولية أي نزاع مالي.</p>

           <h3 className="text-xl font-bold text-slate-800">5. المحتوى</h3>
           <p>يمنع نشر أي محتوى مسيء أو غير قانوني أو ينتهك حقوق الملكية الفكرية للآخرين.</p>

           <h3 className="text-xl font-bold text-slate-800">6. التعديلات</h3>
           <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر التغييرات في هذه الصفحة.</p>
           
           <div className="pt-8 text-sm text-slate-400">
             آخر تحديث: 24/05/2024
           </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
