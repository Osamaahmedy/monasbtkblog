import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import PhoneFrame from './PhoneFrame';

// SVG Icons
const AppleIcon = () => (
    <svg viewBox="0 0 814 1000" className="w-6 h-6 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 31 0 108.2 2.6 168.5 80.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
);

const GooglePlayIcon = () => (
    <svg viewBox="0 0 512 512" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gp1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C6FF" />
                <stop offset="100%" stopColor="#0078FF" />
            </linearGradient>
            <linearGradient id="gp2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD800" />
                <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
            <linearGradient id="gp3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF3A44" />
                <stop offset="100%" stopColor="#C31162" />
            </linearGradient>
            <linearGradient id="gp4" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#32DF84" />
                <stop offset="100%" stopColor="#00C170" />
            </linearGradient>
        </defs>
        <path fill="url(#gp1)" d="M30 6.5C18.6 0 5.4 0.8 0 9.2L200 256 30 6.5z" />
        <path fill="url(#gp2)" d="M512 256l-96-55.6-59.2 55.6 59.2 55.6L512 256z" />
        <path fill="url(#gp3)" d="M0 502.8C5.4 511.2 18.6 512 30 505.5L200 256 0 502.8z" />
        <path fill="url(#gp4)" d="M200 256L0 9.2C0 9.2 0 9.2 0 9.2L370 200.4 200 256z M200 256L370 311.6 0 502.8C0 502.8 0 502.8 0 502.8L200 256z" />
    </svg>
);

const StoreButton = ({ href, icon, topLabel, bottomLabel, isComingSoon = false }) => (
    <motion.a
        href={href}
        target={isComingSoon ? undefined : "_blank"}
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className={`
            relative flex items-center gap-3 px-5 py-3 rounded-2xl min-w-[165px]
            bg-white/[0.04] backdrop-blur-md border border-white/10
            hover:bg-white/[0.09] hover:border-white/20
            shadow-[0_4px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.04)]
            transition-all duration-300 overflow-hidden group
            ${isComingSoon ? 'cursor-default opacity-80' : 'cursor-pointer'}
        `}
    >
        {/* Shimmer Sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>

        <div className="flex flex-col leading-tight select-none">
            <span className="text-white/40 text-[9px] font-outfit uppercase tracking-widest">
                {topLabel}
            </span>
            <span className="text-white text-sm font-outfit font-semibold">
                {bottomLabel}
            </span>
        </div>
    </motion.a>
);

// Stats Icons
const StarIcon = () => (
    <svg className="w-5 h-5 text-amber-400 fill-amber-400 filter drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-5 h-5 text-purple-400 filter drop-shadow-[0_0_4px_rgba(192,132,252,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const GiftIcon = () => (
    <svg className="w-5 h-5 text-pink-400 filter drop-shadow-[0_0_4px_rgba(244,114,182,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);

const AvatarStack = () => (
    <div className="flex -space-x-2 rtl:space-x-reverse select-none">
        {[
            'bg-gradient-to-tr from-pink-500 to-rose-400',
            'bg-gradient-to-tr from-purple-500 to-indigo-400',
            'bg-gradient-to-tr from-cyan-500 to-blue-400',
            'bg-gradient-to-tr from-amber-500 to-orange-400',
        ].map((bg, idx) => (
            <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.1, zIndex: 10 }}
                className={`w-7 h-7 rounded-full border-2 border-purple-950/80 ${bg} flex items-center justify-center text-[10px] font-bold text-white shadow-md cursor-pointer transition-all duration-200`}
            >
                {['👩‍🦰', '🧑', '👱‍♀️', '👨'][idx]}
            </motion.div>
        ))}
    </div>
);

const Hero = ({ lang }) => {
    const t = translations[lang];
    const isRtl = lang === 'ar';

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
    };

    return (
        <main
            dir={isRtl ? 'rtl' : 'ltr'}
            className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between gap-16 relative z-10"
        >
            {/* Left: Text & Buttons */}
            <motion.div
                key={lang}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center md:text-start md:w-1/2 space-y-8"
            >
                {/* Badge */}
                <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
                    <span className={`inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-white/80 text-xs shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-md relative overflow-hidden group select-none ${isRtl ? 'font-mikhak-medium' : 'font-outfit font-medium'}`}>
                        {/* Shimmer light sweep */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="tracking-wide">
                            {isRtl ? 'متاح الآن على App Store' : 'Now live on the App Store'}
                        </span>
                    </span>
                </motion.div>

                {/* Title */}
                <motion.div variants={itemVariants}>
                    {isRtl ? (
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.15] font-mikhak-bold">
                            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">مناسبتك</span>
                            <span className="text-white block sm:inline">… حنا نخلدها لك</span>
                        </h1>
                    ) : (
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.15] font-outfit tracking-tight">
                            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent">Beautiful memories</span> <br className="hidden lg:block" /> at your fingertips
                        </h1>
                    )}
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className={`text-lg text-white/80 leading-relaxed max-w-md mx-auto md:mx-0 ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}
                >
                    {t.hero.subtitle}
                </motion.p>

                {/* Download Buttons */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <p className={`text-xs font-semibold text-white/40 uppercase tracking-widest ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                        {t.hero.download}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <StoreButton
                            href="https://apps.apple.com/sa/app/monasbtk/id6755626634"
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
                </motion.div>

                {/* Glassmorphic Stats Row */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-3 gap-4 pt-4 max-w-md mx-auto md:mx-0"
                >
                    <div className="flex flex-col items-center md:items-start p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-300">
                        <div className="flex items-center gap-1.5 mb-1">
                            <StarIcon />
                            <span className={`text-white text-lg font-bold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>4.9</span>
                        </div>
                        <p className={`text-white/50 text-[10px] sm:text-xs font-semibold ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
                            {isRtl ? 'تقييم المستخدمين' : 'User Rating'}
                        </p>
                        <div className="mt-2.5">
                            <AvatarStack />
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-start p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-300">
                        <div className="flex items-center gap-1.5 mb-1">
                            <UsersIcon />
                            <span className={`text-white text-lg font-bold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>10K+</span>
                        </div>
                        <p className={`text-white/50 text-[10px] sm:text-xs font-semibold ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
                            {isRtl ? 'مستخدم نشط' : 'Active Users'}
                        </p>
                    </div>


                </motion.div>
            </motion.div>

            {/* Right: Phone Mockup & Floating 3D Cards */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="md:w-1/2 flex justify-center relative select-none w-full"
                style={{ willChange: "transform, opacity" }}
            >
                {/* Glowing Background Glows */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl -z-10 bg-purple-600/30"
                    style={{ willChange: "transform, opacity" }}
                    animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full blur-2xl -z-10 bg-pink-500/20"
                    style={{ willChange: "transform, opacity" }}
                    animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                />

                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative"
                    style={{ willChange: "transform" }}
                >
                    {/* Outer glow ring */}
                    <motion.div
                        className="absolute -inset-8 rounded-full blur-3xl -z-10 bg-[#9B59B6]/30"
                        style={{ willChange: "transform, opacity" }}
                        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    />
                    {/* Inner accent glow */}
                    <motion.div
                        className="absolute -inset-2 rounded-full blur-xl -z-10 bg-purple-400/20"
                        style={{ willChange: "transform, opacity" }}
                        animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.25, 0.1] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
                    />

                    {/* Phone Frame */}
                    <PhoneFrame imgSrc="/images/phone_1.png" />

                    {/* Floating Card 1: Top/Side Booking Confirmed */}
                    <motion.div
                        animate={{ y: [0, -10, 0], x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        style={{ willChange: "transform" }}
                        className={`absolute z-20 top-12 ${isRtl ? '-left-8 sm:-left-16' : '-right-8 sm:-right-16'} p-3 rounded-2xl bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-3 select-none backdrop-blur-md`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-sm shadow-md">
                            🎉
                        </div>
                        <div className="flex flex-col text-start">
                            <span className={`text-[9px] font-semibold text-white/40 uppercase tracking-widest ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                {isRtl ? 'الطلب القادم' : 'Upcoming Event'}
                            </span>
                            <span className={`text-xs font-bold text-white ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                {isRtl ? 'حفل تخرج - مؤكد' : 'Graduation Party'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Floating Card 2: Bottom/Side Cake Ordered */}
                    <motion.div
                        animate={{ y: [0, 8, 0], x: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                        style={{ willChange: "transform" }}
                        className={`absolute z-20 bottom-16 ${isRtl ? '-right-10 sm:-right-20' : '-left-10 sm:-left-20'} p-3 rounded-2xl bg-slate-900/60 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex items-center gap-3 select-none backdrop-blur-md`}
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center text-sm shadow-md">
                            🎂
                        </div>
                        <div className="flex flex-col text-start">
                            <span className={`text-[9px] font-semibold text-white/40 uppercase tracking-widest ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
                                {isRtl ? 'تم الحجز' : 'Event Booked'}
                            </span>
                            <span className={`text-xs font-bold text-white ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                {isRtl ? 'كعكة عيد الميلاد' : 'Birthday Cake'}
                            </span>
                        </div>
                    </motion.div>

                    {/* Floating Badge 3: Mini Themes indicator */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 6, 0], y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                        style={{ willChange: "transform" }}
                        className={`absolute z-20 top-[40%] ${isRtl ? '-right-10 sm:-right-14' : '-left-10 sm:-left-14'} p-2 rounded-xl bg-slate-900/50 backdrop-blur-md border border-white/10 text-white text-xs flex items-center gap-1.5 shadow-md`}
                    >
                        <span className="text-sm">✨</span>
                        <span className={`font-semibold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>{isRtl ? 'ثيمات تفاعلية' : 'Live Themes'}</span>
                    </motion.div>

                    {/* Emojis floating particles */}
                    <motion.div
                        animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
                        style={{ willChange: "transform, opacity" }}
                        className="absolute -top-6 left-[20%] text-xl pointer-events-none"
                    >
                        🎈
                    </motion.div>
                    <motion.div
                        animate={{ y: [0, -18, 0], opacity: [0.2, 0.6, 0.2] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1.5 }}
                        style={{ willChange: "transform, opacity" }}
                        className="absolute bottom-2 right-[15%] text-xl pointer-events-none"
                    >
                        🎁
                    </motion.div>
                </motion.div>
            </motion.div>
        </main>
    );
};

export default Hero;