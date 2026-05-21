import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import axios from 'axios';
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

    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({
        loading: false,
        success: '',
        error: '',
    });

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
    }, [lang]);

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    const isRTL = lang === 'ar';
    const t = translations[lang];

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
                sending: "Sending..."
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
                sending: "جاري الإرسال..."
            },
            info: {
                title: "معلومات التواصل",
                desc: "قم بتعبئة النموذج وسيقوم فريقنا بالرد عليك خلال 24 ساعة.",
            }
        }
    };

    const text = contactText[lang];

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setStatus({
            loading: true,
            success: '',
            error: '',
        });

        setErrors({});

        try {
            const response = await axios.post('/contact/send', form, {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            setStatus({
                loading: false,
                success: response.data.message || (isRTL ? 'تم إرسال رسالتك بنجاح' : 'Message sent successfully'),
                error: '',
            });

            setForm({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
                setStatus({
                    loading: false,
                    success: '',
                    error: isRTL ? 'يرجى تصحيح الحقول المطلوبة' : 'Please fix the required fields',
                });
            } else {
                setStatus({
                    loading: false,
                    success: '',
                    error: error.response?.data?.message || (isRTL ? 'حدث خطأ أثناء الإرسال' : 'Failed to send message'),
                });
            }
        }
    };

    const inputClass =
        "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-slate-50 min-h-screen font-mikhak-regular">
            <Head title={text.title} />

            <div className="bg-gradient-to-br from-primary via-shining to-secondary text-white pb-32 pt-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto">
                    <Header lang={lang} toggleLanguage={toggleLanguage} />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mt-24 mb-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-mikhak-bold mb-6 tracking-tight">
                            {text.title}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                            {text.subtitle}
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-16 -mt-24 relative z-20">
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    <div className="lg:w-2/5 bg-gradient-to-b from-primary to-indigo-900 p-10 md:p-16 text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="relative z-10">
                            <h3 className="text-3xl font-mikhak-bold mb-4">{text.info.title}</h3>
                            <p className="text-white/80 mb-12 text-lg">{text.info.desc}</p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="text-lg">{t.footer.email}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg" dir="ltr">{t.footer.phone}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg">{t.footer.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-3/5 p-10 md:p-16">
                        {status.success && (
                            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 text-green-700 px-4 py-3">
                                {status.success}
                            </div>
                        )}

                        {status.error && (
                            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3">
                                {status.error}
                            </div>
                        )}

                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-mikhak-bold text-slate-700">
                                        {text.form.name}
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                    {errors.name && <div className="text-red-600 text-sm">{errors.name[0] || errors.name}</div>}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-mikhak-bold text-slate-700">
                                        {text.form.email}
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className={inputClass}
                                        dir="ltr"
                                    />
                                    {errors.email && <div className="text-red-600 text-sm">{errors.email[0] || errors.email}</div>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-mikhak-bold text-slate-700">
                                    {text.form.subject}
                                </label>
                                <input
                                    id="subject"
                                    name="subject"
                                    type="text"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                                {errors.subject && <div className="text-red-600 text-sm">{errors.subject[0] || errors.subject}</div>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-mikhak-bold text-slate-700">
                                    {text.form.message}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={form.message}
                                    onChange={handleChange}
                                    className={`${inputClass} resize-none`}
                                />
                                {errors.message && <div className="text-red-600 text-sm">{errors.message[0] || errors.message}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={status.loading}
                                className="bg-primary hover:bg-indigo-700 text-white font-mikhak-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-1 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status.loading ? text.form.sending : text.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer lang={lang} />
        </div>
    );
}
