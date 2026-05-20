import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import PhoneFrame from './PhoneFrame';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';

import birthdayIcon from '../../icons/occasions-birthday.svg';
import graduationIcon from '../../icons/occasions-graduation.svg';
import familyIcon from '../../icons/family-gathering.svg';
import engagementIcon from '../../icons/engagment.svg';
import motherIcon from '../../icons/occasions-mother.svg';
import fatherIcon from '../../icons/occasions-father.svg';
import marriageIcon from '../../icons/occasions-marriage.svg';
import babyIcon from '../../icons/occasions-sex.svg';
import anniversaryIcon from '../../icons/marriage_anniversary.png';

const PhoneWrapper = ({ index, imgSrc }) => {
    const configs = [
        { rotate: '-5deg', glow: 'bg-pink-400/25', y: [0, -10, 0], rot: [-5, -8, -5], yDur: 4.5, rDur: 6, glowDelay: 0 },
        { rotate: '0deg', glow: 'bg-purple-500/25', y: [0, -14, 0], rot: [0, 2, 0], yDur: 5, rDur: 7, glowDelay: 0.4 },
        { rotate: '5deg', glow: 'bg-indigo-400/25', y: [0, -9, 0], rot: [5, 8, 5], yDur: 4.8, rDur: 6.5, glowDelay: 0.8 },
    ];

    const c = configs[index];

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-20px' }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
            className="relative flex-shrink-0 mx-auto"
        >
            <motion.div
                animate={{ y: c.y, rotate: c.rot }}
                transition={{
                    y: { repeat: Infinity, duration: c.yDur, ease: 'easeInOut' },
                    rotate: { repeat: Infinity, duration: c.rDur, ease: 'easeInOut' },
                }}
                className="relative"
            >
                <motion.div
                    className={`absolute -inset-3 md:-inset-5 ${c.glow} rounded-full blur-2xl -z-10`}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.42, 0.2] }}
                    transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut', delay: c.glowDelay }}
                />
                <div className="w-[145px] xs:w-[155px] sm:w-[170px] md:w-[190px] lg:w-[210px] origin-center">
                    <PhoneFrame imgSrc={imgSrc} />
                </div>
            </motion.div>
        </motion.div>
    );
};

const MiddleBannerSection = ({ lang }) => {
    const t = translations[lang].middleBanner;
    const isRtl = lang === 'ar';

    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '-50px',
    });

    const itemVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
    };

    const mockups = [
        '/images/phone_1.png',
        '/images/app_mockup.png',
        '/images/app_mockup.png',
    ];

    return (
        <section
            ref={sectionRef}
            dir={isRtl ? 'rtl' : 'ltr'}
            className="relative overflow-hidden py-10 sm:py-12 md:py-16 lg:py-20"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#F4EDFF] via-[#FBF8FF] to-[#F7F3FC] -z-10"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.9 }}
            />

            <motion.div
                className="absolute top-16 left-0 sm:left-10 w-40 h-40 sm:w-56 sm:h-56 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
                animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-10 right-0 sm:right-10 w-44 h-44 sm:w-64 sm:h-64 bg-[#6B1D8E] rounded-full mix-blend-multiply filter blur-3xl opacity-10 -z-10"
                animate={{ x: [0, -25, 0], y: [0, 28, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', delay: 0.8 }}
            />

            <div className="container mx-auto px-3 sm:px-4 md:px-6">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
                    <div className="px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:py-20">
                        <motion.div
                            className="max-w-2xl mx-auto text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isVisible ? 'visible' : 'hidden'}
                        >
                            <motion.div variants={itemVariants} className="flex justify-center mb-4 sm:mb-5">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-500 text-xs font-mikhak-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                                    {isRtl ? 'تطبيق مناسبتك' : 'Monasbtk App'}
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className="text-base sm:text-xl md:text-3xl text-[#6B1D8E] mb-2 font-mikhak-medium leading-tight"
                            >
                                {t.line1}
                            </motion.h2>

                            {t.line2 && (
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-xl sm:text-3xl md:text-4xl text-[#6B1D8E] font-mikhak-bold mb-5 sm:mb-6 leading-tight"
                                >
                                    {t.line2}
                                </motion.h3>
                            )}

                            <motion.div variants={itemVariants} className="flex justify-center mb-5 sm:mb-6">
                                <div className="w-10 h-1 rounded-full bg-purple-300" />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-2xl bg-purple-50 border border-purple-100"
                            >
                                <img src={monasbtkLogo} className="w-7 h-7 sm:w-8 sm:h-8 object-contain" alt="Monasbtk Logo" />
                                <span className="text-sm sm:text-base md:text-lg text-[#6B1D8E] font-mikhak-bold">
                                    {t.wordmark}
                                </span>
                            </motion.div>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-5 sm:gap-6 md:gap-8 px-2 sm:px-4">
                            {[0, 1, 2].map((i) => (
                                <PhoneWrapper key={i} index={i} imgSrc={mockups[i]} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiddleBannerSection;