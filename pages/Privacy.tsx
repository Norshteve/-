
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const { useNavigate } = ReactRouterDOM;

const Privacy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
        <ArrowRight size={20} /> رجوع
      </button>

      <div className="bg-white rounded-3xl shadow-soft p-8 md:p-12">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
             <ShieldCheck size={24} />
           </div>
           <h1 className="text-3xl font-bold text-slate-800">سياسة الخصوصية</h1>
        </div>

        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
           <p>نحن في <strong>مناسباتكم</strong> نأخذ خصوصيتك على محمل الجد. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية.</p>

           <h3 className="text-xl font-bold text-slate-800">1. المعلومات التي نجمعها</h3>
           <ul className="list-disc list-inside space-y-2 mr-4">
             <li>المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف) عند التسجيل.</li>
             <li>تفاصيل المناسبات التي تقوم بإنشائها.</li>
             <li>بيانات الاستخدام وملفات تعريف الارتباط (Cookies) لتحسين تجربتك.</li>
           </ul>

           <h3 className="text-xl font-bold text-slate-800">2. كيفية استخدام المعلومات</h3>
           <p>نستخدم المعلومات لتقديم خدماتنا، تحسين الموقع، التواصل معك بخصوص حجوزاتك، وإرسال تحديثات هامة.</p>

           <h3 className="text-xl font-bold text-slate-800">3. مشاركة البيانات</h3>
           <p>لا نقوم ببيع بياناتك الشخصية لأطراف ثالثة. قد نشارك بعض البيانات الضرورية مع مزودي الخدمات الذين تختار حجز خدماتهم فقط لإتمام العملية.</p>

           <h3 className="text-xl font-bold text-slate-800">4. أمن البيانات</h3>
           <p>نستخدم تدابير أمنية متقدمة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفشاء.</p>

           <h3 className="text-xl font-bold text-slate-800">5. حقوقك</h3>
           <p>لديك الحق في طلب الوصول إلى بياناتك الشخصية، تصحيحها، أو حذفها في أي وقت عن طريق التواصل معنا.</p>
           
           <div className="pt-8 text-sm text-slate-400">
             آخر تحديث: 24/05/2024
           </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
