import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';

const PhoneMockup = ({ index, lang }) => {
    // Different rotation for each phone
    const rotations = ['-rotate-6', 'rotate-0', 'rotate-6'];
    const delays = [0.2, 0.4, 0.6];
    
    return (
        <motion.div
            className={`${rotations[index]} mx-4 relative`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
                duration: 0.8, 
                delay: delays[index], 
                type: 'spring',
                stiffness: 100
            }}
            whileHover={{ 
                y: -8,
                scale: 1.05,
                rotate: rotations[index] === '-rotate-6' ? '-2deg' : 
                       rotations[index] === 'rotate-6' ? '2deg' : '0deg',
                transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }
            }}
        >
            {/* Glowing effect on hover */}
            <motion.div 
                className="absolute -inset-4 bg-purple-500/30 rounded-[2rem] blur-xl -z-10"
                initial={{ opacity: 0.2 }}
                whileHover={{ 
                    opacity: 0.6,
                    scale: 1.1,
                    transition: { duration: 0.3 }
                }}
            />
            
            {/* Outer Frame */}
            <div className="relative border-gray-800 bg-gray-800 border-[6px] rounded-[2rem] h-[400px] w-[200px] shadow-xl">
                {/* Top Bezel with Speaker */}
                <div className="w-[100px] h-[14px] bg-gray-800 top-0 rounded-b-[0.8rem] left-1/2 -translate-x-1/2 absolute"></div>
                {/* Right Side Button */}
                <div className="h-[36px] w-[2px] bg-gray-800 absolute -right-[8px] top-[100px] rounded-l-lg"></div>
                {/* Left Side Buttons */}
                <div className="h-[26px] w-[2px] bg-gray-800 absolute -left-[8px] top-[60px] rounded-r-lg"></div>
                <div className="h-[26px] w-[2px] bg-gray-800 absolute -left-[8px] top-[100px] rounded-r-lg"></div>
                
                {/* Inner Screen with pulse effect on hover */}
                <motion.div 
                    className="rounded-[1.7rem] overflow-hidden w-full h-full bg-gradient-to-br from-[#6B1D8E] to-[#9B59B6] p-3"
                    whileHover={{
                        background: "linear-gradient(135deg, #8E44AD 0%, #9B59B6 50%, #6B1D8E 100%)",
                        backgroundSize: "200% 200%",
                        transition: {
                            background: {
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut"
                            }
                        }
                    }}
                >
                    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col h-full">
                        {/* Status bar */}
                        <div className="flex justify-between items-center mb-3">
                            <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                            <div className="w-12 h-1.5 rounded-full bg-white/20"></div>
                            <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                        </div>
                        
                        {/* Event Planning Content */}
                        <div className="flex-1 flex flex-col gap-3">
                            {/* Event Header */}
                            <motion.div 
                                className="bg-white/10 rounded-lg p-2"
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                            >
                                <div className="flex items-center mb-1.5">
                                    <div className="w-6 h-6 rounded-full bg-white/30 mr-2 flex items-center justify-center">
                                        <span className="text-white text-xs">🎉</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="w-full h-2 rounded-full bg-white/30"></div>
                                    </div>
                                </div>
                                <div className="w-3/4 h-2 rounded-full bg-white/20"></div>
                            </motion.div>
                            
                            {/* Event Services Grid */}
                            <div className="grid grid-cols-2 gap-2 flex-1">
                                {[
                                    { icon: '🍰', label: lang === 'ar' ? 'كيك' : 'Cake' },
                                    { icon: '🎵', label: lang === 'ar' ? 'موسيقى' : 'Music' },
                                    { icon: '📸', label: lang === 'ar' ? 'تصوير' : 'Photo' },
                                    { icon: '🎁', label: lang === 'ar' ? 'هدايا' : 'Gifts' }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="bg-white/10 rounded-lg p-2 flex flex-col justify-center items-center"
                                        whileHover={{ 
                                            backgroundColor: "rgba(255,255,255,0.15)",
                                            y: -2,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-white/30 mb-1.5 flex items-center justify-center">
                                            <span className="text-white text-xs">{item.icon}</span>
                                        </div>
                                        <div className="text-white text-[10px]">{item.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Bottom Navigation */}
                            <motion.div 
                                className="bg-white/10 rounded-lg p-2 mt-auto"
                                whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                            >
                                <div className="flex justify-between">
                                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                        <span className="text-white text-[8px]">🏠</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                        <span className="text-white text-[8px]">🔍</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                        <span className="text-white text-[8px]">📅</span>
                                    </div>
                                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                                        <span className="text-white text-[8px]">👤</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const MiddleBannerSection = ({ lang }) => {
    const t = translations[lang].middleBanner;
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: '-100px'
    });
    
    return (
        <section 
            ref={sectionRef}
            className="relative overflow-hidden py-12 md:py-16"
        >
            {/* Background */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#F0E6FF] to-[#F8F4FC] -z-10"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1 }}
            />
            
            {/* Animated background patterns */}
            <motion.div 
                className="absolute top-20 left-10 w-48 h-48 bg-[#9B59B6] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 15,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className="absolute bottom-20 right-10 w-56 h-56 bg-[#6B1D8E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.3, 1]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "easeInOut",
                    delay: 1
                }}
            />
            
            <div className="container mx-auto px-4 md:px-6">
                <div className="bg-[#F6F2F9] rounded-[1.5rem] shadow-lg overflow-hidden">
                    <div className="px-4 py-10 md:px-6 md:py-16 text-center">
                        {/* Headline Text */}
                        <motion.div
                            className="max-w-2xl mx-auto mb-10 md:mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.h2 
                                className="text-2xl md:text-3xl text-[#6B1D8E] mb-3 font-mikhak-medium"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {t.line1}
                            </motion.h2>
                            
                            <motion.h3 
                                className="text-3xl md:text-4xl text-[#6B1D8E] font-mikhak-bold mb-6"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
                            >
                                {t.line2}
                            </motion.h3>
                            
                            <motion.div 
                                className="flex items-center justify-center gap-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <img 
                                        src={monasbtkLogo}
                                        className="w-full h-full object-contain"
                                        alt="Monasbtk Logo"
                                    />
                                </div>
                                <span className="text-lg md:text-xl text-[#6B1D8E] font-mikhak-bold">
                                    {t.wordmark}
                                </span>
                            </motion.div>
                        </motion.div>
                        
                        {/* Phone Mockups */}
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            <PhoneMockup index={0} lang={lang} />
                            <PhoneMockup index={1} lang={lang} />
                            <PhoneMockup index={2} lang={lang} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiddleBannerSection;




