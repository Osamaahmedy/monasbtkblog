import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import PhoneFrame from '../Components/PhoneFrame';
import { translations } from '../translations';

// --- Occasion Vector Icons from Project ---
import marriageIcon from '../../icons/occasions-marriage.svg';
import graduationIcon from '../../icons/occasions-graduation.svg';
import birthdayIcon from '../../icons/occasions-birthday.svg';
import babyIcon from '../../icons/occasions-sex.svg';
import familyIcon from '../../icons/family-gathering.svg';
import engagementIcon from '../../icons/engagment.svg';

// --- Integrated Service Icons from Project ---
import decorationIcon from '../../icons/occasion_offers_icon/decoration.png';
import buffetIcon from '../../icons/occasion_offers_icon/buffet.png';
import cakeIcon from '../../icons/occasion_offers_icon/cake.png';
import cameraIcon from '../../icons/occasion_offers_icon/camera.png';
import giftIcon from '../../icons/occasion_offers_icon/gift.png';

// --- Official Store Icons ---
const AppleIcon = () => (
    <svg viewBox="0 0 814 1000" className="w-6 h-6 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 31 0 108.2 2.6 168.5 80.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
);

const GooglePlayIcon = () => (
    <svg viewBox="0 0 512 512" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gp1-app" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C6FF" />
                <stop offset="100%" stopColor="#0078FF" />
            </linearGradient>
            <linearGradient id="gp2-app" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD800" />
                <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
            <linearGradient id="gp3-app" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3A44" />
                <stop offset="100%" stroke="none" stopColor="#C31162" />
            </linearGradient>
            <linearGradient id="gp4-app" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#32DF84" />
                <stop offset="100%" stopColor="#00C170" />
            </linearGradient>
        </defs>
        <path fill="url(#gp1-app)" d="M30 6.5C18.6 0 5.4 0.8 0 9.2L200 256 30 6.5z" />
        <path fill="url(#gp2-app)" d="M512 256l-96-55.6-59.2 55.6 59.2 55.6L512 256z" />
        <path fill="url(#gp3-app)" d="M0 502.8C5.4 511.2 18.6 512 30 505.5L200 256 0 502.8z" />
        <path fill="url(#gp4-app)" d="M200 256L0 9.2L370 200.4 200 256z M200 256L370 311.6 0 502.8L200 256z" />
    </svg>
);

// --- Official Reusable Store Button ---
const StoreButton = ({ href, icon, topLabel, bottomLabel, isComingSoon = false }) => (
    <motion.a
        href={isComingSoon ? undefined : href}
        target={isComingSoon ? undefined : "_blank"}
        rel={isComingSoon ? undefined : "noopener noreferrer"}
        whileHover={isComingSoon ? {} : { scale: 1.04, y: -2 }}
        whileTap={isComingSoon ? {} : { scale: 0.96 }}
        className={`
            relative flex items-center gap-3 px-5 py-3 rounded-2xl min-w-[165px]
            bg-white/[0.06] backdrop-blur-md border border-white/15
            shadow-[0_4px_24px_rgba(0,0,0,0.15)]
            transition-all duration-300 overflow-hidden group select-none
            ${isComingSoon ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-white/[0.12] hover:border-white/25'}
        `}
    >
        {!isComingSoon && (
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        )}
        <div className="text-white group-hover:scale-105 transition-transform duration-300">
            {icon}
        </div>
        <div className="flex flex-col leading-tight select-none">
            <span className="text-white/70 text-[9px] uppercase tracking-wider font-outfit">
                {topLabel}
            </span>
            <span className="text-white text-sm font-semibold font-outfit">
                {bottomLabel}
            </span>
        </div>
    </motion.a>
);

// --- Crisp SVG Icons for Features ---
const StarIcon = () => (
    <svg className="w-5 h-5 text-amber-400 fill-amber-400 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.5)] flex-shrink-0" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-5 h-5 text-secondary filter drop-shadow-[0_0_6px_rgba(255,21,125,0.6)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const CalendarCheckIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const CartCheckIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const LocationPinIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CreditCardCheckIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const BellNotificationIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const TagDiscountIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
);

const WhatsAppVerifiedIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const IncenseBurnerIcon = ({ className = "w-8 h-8" }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 3c0 2-2 3-2 5" />
        <path d="M15 3c0 2-2 3-2 5" />
        <path d="M12 2c0 2-1 3-1 5" />
        <path d="M6 10h12l-1.5 6h-9L6 10z" />
        <path d="M8 16v3h8v-3" />
        <path d="M6 22h12" />
    </svg>
);

const CloseCircleIcon = () => (
    <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CheckCircleSolidIcon = () => (
    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export default function CustomerApp() {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('monasbtk_lang') || 'ar';
        }
        return 'ar';
    });

    const [openFaq, setOpenFaq] = useState(null);
    const [activeTab, setActiveTab] = useState('occasions'); // 'occasions' or 'services'

    useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        document.cookie = `monasbtk_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
    }, [lang]);

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
    };

    const isRtl = lang === 'ar';
    const t = translations[lang]?.customerApp || translations.ar.customerApp;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const APP_STORE_URL = "https://apps.apple.com/sa/app/monasbtk-%D9%85%D9%86%D8%A7%D8%B3%D8%A8%D8%AA%D9%83/id6755626634";
    const PROVIDER_REGISTER_URL = "https://monasbatech.os-sphere.com/providers/register";

    // Occasions list with official vector SVGs
    const occasionsList = [
        { key: 'wedding', title: t.occasions.items[0].title, subtitle: t.occasions.items[0].subtitle, icon: marriageIcon },
        { key: 'graduation', title: t.occasions.items[1].title, subtitle: t.occasions.items[1].subtitle, icon: graduationIcon },
        { key: 'birthday', title: t.occasions.items[2].title, subtitle: t.occasions.items[2].subtitle, icon: birthdayIcon },
        { key: 'baby', title: t.occasions.items[3].title, subtitle: t.occasions.items[3].subtitle, icon: babyIcon },
        { key: 'events', title: t.occasions.items[4].title, subtitle: t.occasions.items[4].subtitle, icon: familyIcon },
        { key: 'corporate', title: t.occasions.items[5].title, subtitle: t.occasions.items[5].subtitle, icon: engagementIcon },
    ];

    // Integrated Services list with official project assets
    const servicesList = [
        { key: 'venues', title: t.occasions.servicesList[0].title, desc: t.occasions.servicesList[0].desc, icon: decorationIcon },
        { key: 'buffet', title: t.occasions.servicesList[1].title, desc: t.occasions.servicesList[1].desc, icon: buffetIcon },
        { key: 'cake', title: t.occasions.servicesList[2].title, desc: t.occasions.servicesList[2].desc, icon: cakeIcon },
        { key: 'photo', title: t.occasions.servicesList[3].title, desc: t.occasions.servicesList[3].desc, icon: cameraIcon },
        { key: 'gifts', title: t.occasions.servicesList[4].title, desc: t.occasions.servicesList[4].desc, icon: giftIcon },
    ];

    // Key features from customer_app_description.txt
    const featureIcons = [
        <CalendarCheckIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <CalendarCheckIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <CartCheckIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <LocationPinIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <CreditCardCheckIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <BellNotificationIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <TagDiscountIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
        <WhatsAppVerifiedIcon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />,
    ];

    return (
        <div dir={isRtl ? 'rtl' : 'ltr'} className="overflow-x-hidden max-w-full bg-slate-50 font-mikhak-regular">
            <Head title={isRtl ? 'تطبيق مناسبتك | كل تفاصيل فرحتك في مكان واحد' : 'Monasbtk App | All Your Celebration in One Place'}>
                <meta
                    name="description"
                    content={t.hero.description}
                />
            </Head>

            {/* =========================================================================
                1. TOP HERO CONTAINER (Exact same background, tech grid, and Header as Home)
            ========================================================================= */}
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-shining to-secondary text-white">
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                {/* Animated Glowing Light Beam */}
                <div className="absolute top-0 left-1/4 w-1/2 h-[450px] bg-purple-400/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

                {/* Abstract Shapes with Fixed Typo-Animations */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-shining/40 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob" />
                <div className="absolute top-10 right-10 w-80 h-80 bg-secondary/40 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob animate-delay-2000" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/40 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob animate-delay-4000" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Official Site Header */}
                    <Header lang={lang} toggleLanguage={toggleLanguage} />

                    {/* Customer App Hero Presentation */}
                    <div className="pt-12 pb-20 lg:pt-16 lg:pb-28">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                            
                            {/* Text Column (7 cols) */}
                            <div className="lg:col-span-7 text-center lg:text-start space-y-6">
                                {/* Live Status Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-md text-xs sm:text-sm font-medium text-white shadow-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                                    </span>
                                    <span className={isRtl ? 'font-mikhak-medium' : 'font-outfit'}>
                                        {t.hero.badge}
                                    </span>
                                </div>

                                {/* Main Heading */}
                                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] text-white ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent">
                                        {isRtl ? 'مناسبتك' : 'Monasbtk'}
                                    </span>{' '}
                                    <span>
                                        {isRtl ? '… كل تفاصيل فرحتك في مكان واحد' : '… All Your Celebration in One Place'}
                                    </span>
                                </h1>

                                {/* Marketing Slogan */}
                                <div className={`text-sm sm:text-base font-semibold text-pink-200/95 tracking-wide ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                    {t.hero.slogan}
                                </div>

                                {/* Pitch & Description */}
                                <p className={`text-base sm:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                    {t.hero.description}
                                </p>

                                {/* Store Buttons */}
                                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                    <StoreButton
                                        href={APP_STORE_URL}
                                        icon={<AppleIcon />}
                                        topLabel={isRtl ? 'تحميل من' : 'Download on the'}
                                        bottomLabel="App Store"
                                    />
                                    <StoreButton
                                        href="#"
                                        icon={<GooglePlayIcon />}
                                        topLabel={isRtl ? 'قريباً على' : 'Coming soon on'}
                                        bottomLabel="Google Play"
                                        isComingSoon={true}
                                    />
                                </div>

                                {/* Stats Pill Row */}
                                <div className="pt-6 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
                                    <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <StarIcon />
                                            <span className={`text-white text-base font-bold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>4.9</span>
                                        </div>
                                        <div className="text-[11px] text-white/80">{isRtl ? 'تقييم المستخدمين' : 'User Rating'}</div>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm text-center">
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <UsersIcon />
                                            <span className={`text-white text-base font-bold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>+200</span>
                                        </div>
                                        <div className="text-[11px] text-white/80">{isRtl ? 'مزود خدمة معتمد' : 'Verified Vendors'}</div>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm text-center">
                                        <div className="text-white text-base font-bold mb-1 font-mikhak-bold">+20</div>
                                        <div className="text-[11px] text-white/80">{isRtl ? 'مدينة بالمملكة' : 'Saudi Cities'}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Mockup Column (5 cols, using original high-res PhoneFrame) */}
                            <div className="lg:col-span-5 flex justify-center relative">
                                <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                                    <PhoneFrame imgSrc="/images/Hero.jpeg" alt="Monasbtk App Screen" />

                                    {/* Glassmorphic floating card */}
                                    <div className="absolute -bottom-4 start-1/2 -translate-x-1/2 whitespace-nowrap bg-black/40 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold text-white">
                                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                                        <span>{isRtl ? 'سلة تسوق موحدة وذكية' : 'Unified Smart Cart'}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* =========================================================================
                2. ABOUT THE APP & WHY US (Pain Points vs Monasbtk Solution)
            ========================================================================= */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white to-[#F9F7FC] overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 sm:mb-20">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold mb-3">
                            <span>{t.about.title}</span>
                        </span>
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {isRtl ? (
                                <>
                                    بدلاً من عناء البحث .. <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">مناسبتك تجمع لك كل خياراتك</span>
                                </>
                            ) : (
                                <>
                                    No More Scattered Searches .. <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">All in One Place</span>
                                </>
                            )}
                            <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </h2>
                        <p className={`mt-6 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                            {t.about.description}
                        </p>
                    </div>

                    {/* Comparison Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Pain Points (7 cols) */}
                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className={`text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                                    <span>{t.comparison.problemTitle}</span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {t.comparison.painPoints.map((item, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100/70 flex items-start gap-3">
                                            <CloseCircleIcon />
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 font-mikhak-medium mb-0.5">{item.title}</div>
                                                <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
                                {isRtl ? 'وفّر وقتك وجهدك واعتمد على حل متكامل وذكي.' : 'Save your precious time with an integrated smart platform.'}
                            </div>
                        </div>

                        {/* Monasbtk Solution (5 cols, luxury plum background) */}
                        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#2A1545] via-[#38103A] to-[#1F1135] text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-pink-300 mb-6">
                                    <IncenseBurnerIcon />
                                </div>

                                <h3 className={`text-2xl font-bold leading-snug mb-3 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    {t.comparison.solutionTitle}
                                </h3>

                                <div className="inline-block px-3 py-1 rounded-full bg-secondary/20 text-pink-300 text-xs font-semibold mb-6">
                                    {t.comparison.solutionSubtitle}
                                </div>

                                <div className="space-y-3.5">
                                    {t.comparison.whyUsPoints.map((text, i) => (
                                        <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-white/90">
                                            <CheckCircleSolidIcon />
                                            <span>{text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
                                <span>{isRtl ? 'مناسبتك.. تبيّض الوجه' : 'Monasbtk.. Make Your Occasion Shine'}</span>
                                <span className="font-outfit font-semibold text-secondary">100% Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                3. HOW IT WORKS (Customer Journey in 4 Simple Steps, matching HowToOrderSection)
            ========================================================================= */}
            <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 sm:mb-20">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {isRtl ? (
                                <>
                                    كيف يعمل <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">تطبيق مناسبتك؟</span>
                                </>
                            ) : (
                                <>
                                    How Does the <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">App Work?</span>
                                </>
                            )}
                            <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </h2>
                        <p className={`mt-6 text-base sm:text-lg text-slate-500 max-w-xl mx-auto ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                            {t.howItWorks.subtitle}
                        </p>
                    </div>

                    {/* 4 Steps Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t.howItWorks.steps.map((item, idx) => (
                            <div
                                key={idx}
                                className="group relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_45px_rgba(121,75,199,0.06)] hover:border-primary/10 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                    <span className="text-xl font-bold text-primary font-mikhak-bold">{item.step}</span>
                                </div>
                                <h3 className={`text-lg sm:text-xl font-bold text-slate-800 group-hover:text-primary transition-colors mb-3 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    {item.title}
                                </h3>
                                <p className={`text-sm text-slate-500 leading-relaxed ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                4. CATEGORIES & SERVICES (Both Occasions & Integrated Services from Section 3)
            ========================================================================= */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F9F7FC] to-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {isRtl ? (
                                <>
                                    المناسبات والخدمات <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">التي نغطيها</span>
                                </>
                            ) : (
                                <>
                                    Occasions & Services <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">We Cover</span>
                                </>
                            )}
                            <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </h2>
                        <p className={`mt-6 text-base sm:text-lg text-slate-500 max-w-xl mx-auto ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                            {t.occasions.subtitle}
                        </p>

                        {/* Interactive Tab Switcher */}
                        <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-200/70 border border-slate-200">
                            <button
                                onClick={() => setActiveTab('occasions')}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer select-none ${
                                    activeTab === 'occasions'
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {t.occasions.occasionsTitle}
                            </button>
                            <button
                                onClick={() => setActiveTab('services')}
                                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer select-none ${
                                    activeTab === 'services'
                                        ? 'bg-white text-primary shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {t.occasions.servicesTitle}
                            </button>
                        </div>
                    </div>

                    {/* Tab 1: Occasions Grid */}
                    {activeTab === 'occasions' && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
                            {occasionsList.map((item) => (
                                <div
                                    key={item.key}
                                    className="group relative bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_rgba(121,75,199,0.07)] hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                        <img src={item.icon} alt={item.title} className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform group-hover:scale-110" />
                                    </div>
                                    <h4 className={`text-base font-bold text-slate-800 group-hover:text-primary transition-colors mb-1 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                        {item.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                                        {item.subtitle}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab 2: Integrated Services Grid */}
                    {activeTab === 'services' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                            {servicesList.map((service) => (
                                <div
                                    key={service.key}
                                    className="group relative bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_40px_rgba(121,75,199,0.07)] hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-300"
                                >
                                    <div className="w-20 h-20 rounded-2xl bg-purple-50/50 border border-purple-100/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-all">
                                        <img src={service.icon} alt={service.title} className="w-12 h-12 object-contain transition-transform group-hover:scale-110" />
                                    </div>
                                    <h4 className={`text-base font-bold text-slate-800 group-hover:text-primary transition-colors mb-2 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                        {service.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {service.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================================
                5. APP KEY FEATURES (Matching FeaturesSection with PhoneFrame)
            ========================================================================= */}
            <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16 sm:mb-20">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {isRtl ? (
                                <>
                                    أبرز مميزات التطبيق <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">للعميل</span>
                                </>
                            ) : (
                                <>
                                    Key Application Features <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">for Customers</span>
                                </>
                            )}
                            <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </h2>
                        <p className={`mt-6 text-base sm:text-lg text-slate-500 max-w-xl mx-auto ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                            {t.features.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Phone Mockup (4 cols, using original PhoneFrame with crystal-clear providers1.jpeg) */}
                        <div className="lg:col-span-4 flex justify-center order-2 lg:order-1">
                            <div className="w-full max-w-[270px] sm:max-w-[300px]">
                                <PhoneFrame imgSrc="/images/providers1.jpeg" alt="Monasbtk Venue Details Screen" />
                            </div>
                        </div>

                        {/* Features Grid (8 cols) */}
                        <div className="lg:col-span-8 order-1 lg:order-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {t.features.list.map((feat, idx) => (
                                    <div
                                        key={idx}
                                        className="group bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-[0_15px_35px_rgba(121,75,199,0.06)] hover:border-primary/15 transition-all duration-300 flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all">
                                            {featureIcons[idx] || featureIcons[0]}
                                        </div>
                                        <div>
                                            <h4 className={`text-base font-bold text-slate-800 group-hover:text-primary transition-colors mb-1.5 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                                {feat.title}
                                            </h4>
                                            <p className={`text-xs text-slate-500 leading-relaxed ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                                {feat.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                6. CUSTOMER REVIEWS & NUMBERS (Social Proof)
            ========================================================================= */}
            <section className="relative py-20 bg-gradient-to-b from-white to-[#F9F7FC] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className={`text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {t.reviews.title}
                        </h2>
                        <p className="text-sm sm:text-base text-slate-500">
                            {t.reviews.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {t.reviews.list.map((review, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                                        {[...Array(review.rating)].map((_, s) => (
                                            <StarIcon key={s} />
                                        ))}
                                    </div>
                                    <p className={`text-slate-700 text-sm sm:text-base leading-relaxed mb-6 ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                        "{review.quote}"
                                    </p>
                                </div>
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                                    <span className="text-slate-800 font-bold">{review.name}</span>
                                    <span>{review.city}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                7. VENDOR REGISTRATION BANNER (Integrated using official site styling & URL)
            ========================================================================= */}
            <section className="relative py-16 bg-gradient-to-b from-[#F9F7FC] to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-tr from-white/90 via-purple-50/20 to-white/90 backdrop-blur-xl rounded-[2.5rem] border border-purple-100/60 shadow-[0_30px_60px_rgba(121,75,199,0.05)] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-semibold mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                <span>{t.vendorBanner.badge}</span>
                            </span>
                            <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-3 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                {t.vendorBanner.title}
                            </h3>
                            <p className={`text-sm sm:text-base text-slate-600 leading-relaxed ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                {t.vendorBanner.subtitle}
                            </p>
                        </div>

                        <div className="flex-shrink-0">
                            <motion.a
                                href={PROVIDER_REGISTER_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all cursor-pointer select-none"
                            >
                                <span>{t.vendorBanner.cta}</span>
                                <svg className={`w-4 h-4 transition-transform ${isRtl ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.a>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                8. FAQ SECTION (Using Official FAQ Accordion from site)
            ========================================================================= */}
            <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                            {isRtl ? (
                                <>
                                    الأسئلة <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">الشائعة</span>
                                </>
                            ) : (
                                <>
                                    Frequently Asked <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
                                </>
                            )}
                            <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                        </h2>
                        <p className={`mt-6 text-base sm:text-lg text-slate-500 max-w-xl mx-auto ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                            {t.faq.subtitle}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {t.faq.items.map((item, idx) => (
                            <div
                                key={idx}
                                className={`overflow-hidden border border-slate-100 rounded-3xl transition-all duration-300 shadow-sm ${
                                    openFaq === idx ? 'bg-gradient-to-r from-purple-50/30 via-white to-pink-50/10 border-primary/20 shadow-[0_20px_40px_rgba(121,75,199,0.05)]' : 'bg-white hover:border-primary/15'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full py-5 px-6 sm:px-8 flex items-center justify-between cursor-pointer focus:outline-none select-none text-start"
                                >
                                    <h3 className={`text-base sm:text-lg font-bold ${openFaq === idx ? 'text-primary' : 'text-slate-800'} ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                        {item.question}
                                    </h3>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${openFaq === idx ? 'bg-primary text-white' : 'bg-slate-50 text-slate-500'}`}>
                                        <svg className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {openFaq === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden bg-slate-50/40 border-t border-slate-100"
                                        >
                                            <div className="px-6 py-5 sm:px-8 text-sm sm:text-base text-slate-500 leading-relaxed">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* =========================================================================
                9. FINAL APP DOWNLOAD CTA (Exact matching DownloadAppSection from site)
            ========================================================================= */}
            <section className="relative py-20 lg:py-28 bg-gradient-to-b from-[#F9F7FC] to-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#1F1135] via-[#2A1545] to-[#1A0B2E] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
                        {/* Glow effects */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl pointer-events-none" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                            <div className="lg:col-span-7 text-center lg:text-start space-y-6">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-pink-300">
                                    <span>{t.bottomCta.slogan}</span>
                                </div>
                                <h3 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    {t.bottomCta.title}
                                </h3>
                                <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                    {t.bottomCta.subtitle}
                                </p>

                                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                    <StoreButton
                                        href={APP_STORE_URL}
                                        icon={<AppleIcon />}
                                        topLabel={isRtl ? 'تحميل من' : 'Download on the'}
                                        bottomLabel="App Store"
                                    />
                                    <StoreButton
                                        href="#"
                                        icon={<GooglePlayIcon />}
                                        topLabel={isRtl ? 'قريباً على' : 'Coming soon on'}
                                        bottomLabel="Google Play"
                                        isComingSoon={true}
                                    />
                                </div>
                            </div>

                            <div className="lg:col-span-5 flex justify-center">
                                <div className="w-full max-w-[260px] sm:max-w-[290px]">
                                    <PhoneFrame imgSrc="/images/departments.jpeg" alt="Monasbtk Categories" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================================
                10. OFFICIAL SITE FOOTER (Imported directly, 100% consistent)
            ========================================================================= */}
            <Footer lang={lang} />
        </div>
    );
}
