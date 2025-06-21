import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';

// Import occasion icons with correct paths
import birthdayIcon from '../../icons/occasions-birthday.svg';
import graduationIcon from '../../icons/occasions-graduation.svg';
import familyIcon from '../../icons/family-gathering.svg';
import engagementIcon from '../../icons/engagment.svg';
import motherIcon from '../../icons/occasions-mother.svg';
import fatherIcon from '../../icons/occasions-father.svg';
import marriageIcon from '../../icons/occasions-marriage.svg';
import babyIcon from '../../icons/occasions-sex.svg';
import anniversaryIcon from '../../icons/marriage_anniversary.png';

const PhoneMockup = ({ index, lang, occasions }) => {
    // Different rotation for each phone
    const rotations = ['-rotate-6', 'rotate-0', 'rotate-6'];
    const delays = [0.2, 0.4, 0.6];

    // Use the occasions passed directly (already sliced in parent component)
    const phoneOccasions = occasions || [];

    // Different themes for each phone
    const phoneThemes = [
        { title: translations[lang].occasions.title, subtitle: 'Celebrations' },
        { title: translations[lang].occasions.title, subtitle: 'Family & Love' },
        { title: translations[lang].occasions.title, subtitle: 'Special Events' }
    ];

    return (
        <motion.div
            className={`${rotations[index]} mx-1 md:mx-2 relative flex-shrink-0 group max-w-[120px] md:max-w-[180px] lg:max-w-[200px]`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px", amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay: delays[index] * 0.3, // Reduced delay
                ease: "easeOut"
            }}
            whileHover={{
                y: -2, // Further reduced movement
                scale: 1.01, // Further reduced scale
                transition: {
                    duration: 0.2,
                    ease: "easeOut"
                }
            }}
        >
            {/* Simplified glow effect */}
            <div className="absolute -inset-2 bg-purple-500/20 rounded-[2rem] blur-lg -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

            {/* Outer Frame */}
            <div className="relative border-gray-800 bg-gray-800 border-[3px] md:border-[4px] lg:border-[6px] rounded-[1.5rem] md:rounded-[2rem] h-[240px] md:h-[320px] lg:h-[400px] w-[120px] md:w-[160px] lg:w-[200px] shadow-xl max-w-full">
                {/* Top Bezel with Speaker */}
                <div className="w-[80px] sm:w-[100px] h-[12px] sm:h-[14px] bg-gray-800 top-0 rounded-b-[0.8rem] left-1/2 -translate-x-1/2 absolute"></div>
                {/* Right Side Button */}
                <div className="h-[28px] sm:h-[36px] w-[2px] bg-gray-800 absolute -right-[6px] sm:-right-[8px] top-[80px] sm:top-[100px] rounded-l-lg"></div>
                {/* Left Side Buttons */}
                <div className="h-[20px] sm:h-[26px] w-[2px] bg-gray-800 absolute -left-[6px] sm:-left-[8px] top-[48px] sm:top-[60px] rounded-r-lg"></div>
                <div className="h-[20px] sm:h-[26px] w-[2px] bg-gray-800 absolute -left-[6px] sm:-left-[8px] top-[80px] sm:top-[100px] rounded-r-lg"></div>

                {/* Inner Screen - simplified for better performance */}
                <div className="rounded-[1.7rem] overflow-hidden w-full h-full bg-gradient-to-br from-[#6B1D8E] to-[#9B59B6] p-2 md:p-3 group-hover:from-[#8E44AD] group-hover:to-[#6B1D8E] transition-all duration-300">
                    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col h-full">
                        {/* Status bar */}
                        <div className="flex justify-between items-center mb-2 md:mb-3">
                            <div className="w-4 md:w-6 h-1 md:h-1.5 rounded-full bg-white/20"></div>
                            <div className="w-8 md:w-12 h-1 md:h-1.5 rounded-full bg-white/20"></div>
                            <div className="w-4 md:w-6 h-1 md:h-1.5 rounded-full bg-white/20"></div>
                        </div>

                        {/* Occasions Content */}
                        <div className="flex-1 flex flex-col gap-2 md:gap-3">
                            {/* Header - App Title */}
                            <div className="bg-white/10 rounded-lg p-1.5 md:p-2 hover:bg-white/15 transition-colors duration-200">
                                <div className="flex items-center mb-1 md:mb-1.5">
                                    <div className="w-4 md:w-6 h-4 md:h-6 rounded-full bg-white/30 mr-1.5 md:mr-2 flex items-center justify-center">
                                        <img
                                            src={monasbtkLogo}
                                            className="w-2.5 md:w-4 h-2.5 md:h-4 object-contain"
                                            alt="Monasbtk"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-white text-[8px] md:text-[10px] font-medium">
                                            {translations[lang].middleBanner.wordmark}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-white text-[7px] md:text-[9px] opacity-80">
                                    {phoneThemes[index].title}
                                </div>
                            </div>

                            {/* Occasions Grid - 3 occasions in a column layout */}
                            <div className="flex flex-col gap-1.5 md:gap-2 flex-1">
                                {phoneOccasions.map((occasion, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/10 rounded-lg p-1.5 md:p-2 flex items-center hover:bg-white/15 hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        <div className="w-5 md:w-7 h-5 md:h-7 rounded-full bg-white/30 mr-2 flex items-center justify-center flex-shrink-0">
                                            <img
                                                src={occasion.icon}
                                                alt={translations[lang]?.occasions?.[occasion.key] || occasion.key}
                                                className="w-3 md:w-4 h-3 md:h-4 object-contain"
                                            />
                                        </div>
                                        <div className="text-white text-[8px] md:text-[10px] leading-tight">
                                            {translations[lang]?.occasions?.[occasion.key] || occasion.key}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Bottom Navigation */}
                            <div className="bg-white/10 rounded-lg p-1.5 md:p-2 mt-auto hover:bg-white/15 transition-colors duration-200">
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-white/30 flex items-center justify-center mb-0.5">
                                            <span className="text-white text-[6px] md:text-[8px]">🏠</span>
                                        </div>
                                        <div className="w-3 md:w-4 h-0.5 bg-[#794BC7] rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
                                            <span className="text-white text-[6px] md:text-[8px]">🔍</span>
                                        </div>
                                        <div className="w-3 md:w-4 h-0.5 bg-white/20 rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
                                            <span className="text-white text-[6px] md:text-[8px]">📅</span>
                                        </div>
                                        <div className="w-3 md:w-4 h-0.5 bg-white/20 rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-white/20 flex items-center justify-center mb-0.5">
                                            <span className="text-white text-[6px] md:text-[8px]">👤</span>
                                        </div>
                                        <div className="w-3 md:w-4 h-0.5 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MiddleBannerSection = ({ lang }) => {
    const t = translations[lang].middleBanner;
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.1, // Reduced threshold for better mobile detection
        rootMargin: '-50px' // Reduced margin for mobile compatibility
    });

    // Define occasions data - 9 occasions from OccasionsSection (3 per phone)
    const occasions = [
        // Phone 1 - Celebrations
        { key: 'birthday', icon: birthdayIcon },
        { key: 'graduation', icon: graduationIcon },
        { key: 'family', icon: familyIcon },

        // Phone 2 - Love & Relationships
        { key: 'engagement', icon: engagementIcon },
        { key: 'marriage', icon: marriageIcon },
        { key: 'anniversary', icon: anniversaryIcon },

        // Phone 3 - Family Events
        { key: 'mother', icon: motherIcon },
        { key: 'father', icon: fatherIcon },
        { key: 'baby', icon: babyIcon },
    ];
    
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
                <div className="bg-white rounded-[1.5rem] shadow-lg overflow-hidden">
                    <div className="px-4 py-10 md:px-6 md:py-16 text-center">
                        {/* Headline Text */}
                        <motion.div
                            className="max-w-2xl mx-auto mb-10 md:mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <motion.h2
                                className="text-lg sm:text-xl md:text-3xl text-[#6B1D8E] mb-2 md:mb-3 font-mikhak-medium leading-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }} // Always animate to visible state
                                whileInView={{ opacity: 1 }} // Ensure visibility when in view
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {t.line1}
                            </motion.h2>

                            {/* Only render h3 if line2 has content */}
                            {t.line2 && (
                                <motion.h3
                                    className="text-xl sm:text-2xl md:text-4xl text-[#6B1D8E] font-mikhak-bold mb-4 md:mb-6 leading-tight"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }} // Always animate to visible state
                                    whileInView={{ opacity: 1, scale: 1 }} // Ensure visibility when in view
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
                                >
                                    {t.line2}
                                </motion.h3>
                            )}
                            
                            <motion.div 
                                className="flex items-center justify-center gap-2 mt-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }} // Always animate to visible state
                                whileInView={{ opacity: 1, y: 0 }} // Ensure visibility when in view
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center flex-shrink-0">
                                    <img
                                        src={monasbtkLogo}
                                        className="w-full h-full object-contain"
                                        alt="Monasbtk Logo"
                                    />
                                </div>
                                <span className="text-base sm:text-lg md:text-xl text-[#6B1D8E] font-mikhak-bold">
                                    {t.wordmark}
                                </span>
                            </motion.div>
                        </motion.div>
                        
                        {/* Phone Mockups - Fixed responsive layout */}
                        <motion.div
                            className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 px-4 overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 max-w-full">
                                <PhoneMockup index={0} lang={lang} occasions={occasions.slice(0, 3)} />
                                <PhoneMockup index={1} lang={lang} occasions={occasions.slice(3, 6)} />
                                <PhoneMockup index={2} lang={lang} occasions={occasions.slice(6, 9)} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiddleBannerSection;




