import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { motion } from 'framer-motion';
import { translations } from '../../translations';

export default function AboutUs() {
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
    const t = translations[lang].about;

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-slate-50 min-h-screen font-mikhak-regular">
            <Head title={t.title}>
                <meta name="description" content={isRTL ? 'تعرف على مناسبتك - شركة سعودية ناشئة متخصصة في تقديم حلول ذكية لتنظيم المناسبات والفعاليات.' : 'Learn about Monasbtk - A Saudi startup providing smart solutions for organizing events and occasions.'} />
            </Head>
            
            {/* Header Section */}
            <div className="bg-gradient-to-br from-primary via-shining to-secondary text-white pb-32 pt-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-shining rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <Header lang={lang} toggleLanguage={toggleLanguage} />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mt-24 mb-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-mikhak-bold mb-6 tracking-tight">{t.title}</h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            {lang === 'ar' ? 'نحن نصنع ذكريات لا تُنسى' : 'We create unforgettable memories'}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-4 py-16 -mt-24 relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-16 lg:p-20 overflow-hidden relative"
                >
                    {/* Decorative quotes */}
                    <div className="absolute top-10 right-10 opacity-5">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="space-y-8 text-lg md:text-xl text-slate-700 leading-loose font-mikhak-medium text-justify" style={{ textAlignLast: isRTL ? 'right' : 'left' }}>
                            {t.description.split('\n').map((paragraph, index) => (
                                <p key={index} className={index === 0 ? "text-2xl md:text-3xl text-indigo-900 font-mikhak-bold leading-normal mb-8" : ""}>
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>

                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100/50">
                                <div className="text-4xl font-mikhak-bold text-indigo-600 mb-2">2024</div>
                                <div className="text-slate-500 font-mikhak-medium">{lang === 'ar' ? 'سنة التأسيس' : 'Founded Year'}</div>
                            </div>
                            <div className="p-6 rounded-3xl bg-rose-50 border border-rose-100/50">
                                <div className="text-4xl font-mikhak-bold text-rose-600 mb-2">100+</div>
                                <div className="text-slate-500 font-mikhak-medium">{lang === 'ar' ? 'مزود خدمة' : 'Service Providers'}</div>
                            </div>
                            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100/50">
                                <div className="text-4xl font-mikhak-bold text-emerald-600 mb-2">1000+</div>
                                <div className="text-slate-500 font-mikhak-medium">{lang === 'ar' ? 'مناسبة سعيدة' : 'Happy Occasions'}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer lang={lang} />
        </div>
    );
}
