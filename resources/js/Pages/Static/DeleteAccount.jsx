import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { motion } from 'framer-motion';

export default function DeleteAccount() {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('monasbtk_lang') || 'ar';
        }
        return 'ar';
    });

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        document.cookie = `monasbtk_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
    }, [lang]);

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    const isRTL = lang === 'ar';

    const content = {
        ar: {
            title: "حذف الحساب",
            subtitle: "دليل وسياسة حذف حساب العميل والبيانات المرتبطة به في منصة وتطبيق مناسبتك.",
            lastUpdated: "آخر تحديث: سبتمبر 2026",
            warningTitle: "تنبيه هام حول حذف الحساب",
            warningText: "يرجى العلم بأن إجراء حذف الحساب نهائي ولا يمكن التراجع عنه. بمجرد تأكيد الحذف، سيتم محو بياناتك الشخصية وإلغاء إمكانية الوصول إلى سجل طلباتك ونقاطك وكوبوناتك بشكل دائم.",
            stepsTitle: "خطوات حذف الحساب من داخل تطبيق الجوال",
            stepsIntro: "يمكن لعملاء تطبيق مناسبتك حذف الحساب مباشرة وبكل سهولة من خلال الخطوات التالية:",
            steps: [
                {
                    step: "1",
                    title: "تسجيل الدخول",
                    desc: "افتح تطبيق مناسبتك على هاتفك وتأكد من تسجيل الدخول إلى الحساب المراد حذفه."
                },
                {
                    step: "2",
                    title: "الذهاب إلى الإعدادات",
                    desc: "اضغط على أيقونة «الملف الشخصي» من الشريط السفلي، ثم اختر «الإعدادات» أو إدارة الحساب."
                },
                {
                    step: "3",
                    title: "اختيار حذف الحساب",
                    desc: "مرر إلى أسفل القائمة واضغط على خيار «حذف الحساب» (Delete Account)."
                },
                {
                    step: "4",
                    title: "مراجعة النتائج والتأكيد",
                    desc: "ستظهر لك شاشة توضيحية توضح الآثار المترتبة على الحذف؛ اضغط على زر «تأكيد حذف الحساب»."
                },
                {
                    step: "5",
                    title: "التحقق الأمني واكتمال الحذف",
                    desc: "أدخل رمز التحقق المرسل إليك عبر الواتساب أو الرسائل النصية لتأكيد هويتك، وسيتم حذف حسابك فوراً وتسجيل خروجك."
                }
            ],
            sections: [
                {
                    title: "1. البيانات التي يتم حذفها نهائياً",
                    text: "عند اكتمال عملية حذف الحساب، نقوم بإزالة وحذف البيانات التالية من خوادمنا النشطة:",
                    list: [
                        "بيانات الملف الشخصي (الاسم، البريد الإلكتروني، ورقم الجوال المسجل).",
                        "العناوين والمواقع الجغرافية المحفوظة (المنازل، القاعات، والاستراحات).",
                        "سجل المحادثات والمراسلات المباشرة مع مزودي الخدمات داخل التطبيق.",
                        "قوائم المفضلة، وسلات التسوق المحفوظة، وتفضيلات المناسبات.",
                        "أي نقاط ولاء أو كوبونات خصم غير مستخدمة (تسقط تلقائياً ولا يمكن تعويضها)."
                    ]
                },
                {
                    title: "2. شروط واجب مراعاتها قبل حذف الحساب",
                    text: "لضمان حماية حقوقك وحقوق مزودي الخدمات، تنطبق الشروط التالية قبل تنفيذ طلب الحذف:",
                    list: [
                        "الطلبات والحجوزات الجارية: لا يمكن إتمام حذف الحساب إذا كان لديك طلب أو حجز جارٍ لم يكتمل بعد. يجب إما الانتظار حتى تنفيذ المناسبة أو إلغاء الطلب وفق سياسة الإلغاء المعتمدة.",
                        "المعاملات المالية المعلقة: يجب تسوية أي مبالغ مستحقة أو مدفوعات قيد المراجعة قبل إغلاق الحساب.",
                        "نهائية الإجراء: بمجرد الحذف، لن تتمكن من استعادة أي بيانات أو سجلات سابقة، وسيتطلب استخدام التطبيق مستقبلاً إنشاء حساب جديد بالكامل."
                    ]
                },
                {
                    title: "3. البيانات المستثناة والمحتفظ بها لأغراض نظامية",
                    text: "وفقاً للأنظمة واللوائح السارية في المملكة العربية السعودية، قد تحتفظ منصة مناسبتك ببعض البيانات المالية والمحاسبية المحددة فقط:",
                    list: [
                        "سجلات المعاملات المالية والفواتير الإلكترونية المعتمدة: يتم الاحتفاظ بها للفترات المحددة نظاماً بموجب متطلبات هيئة الزكاة والضريبة والجمارك لأغراض المحاسبة والامتثال القانوني والتدقيق.",
                        "لا تُستخدم هذه السجلات المعزولة لأي أغراض تسويقية أو تشغيلية بعد حذف الحساب."
                    ]
                },
                {
                    title: "4. طريقة بديلة: طلب حذف الحساب عبر فريق الدعم",
                    text: "إذا واجهت صعوبة تقنية في الوصول إلى تطبيق الجوال أو فقدت وسيلة تسجيل الدخول، يمكنك تقديم طلب حذف يدوي باتباع الآتي:",
                    list: [
                        "إرسال رسالة بريد إلكتروني من بريدك المسجل إلى: info@monasbtk.com مع كتابة موضوع الرسالة: «طلب حذف حساب عميل».",
                        "تضمين رقم الجوال المرتبط بالحساب في نص الرسالة.",
                        "سيقوم فريق الدعم بالتحقق من ملكية الحساب وتنفيذ عملية الحذف خلال مدة أقصاها 48 ساعة عمل، مع إشعارك باكتمال الإجراء."
                    ]
                },
                {
                    title: "5. التواصل والاستفسارات",
                    text: "إذا كانت لديك أي استفسارات أو بحاجة لمساعدة تتعلق بحسابك أو خصوصية بياناتك، يسعدنا تواصلك مع فريق خدمة العملاء عبر:",
                    contactEmail: "info@monasbtk.com",
                    contactPhone: "+966 54 272 8123"
                }
            ]
        },
        en: {
            title: "Account Deletion",
            subtitle: "Guide and policy for deleting your customer account and associated data on the Monasbtk platform and mobile app.",
            lastUpdated: "Last Updated: September 2026",
            warningTitle: "Important Notice Regarding Account Deletion",
            warningText: "Please note that deleting your account is permanent and irreversible. Once confirmed, all your personal information, order history, loyalty points, and unused discount coupons will be permanently removed.",
            stepsTitle: "How to Delete Your Account via the Mobile App",
            stepsIntro: "Monasbtk app users can delete their accounts directly and easily by following these steps:",
            steps: [
                {
                    step: "1",
                    title: "Log In",
                    desc: "Open the Monasbtk app on your phone and ensure you are logged into the account you wish to delete."
                },
                {
                    step: "2",
                    title: "Go to Settings",
                    desc: "Tap the «Profile» icon in the bottom navigation bar, then select «Settings» or account management."
                },
                {
                    step: "3",
                    title: "Select Delete Account",
                    desc: "Scroll to the bottom of the options and tap «Delete Account»."
                },
                {
                    step: "4",
                    title: "Review & Confirm",
                    desc: "A confirmation screen will explain the consequences of deletion; tap «Confirm Account Deletion»."
                },
                {
                    step: "5",
                    title: "Security Verification & Completion",
                    desc: "Enter the verification code (OTP) sent to your phone to confirm your identity. Your account will be deleted immediately and you will be signed out."
                }
            ],
            sections: [
                {
                    title: "1. Data That Is Permanently Deleted",
                    text: "Upon completion of account deletion, we erase and purge the following data from our active systems:",
                    list: [
                        "Profile data (full name, email address, and registered phone number).",
                        "Saved geographic addresses and GPS pins (homes, halls, chalets).",
                        "Chat and direct messaging history with service providers in the app.",
                        "Saved favorites, cart items, and event preferences.",
                        "Any unused loyalty points or promotional discount coupons (forfeited immediately and non-refundable)."
                    ]
                },
                {
                    title: "2. Conditions Prior to Deletion",
                    text: "To protect both customer and vendor rights, the following conditions must be met prior to deletion:",
                    list: [
                        "Active Orders: You cannot delete your account if you have an active booking or order in progress. You must wait until the event is executed or cancel the order per our cancellation policy.",
                        "Pending Financial Matters: Any outstanding dues or pending refunds must be resolved before the account can be closed.",
                        "Irreversibility: Once deleted, previous orders, invoices, and saved details cannot be recovered. Future app usage requires a brand-new registration."
                    ]
                },
                {
                    title: "3. Data Retained for Legal & Regulatory Compliance",
                    text: "In compliance with applicable laws and regulations in the Kingdom of Saudi Arabia, Monasbtk retains only specific financial and accounting records:",
                    list: [
                        "Certified e-invoices and financial transaction records: Retained for the statutory periods mandated by ZATCA (Zakat, Tax and Customs Authority) for audit, legal compliance, and tax purposes.",
                        "These archived records are completely isolated and never used for marketing or commercial purposes after account deletion."
                    ]
                },
                {
                    title: "4. Alternative Method: Request Deletion via Support",
                    text: "If you experience technical issues accessing the app or cannot log in, you can request manual account deletion through our support team:",
                    list: [
                        "Send an email from your registered address to: info@monasbtk.com with the subject: «Customer Account Deletion Request».",
                        "Include your registered mobile number in the email body.",
                        "Our support team will verify your ownership and complete the deletion within 48 business hours, notifying you once completed."
                    ]
                },
                {
                    title: "5. Contact & Support",
                    text: "If you have any questions or need assistance regarding your account or data privacy, please contact our support team at:",
                    contactEmail: "info@monasbtk.com",
                    contactPhone: "+966 54 272 8123"
                }
            ]
        }
    };

    const t = content[lang];

    return (
        <div dir={isRTL ? 'rtl' : 'ltr'} className="bg-slate-50 min-h-screen font-mikhak-regular">
            <Head title={t.title}>
                <meta
                    name="description"
                    content={
                        isRTL
                            ? 'دليل وسياسة حذف حساب العميل في منصة وتطبيق مناسبتك - تعرف على خطوات حذف الحساب ومصير بياناتك الشخصية.'
                            : 'Monasbtk Customer Account Deletion Policy & Guide - Learn how to delete your account and what happens to your personal data.'
                    }
                />
            </Head>

            {/* Header Section (Exact matching visual language of PrivacyPolicy & Static Pages) */}
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
                        <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto px-4 py-16 -mt-16 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-slate-100"
                >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
                        <span className="text-slate-400 text-sm font-mikhak-medium">{t.lastUpdated}</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span>{isRTL ? 'تطبيق العميل' : 'Customer App'}</span>
                        </span>
                    </div>

                    {/* Warning Callout Box */}
                    <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-rose-800 font-mikhak-bold mb-1">
                                {t.warningTitle}
                            </h3>
                            <p className="text-sm text-rose-700/90 leading-relaxed font-mikhak-regular">
                                {t.warningText}
                            </p>
                        </div>
                    </div>

                    {/* Step-by-Step App Deletion Process */}
                    <div className="mb-12">
                        <h2 className="text-2xl font-mikhak-bold text-slate-800 mb-2">{t.stepsTitle}</h2>
                        <p className="text-slate-500 text-sm sm:text-base mb-6 font-mikhak-regular">{t.stepsIntro}</p>

                        <div className="grid grid-cols-1 gap-4">
                            {t.steps.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-start gap-4 hover:border-primary/20 transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm font-mikhak-bold">
                                        {item.step}
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-bold text-slate-800 mb-1 font-mikhak-bold">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-slate-600 leading-relaxed font-mikhak-regular">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detailed Policy Sections */}
                    <div className="space-y-10 border-t border-slate-100 pt-8">
                        {t.sections.map((section, index) => (
                            <div key={index} className="space-y-3">
                                <h3 className="text-xl font-mikhak-bold text-slate-800">{section.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-base font-mikhak-regular">
                                    {section.text}
                                </p>

                                {section.list && (
                                    <ul className="space-y-2.5 mt-3 ps-2 sm:ps-4">
                                        {section.list.map((item, lIdx) => (
                                            <li key={lIdx} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.contactEmail && (
                                    <div className="mt-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-100/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <div>
                                            <div className="text-xs text-slate-400 mb-1 font-mikhak-medium">
                                                {isRTL ? 'البريد الإلكتروني المعتمد للدعم' : 'Official Support Email'}
                                            </div>
                                            <a href={`mailto:${section.contactEmail}`} className="text-primary font-bold text-base hover:underline">
                                                {section.contactEmail}
                                            </a>
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 mb-1 font-mikhak-medium">
                                                {isRTL ? 'هاتف الدعم المباشر' : 'Direct Phone Support'}
                                            </div>
                                            <span className="text-slate-800 font-bold text-sm" dir="ltr">
                                                {section.contactPhone}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <Footer lang={lang} />
        </div>
    );
}
