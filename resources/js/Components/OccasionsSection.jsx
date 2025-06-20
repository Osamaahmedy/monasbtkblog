import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

// --- Icon Imports ---
import birthdayIcon from '../../icons/occasions-birthday.svg';
import graduationIcon from '../../icons/occasions-graduation.svg';
import familyIcon from '../../icons/family-gathering.svg';
import engagementIcon from '../../icons/engagment.svg';
import motherIcon from '../../icons/occasions-mother.svg';
import fatherIcon from '../../icons/occasions-father.svg';
import marriageIcon from '../../icons/occasions-marriage.svg';
import babyIcon from '../../icons/occasions-sex.svg';
import anniversaryIcon from '../../icons/marriage_anniversary.png';

// --- Main Component ---
const OccasionsSection = ({ lang }) => {
    const t = translations[lang].occasions;

    const occasions = [
        { key: 'birthday', icon: birthdayIcon },
        { key: 'graduation', icon: graduationIcon },
        { key: 'family', icon: familyIcon },
        { key: 'engagement', icon: engagementIcon },
        { key: 'mother', icon: motherIcon },
        { key: 'father', icon: fatherIcon },
        { key: 'marriage', icon: marriageIcon },
        { key: 'baby', icon: babyIcon },
        { key: 'anniversary', icon: anniversaryIcon },
    ];

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                duration: 0.8, 
                staggerChildren: 0.1 
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            id="occasions-section"
            key={lang}
            className="bg-gradient-to-b from-white to-[#F8F4FC] py-16 lg:py-24 overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"
                    animate={{
                        x: [0, -50, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    variants={titleVariants}
                >
                    <motion.h2 
                        className="text-4xl font-mikhak-bold mb-4 inline-block relative"
                        variants={titleVariants}
                    >
                        {t.title}
                        <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    </motion.h2>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-mikhak-regular"
                        variants={titleVariants}
                    >
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Side: Phone Mockup */}
                    <motion.div 
                        className="lg:w-1/3 hidden lg:block"
                        variants={{
                            hidden: { opacity: 0, x: -50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                        }}
                    >
                        <div className="relative">
                            {/* Glow effect behind phone */}
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl -z-10"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.5, 0.7, 0.5]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}
                            />
                            
                            {/* Phone Mockup - Styled like Features Section */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
                                    visible: { 
                                        opacity: 1, 
                                        scale: 1, 
                                        rotate: 6,
                                        transition: { 
                                            duration: 0.8, 
                                            delay: 0.6, 
                                            type: 'spring', 
                                            stiffness: 100 
                                        }
                                    }
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-100px" }}
                                className="relative mx-auto"
                                // Floating animation
                                animate={{
                                    y: [0, -15, 0],
                                    x: [0, 5, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut"
                                }}
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
                                {/* Outer Frame */}
                                <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                                    {/* Top Bezel with Speaker */}
                                    <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                                    {/* Right Side Button */}
                                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[11px] top-[124px] rounded-l-lg"></div>
                                    {/* Left Side Buttons */}
                                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[70px] rounded-r-lg"></div>
                                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[120px] rounded-r-lg"></div>
                                    {/* Inner Screen */}
                                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-gradient-to-b from-primary to-secondary p-4">
                                        {/* App Content */}
                                        <div className="h-full flex flex-col">
                                            {/* App Header */}
                                            <div className="text-white text-center mb-6">
                                                <h3 className="text-xl font-mikhak-bold">{t.title}</h3>
                                                <p className="text-xs opacity-80">{t.subtitle}</p>
                                            </div>
                                            
                                            {/* Featured Occasion */}
                                            <div className="bg-white/10 rounded-xl p-3 mb-4">
                                                <div className="flex items-center mb-2">
                                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                                        <img src={birthdayIcon} alt="Birthday" className="w-6 h-6 object-contain" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white text-sm">{t.birthday}</h4>
                                                        <div className="w-20 h-2 bg-white/20 rounded-full mt-1"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Occasions Grid */}
                                            <div className="grid grid-cols-2 gap-3 mb-4">
                                                {occasions.slice(0, 4).map((occasion, index) => (
                                                    <div key={index} className="bg-white/10 rounded-xl p-3 aspect-square flex flex-col justify-center items-center">
                                                        <div className="w-12 h-12 rounded-full bg-white/20 mb-2 flex items-center justify-center">
                                                            <img 
                                                                src={occasion.icon} 
                                                                alt={t[occasion.key]} 
                                                                className="w-8 h-8 object-contain" 
                                                            />
                                                        </div>
                                                        <div className="text-white text-xs text-center mt-1">{t[occasion.key]}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Navigation Bar */}
                                            <div className="mt-auto">
                                                <div className="grid grid-cols-4 gap-3">
                                                    {[1, 2, 3, 4].map((item) => (
                                                        <div key={item} className="flex flex-col items-center">
                                                            <div className="w-8 h-8 rounded-full bg-white/20 mb-1"></div>
                                                            <div className="w-10 h-2 bg-white/20 rounded-full"></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side: Occasions Grid */}
                    <motion.div 
                        className="lg:w-2/3"
                        variants={cardVariants}
                    >
                        <motion.div 
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6"
                            variants={sectionVariants}
                        >
                            {occasions.map((occasion) => (
                                <motion.div
                                    key={occasion.key}
                                    variants={cardVariants}
                                    whileHover={{ 
                                        y: -8,
                                        boxShadow: "0 15px 30px rgba(121, 75, 199, 0.1)",
                                        transition: { duration: 0.2 }
                                    }}
                                    className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="mb-4">
                                        <img
                                            className="h-16 w-16 md:h-20 md:w-20 object-contain transition-transform duration-300 hover:scale-110"
                                            src={occasion.icon}
                                            alt={t[occasion.key]}
                                        />
                                    </div>
                                    <h3 className="text-base md:text-lg font-mikhak-medium text-gray-800">
                                        {t[occasion.key]}
                                    </h3>
                                    
                                    {/* Simple underline indicator */}
                                    <div className="mt-3 h-0.5 w-0 bg-primary rounded-full group-hover:w-12 transition-all duration-300"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default OccasionsSection;















