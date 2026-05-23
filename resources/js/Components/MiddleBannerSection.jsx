import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import PhoneFrame from './PhoneFrame';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';

const PhoneWrapper = ({ index, imgSrc }) => {
    const configs = [
        { rotate: '-5deg', glow: 'bg-pink-400/25', y: [0, -10, 0], rot: [-5, -8, -5], yDur: 4.5, rDur: 6, glowDelay: 0 },
        { rotate: '0deg', glow: 'bg-purple-500/25', y: [0, -14, 0], rot: [0, 2, 0], yDur: 5, rDur: 7, glowDelay: 0.4 },
        { rotate: '5deg', glow: 'bg-indigo-400/25', y: [0, -9, 0], rot: [5, 8, 5], yDur: 4.8, rDur: 6.5, glowDelay: 0.8 },
    ];

    const c = configs[index];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: 'easeOut' }}
            className="relative flex-shrink-0 mx-auto"
            style={{ willChange: "transform, opacity" }}
        >
            <motion.div
                animate={{ y: c.y, rotate: c.rot }}
                transition={{
                    y: { repeat: Infinity, duration: c.yDur, ease: 'easeInOut' },
                    rotate: { repeat: Infinity, duration: c.rDur, ease: 'easeInOut' },
                }}
                className="relative animate-float"
                style={{ willChange: "transform" }}
            >
                <motion.div
                    className={`absolute -inset-3 md:-inset-5 ${c.glow} rounded-full blur-2xl -z-10`}
                    style={{ willChange: "transform, opacity" }}
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
    }, true);

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
    };

    const mockups = [
        '/images/app_mockup.png',
        '/images/app_mockup.png',
        '/images/app_mockup.png',
    ];

    // Highlight specific key terms in the line1 text string
    const renderTitle = () => {
        const targetText = isRtl ? 'أسهل مع مناسبتك' : 'easier with Monasbtk';
        if (t.line1.includes(targetText)) {
            const parts = t.line1.split(targetText);
            return (
                <>
                    {parts[0]}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {targetText}
                    </span>
                    {parts[1]}
                </>
            );
        }
        return t.line1;
    };

    return (
        <section
            ref={sectionRef}
            dir={isRtl ? 'rtl' : 'ltr'}
            className="relative overflow-hidden py-20 lg:py-28"
        >
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#F5F1FA] via-white to-[#F6F2FB] -z-10"
                initial={{ opacity: 0 }}
                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.9 }}
            />

            {/* Glowing background shapes */}
            <motion.div
                className="absolute top-16 left-10 w-56 h-56 bg-primary/5 rounded-full filter blur-3xl pointer-events-none"
                style={{ willChange: "transform" }}
                animate={{ x: [0, 30, 0], y: [0, 20, 0], scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/5 rounded-full filter blur-3xl pointer-events-none"
                style={{ willChange: "transform" }}
                animate={{ x: [0, -25, 0], y: [0, 28, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', delay: 0.8 }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Light Glassmorphic Container Card */}
                <div className="bg-gradient-to-tr from-white/80 via-purple-50/10 to-white/80 backdrop-blur-xl rounded-[2.5rem] border border-purple-100/50 shadow-[0_30px_60px_rgba(121,75,199,0.04)] overflow-hidden">
                    <div className="px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 lg:py-24">
                        <motion.div
                            className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
                            variants={containerVariants}
                            initial="hidden"
                            animate={isVisible ? 'visible' : 'hidden'}
                        >
                            <motion.div variants={itemVariants} className="flex justify-center mb-5">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold shadow-inner">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                    <span className={isRtl ? 'font-mikhak-medium' : 'font-outfit'}>
                                        {isRtl ? 'تطبيق مناسبتك' : 'Monasbtk App'}
                                    </span>
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={itemVariants}
                                className={`text-2.5xl sm:text-3.5xl md:text-4.5xl mb-6 font-extrabold text-slate-800 leading-tight ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
                            >
                                {renderTitle()}
                            </motion.h2>

                            {t.line2 && (
                                <motion.h3
                                    variants={itemVariants}
                                    className={`text-xl sm:text-2xl md:text-3xl text-slate-700 font-bold mb-6 leading-tight ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
                                >
                                    {t.line2}
                                </motion.h3>
                            )}

                            <motion.div variants={itemVariants} className="flex justify-center mb-6">
                                <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-purple-50/50 border border-purple-100/50 shadow-sm"
                            >
                                <img src={monasbtkLogo} className="w-8 h-8 object-contain" alt="Monasbtk Logo" />
                                <span className={`text-base sm:text-lg text-purple-700 font-extrabold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    {t.wordmark}
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Interactive stacked phones layout */}
                        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-6 md:gap-10 px-2 sm:px-4">
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