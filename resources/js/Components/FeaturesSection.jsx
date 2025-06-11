import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const FeatureCard = ({ icon, title, description, index }) => {
    // Split title into individual characters for the typing animation
    const titleChars = title.split('');
    
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                    }
                })
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-50px" }}
            custom={index}
            whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.3 }
            }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-all duration-300 relative overflow-hidden"
        >
            {/* Background animation */}
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#F6F2F9] to-white opacity-50"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
            />
            
            {/* Icon with pulse and float animation */}
            <motion.div 
                className="text-4xl mb-4 relative z-10"
                animate={{ 
                    rotate: [0, 10, 0],
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    repeatType: "reverse",
                    times: [0, 0.5, 1]
                }}
            >
                {icon}
                
                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#F6F2F9] -z-10"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
            
            {/* Title with typing effect */}
            <h3 className="text-xl font-bold text-[#6B1D8E] mb-2 font-mikhak-bold flex justify-center flex-wrap">
                {titleChars.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ 
                            delay: (index * 0.1) + 0.3 + (i * 0.03),
                            duration: 0.2
                        }}
                        viewport={{ once: false }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </h3>
            
            {/* Description */}
            <motion.p 
                className="text-gray-600 max-w-xs line-clamp-2 font-mikhak-regular relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: (index * 0.1) + 0.5, duration: 0.5 }}
            >
                {description}
            </motion.p>
        </motion.div>
    );
};

const AppMockup = ({ lang }) => (
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
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-gradient-to-br from-[#6B1D8E] to-[#9B59B6] p-4">
                <div className="flex justify-between items-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                    <div className="w-24 h-6 rounded-full bg-white/20"></div>
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                </div>
                
                <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="bg-white/10 rounded-xl p-3 mb-4">
                    <div className="w-full h-4 rounded-full bg-white/20 mb-2"></div>
                    <div className="w-3/4 h-4 rounded-full bg-white/20"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-white/10 rounded-xl p-3 aspect-square flex flex-col justify-center items-center">
                            <div className="w-12 h-12 rounded-full bg-white/20 mb-2"></div>
                            <div className="w-full h-3 rounded-full bg-white/20 mb-1"></div>
                            <div className="w-2/3 h-3 rounded-full bg-white/20"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

const FeaturesSection = ({ lang }) => {
    const t = translations[lang].features;
    
    const features = [
        {
            icon: '🎪',
            title: t.specialOrganizer.title,
            description: t.specialOrganizer.description
        },
        {
            icon: '📲',
            title: t.allServices.title,
            description: t.allServices.description
        },
        {
            icon: '⏰',
            title: t.saveTime.title,
            description: t.saveTime.description
        },
        {
            icon: '💳',
            title: t.securePayments.title,
            description: t.securePayments.description
        }
    ];

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.6, 
                ease: "easeOut" 
            }
        }
    };

    return (
        <motion.section 
            className="py-16 overflow-hidden relative"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            key={lang} // Re-trigger animation on language change
        >
            {/* Animated background */}
            <motion.div 
                className="absolute inset-0 bg-[#F6F2F9] -z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />
            
            {/* Animated background patterns */}
            <motion.div 
                className="absolute top-20 left-10 w-64 h-64 bg-[#9B59B6] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
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
                className="absolute bottom-20 right-10 w-72 h-72 bg-[#6B1D8E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
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
            <div className="container mx-auto px-4">
                <motion.div
                    variants={titleVariants}
                    className="text-center mb-12"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block mb-2"
                    >
                        <motion.div 
                            className="w-16 h-1 bg-[#9B59B6] mx-auto rounded-full"
                            animate={{
                                width: ["4rem", "6rem", "4rem"]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 3,
                                ease: "easeInOut"
                            }}
                        ></motion.div>
                    </motion.div>
                    
                    <motion.h2 
                        className="text-3xl md:text-4xl font-bold text-[#6B1D8E] mb-4 font-mikhak-bold relative"
                        initial={{ clipPath: "inset(0 100% 0 0)" }}
                        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        {t.title}
                        
                        {/* Animated underline */}
                        <motion.span 
                            className="absolute bottom-0 left-1/2 h-1 bg-[#9B59B6] rounded-full"
                            initial={{ width: 0, x: "-50%" }}
                            whileInView={{ width: "30%" }}
                            transition={{ duration: 0.8, delay: 1.3 }}
                        />
                    </motion.h2>
                    
                    <motion.p 
                        className="text-gray-600 max-w-2xl mx-auto font-mikhak-regular"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                    >
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { 
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { 
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                            />
                        ))}
                    </motion.div>
                    
                    <motion.div 
                        className="flex justify-center"
                        variants={{
                            hidden: { opacity: 0, x: 100 },
                            visible: { 
                                opacity: 1, 
                                x: 0,
                                transition: {
                                    type: "spring",
                                    stiffness: 50,
                                    damping: 20,
                                    delay: 0.4
                                }
                            }
                        }}
                    >
                        <AppMockup lang={lang} />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default FeaturesSection;
