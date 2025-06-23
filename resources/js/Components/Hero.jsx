import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const Hero = ({ lang }) => {
    const t = translations[lang];

    return (
        <main className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between">
            {/* Left Side: Headline and Download Buttons */}
            <motion.div
                key={lang} // Re-trigger animation on language change
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }} // Allow animation to re-run
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center md:text-start md:w-1/2"
            >
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight font-mikhak-bold">
                    {t.hero.title}
                </h1>
                <p className="mt-4 text-lg text-gray-300 font-mikhak-regular">
                    {t.hero.subtitle}
                </p>
                <div className="mt-8">
                    <p className="font-semibold mb-4">{t.hero.download}</p>
                    <div className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-black text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-8" />
                        </motion.a>
                        <motion.a
                            href="#"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-black text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors"
                        >
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-8" />
                        </motion.a>
                    </div>
                </div>
            </motion.div>

            {/* Right Side: Enhanced Phone Mockup with Advanced Animations */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
            >
                {/* Floating animation container */}
                <motion.div
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 2, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 6,
                        ease: "easeInOut"
                    }}
                    className="relative"
                >
                    {/* Glow effect */}
                    <motion.div 
                        className="absolute -inset-4 bg-[#9B59B6] rounded-full blur-xl opacity-20 -z-10"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.3, 0.2]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 4,
                            ease: "easeInOut"
                        }}
                    />
                    
                    {/* Phone Frame */}
                    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[6px] md:border-[8px] rounded-[2rem] md:rounded-[2.5rem] h-[400px] md:h-[500px] lg:h-[550px] w-[200px] md:w-[250px] lg:w-[270px] shadow-xl max-w-full">
                        {/* Top Bezel with Speaker */}
                        <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                        {/* Right Side Button */}
                        <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[11px] top-[124px] rounded-l-lg"></div>
                        {/* Left Side Buttons */}
                        <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[70px] rounded-r-lg"></div>
                        <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[120px] rounded-r-lg"></div>
                        
                        {/* Inner Screen with animated gradient */}
                        <motion.div 
                            className="rounded-[2rem] overflow-hidden w-full h-full bg-gradient-to-br from-[#6B1D8E] to-[#9B59B6] p-3"
                            animate={{
                                background: [
                                    "linear-gradient(135deg, #6B1D8E 0%, #9B59B6 100%)",
                                    "linear-gradient(225deg, #6B1D8E 0%, #9B59B6 100%)",
                                    "linear-gradient(315deg, #6B1D8E 0%, #9B59B6 100%)",
                                    "linear-gradient(45deg, #6B1D8E 0%, #9B59B6 100%)"
                                ]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "easeInOut"
                            }}
                        >
                            <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col h-full">
                                {/* Status bar */}
                                <div className="flex justify-between items-center mb-3">
                                    <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                                    <div className="w-12 h-1.5 rounded-full bg-white/20"></div>
                                    <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                                </div>
                                
                                {/* App content - Home screen */}
                                <div className="flex-1 flex flex-col">
                                    {/* Welcome header */}
                                    <div className="mb-4">
                                        <h3 className="text-white text-lg font-bold mb-1">
                                            {lang === 'ar' ? 'مرحباً بك!' : 'Welcome!'}
                                        </h3>
                                        <p className="text-white/70 text-xs">
                                            {lang === 'ar' ? 'اكتشف مناسبتك المثالية' : 'Discover your perfect occasion'}
                                        </p>
                                    </div>
                                    
                                    {/* Featured occasions */}
                                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-white text-sm font-medium">
                                                {lang === 'ar' ? 'مناسبات مميزة' : 'Featured Occasions'}
                                            </h4>
                                            <span className="text-white/50 text-xs">
                                                {lang === 'ar' ? 'عرض الكل' : 'View all'}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-white/20 mb-1 flex items-center justify-center">
                                                    <span className="text-white text-xs">🎂</span>
                                                </div>
                                                <span className="text-white text-xs">
                                                    {lang === 'ar' ? 'أعياد ميلاد' : 'Birthdays'}
                                                </span>
                                            </div>
                                            <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
                                                <div className="w-10 h-10 rounded-full bg-white/20 mb-1 flex items-center justify-center">
                                                    <span className="text-white text-xs">💍</span>
                                                </div>
                                                <span className="text-white text-xs">
                                                    {lang === 'ar' ? 'حفلات زفاف' : 'Weddings'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Trending services */}
                                    <div className="bg-white/10 rounded-lg p-3 mb-4">
                                        <h4 className="text-white text-sm font-medium mb-2">
                                            {lang === 'ar' ? 'خدمات رائجة' : 'Trending Services'}
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center bg-white/10 rounded-lg p-2">
                                                <div className="w-8 h-8 rounded-full bg-white/20 mr-2 flex items-center justify-center">
                                                    <span className="text-white text-xs">🍰</span>
                                                </div>
                                                <div>
                                                    <div className="text-white text-xs font-medium">
                                                        {lang === 'ar' ? 'كيك مخصص' : 'Custom Cakes'}
                                                    </div>
                                                    <div className="text-white/50 text-[10px]">
                                                        {lang === 'ar' ? '٤.٩ ★' : '4.9 ★'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center bg-white/10 rounded-lg p-2">
                                                <div className="w-8 h-8 rounded-full bg-white/20 mr-2 flex items-center justify-center">
                                                    <span className="text-white text-xs">📸</span>
                                                </div>
                                                <div>
                                                    <div className="text-white text-xs font-medium">
                                                        {lang === 'ar' ? 'تصوير فوتوغرافي' : 'Photography'}
                                                    </div>
                                                    <div className="text-white/50 text-[10px]">
                                                        {lang === 'ar' ? '٤.٩ ★' : '4.9 ★'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Navigation bar */}
                                    <div className="bg-white/10 rounded-lg p-2 mt-auto">
                                        <div className="flex justify-between">
                                            <div className="w-6 h-6 rounded-full bg-white/40 flex items-center justify-center">
                                                <span className="text-white text-xs">🏠</span>
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                                <span className="text-white text-xs">🔍</span>
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                                <span className="text-white text-xs">📅</span>
                                            </div>
                                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                                <span className="text-white text-xs">👤</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
};

export default Hero;


