import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import PhoneFrame from './PhoneFrame';
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
    const isRtl = lang === 'ar';

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
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <motion.section
            id="occasions-section"
            key={lang}
            className="relative bg-gradient-to-b from-white to-[#F9F7FC] py-20 lg:py-28 overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
        >
            {/* Elegant Background Textures */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.03)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"
                    animate={{
                        x: [0, 40, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 12,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 14,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    variants={titleVariants}
                >
                    <motion.h2
                        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 inline-block relative text-slate-900 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
                        variants={titleVariants}
                    >
                        {isRtl ? (
                            <>
                                اكتشف <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">مناسباتنا</span>
                            </>
                        ) : (
                            <>
                                Explore Our <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Occasions</span>
                            </>
                        )}
                        <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    </motion.h2>
                    <motion.p
                        className={`mt-6 text-base sm:text-lg text-slate-500 max-w-xl mx-auto ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}
                        variants={titleVariants}
                    >
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Side: Interactive Phone Mockup & Floating Embellishments */}
                    <motion.div
                        className="lg:w-1/3 hidden lg:block relative"
                        variants={{
                            hidden: { opacity: 0, x: isRtl ? 50 : -50 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                        }}
                    >
                        <div className="relative">
                            {/* Glowing effect behind phone */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl -z-10"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.6, 0.8, 0.6]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Phone Mockup Wrapper with Floaters */}
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9, rotate: -3 },
                                    visible: {
                                        opacity: 1,
                                        scale: 1,
                                        rotate: isRtl ? -4 : 4,
                                        transition: {
                                            duration: 0.8,
                                            delay: 0.3,
                                            type: 'spring',
                                            stiffness: 80
                                        }
                                    }
                                }}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-100px" }}
                                className="relative mx-auto"
                                animate={{
                                    y: [0, -12, 0],
                                    x: [0, 4, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* Floating Badges / Icons */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-purple-100 flex items-center justify-center text-xl z-20 cursor-pointer hover:scale-110 transition-transform duration-200"
                                >
                                    🎓
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                    className="absolute top-24 -left-6 w-12 h-12 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-pink-100 flex items-center justify-center text-xl z-20 cursor-pointer hover:scale-110 transition-transform duration-200"
                                >
                                    🎂
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute bottom-20 -right-4 w-12 h-12 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-indigo-100 flex items-center justify-center text-xl z-20 cursor-pointer hover:scale-110 transition-transform duration-200"
                                >
                                    💍
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
                                    className="absolute bottom-32 -left-8 w-12 h-12 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-rose-100 flex items-center justify-center text-xl z-20 cursor-pointer hover:scale-110 transition-transform duration-200"
                                >
                                    🎈
                                </motion.div>

                                <PhoneFrame imgSrc="/images/app_mockup.png" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side: Occasions Grid */}
                    <motion.div
                        className="lg:w-2/3 w-full"
                        variants={cardVariants}
                    >
                        <motion.div
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
                            variants={sectionVariants}
                        >
                            {occasions.map((occasion) => (
                                <motion.div
                                    key={occasion.key}
                                    variants={cardVariants}
                                    whileHover={{
                                        y: -8,
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                    className="group relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_20px_45px_rgba(121,75,199,0.08)] hover:border-primary/10 transition-all duration-300 cursor-pointer select-none"
                                >
                                    {/* Soft circular gradient backdrop for icons */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all duration-300 relative">
                                        <img
                                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                            src={occasion.icon}
                                            alt={t[occasion.key]}
                                        />
                                    </div>
                                    <h3 className={`text-sm sm:text-base font-bold text-slate-700 group-hover:text-primary transition-colors duration-300 ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                        {t[occasion.key]}
                                    </h3>

                                    {/* Growing underline indicator (Fixed group bug) */}
                                    <div className="mt-4 h-[3px] w-0 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-16 transition-all duration-500"></div>
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
