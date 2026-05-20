import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { motion } from 'framer-motion';
import { translations } from '../../translations';

export default function ContactUs() {
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
    const t = translations[lang];
    
    // Fallback translations if not found in translations.js
    const contactText = {
        en: {
            title: "Get In Touch",
            subtitle: "We'd love to hear from you. Our team is always here to chat.",
            form: {
                name: "Your Name",
                email: "Email Address",
                subject: "Subject",
                message: "Message",
                submit: "Send Message",
            },
            info: {
                title: "Contact Information",
                desc: "Fill up the form and our team will get back to you within 24 hours.",
            }
        },
        ar: {
            title: "تواصل معنا",
            subtitle: "يسعدنا الاستماع إليك. فريقنا متواجد دائماً للرد على استفساراتك.",
            form: {
                name: "الاسم الكامل",
                email: "البريد الإلكتروني",
                subject: "الموضوع",
                message: "رسالتك",
                submit: "إرسال الرسالة",
            },
            info: {
                title: "معلومات التواصل",
                desc: "قم بتعبئة النموذج وسيقوم فريقنا بالرد عليك خلال 24 ساعة.",
            }
        }
    };

    const text = contactText[lang];

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-slate-50 min-h-screen font-mikhak-regular">
            <Head title={text.title}>
                <meta name="description" content={isRTL ? 'تواصل معنا في مناسبتك - يسعدنا الاستماع إليك والرد على استفساراتك.' : 'Contact Monasbtk - We would love to hear from you. Our team is always here to chat.'} />
            </Head>
            
            {/* Header Section */}
            <div className="bg-gradient-to-br from-primary via-shining to-secondary text-white pb-32 pt-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-shining rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto">
                    <Header lang={lang} toggleLanguage={toggleLanguage} />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mt-24 mb-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-mikhak-bold mb-6 tracking-tight">{text.title}</h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {text.subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 -mt-24 relative z-20">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    
                    {/* Contact Info Sidebar */}
                    <div className="lg:w-2/5 bg-gradient-to-b from-primary to-indigo-900 p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-shining opacity-20 blur-2xl"></div>
                        
                        <div className="relative z-10">
                            <h3 className="text-3xl font-mikhak-bold mb-4">{text.info.title}</h3>
                            <p className="text-white/80 mb-12 text-lg">{text.info.desc}</p>
                            
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-shining" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <span className="text-lg">{t.footer.email}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-shining" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    </div>
                                    <span className="text-lg" dir="ltr">{t.footer.phone}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-shining" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </div>
                                    <span className="text-lg">{t.footer.address}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Social Links Here if needed */}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-3/5 p-10 md:p-16">
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-mikhak-bold text-slate-700">{text.form.name}</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-mikhak-bold text-slate-700">{text.form.email}</label>
                                    <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-mikhak-bold text-slate-700">{text.form.subject}</label>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-mikhak-bold text-slate-700">{text.form.message}</label>
                                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"></textarea>
                            </div>

                            <button type="button" className="bg-primary hover:bg-indigo-700 text-white font-mikhak-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 w-full md:w-auto">
                                {text.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer lang={lang} />
        </div>
    );
}
