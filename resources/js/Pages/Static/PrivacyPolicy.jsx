import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('monasbtk_lang') || 'en';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
    }, [lang]);

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    const isRTL = lang === 'ar';

    const content = {
        en: {
            title: "Privacy Policy",
            subtitle: "Your privacy is important to us at Monasbtk. Please read how we handle your data.",
            lastUpdated: "Last Updated: May 2026",
            sections: [
                {
                    title: "1. Information We Collect",
                    text: "We collect information to provide better services to all our users. We may collect personal information such as your name, email address, phone number, and location when you register or use our app."
                },
                {
                    title: "2. How We Use Information",
                    text: "We use the information we collect from our services to provide, maintain, protect and improve them, to develop new ones, and to protect Monasbtk and our users."
                },
                {
                    title: "3. Information We Share",
                    text: "We do not share personal information with companies, organizations and individuals outside of Monasbtk unless one of the following circumstances applies: With your consent, for external processing, or for legal reasons."
                },
                {
                    title: "4. Information Security",
                    text: "We work hard to protect Monasbtk and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold."
                }
            ]
        },
        ar: {
            title: "سياسة الخصوصية",
            subtitle: "خصوصيتك مهمة جداً بالنسبة لنا في مناسبتك. يرجى قراءة كيفية تعاملنا مع بياناتك.",
            lastUpdated: "آخر تحديث: مايو 2026",
            sections: [
                {
                    title: "1. المعلومات التي نجمعها",
                    text: "نحن نجمع المعلومات لتقديم خدمات أفضل لجميع مستخدمينا. قد نجمع معلومات شخصية مثل اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وموقعك عند التسجيل أو استخدام تطبيقنا."
                },
                {
                    title: "2. كيف نستخدم المعلومات",
                    text: "نستخدم المعلومات التي نجمعها من خدماتنا لتوفيرها وصيانتها وحمايتها وتحسينها، لتطوير خدمات جديدة، وحماية مناسبتك ومستخدمينا."
                },
                {
                    title: "3. المعلومات التي نشاركها",
                    text: "لا نشارك المعلومات الشخصية مع الشركات والمنظمات والأفراد خارج مناسبتك إلا في إحدى الحالات التالية: بموافقتك، للمعالجة الخارجية، أو لأسباب قانونية."
                },
                {
                    title: "4. أمن المعلومات",
                    text: "نحن نعمل بجد لحماية مناسبتك ومستخدمينا من الوصول غير المصرح به أو التعديل غير المصرح به أو الكشف أو التدمير للمعلومات التي نحتفظ بها."
                }
            ]
        }
    };

    const t = content[lang];

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-slate-50 min-h-screen font-mikhak-regular">
            <Head title={t.title}>
                <meta name="description" content={isRTL ? 'سياسة الخصوصية لموقع مناسبتك - تعرف على كيفية تعاملنا مع بياناتك الشخصية.' : 'Monasbtk Privacy Policy - Learn how we handle your personal data.'} />
            </Head>
            
            {/* Header Section */}
            <div className="bg-gradient-to-br from-primary via-shining to-secondary text-white pb-20 pt-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-72 h-72 bg-shining rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <Header lang={lang} toggleLanguage={toggleLanguage} />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mt-20 mb-10"
                    >
                        <h1 className="text-4xl md:text-5xl font-mikhak-bold mb-4">{t.title}</h1>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto">{t.subtitle}</p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-16 -mt-16 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
                >
                    <p className="text-slate-400 text-sm mb-8 font-mikhak-medium">{t.lastUpdated}</p>
                    
                    <div className="space-y-10">
                        {t.sections.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-2xl font-mikhak-bold text-slate-800 mb-4">{section.title}</h2>
                                <p className="text-slate-600 leading-relaxed text-lg">{section.text}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <Footer lang={lang} />
        </div>
    );
}
