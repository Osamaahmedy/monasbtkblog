import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import personalPlannerIcon from '../../images/personal_planner.png';
import PhoneFrame from './PhoneFrame';

// --- Inline SVGs for features ---
const AllServicesIcon = () => (
    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary group-hover:text-secondary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);

const SaveTimeIcon = () => (
    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary group-hover:text-secondary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const SecurePaymentsIcon = () => (
    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-primary group-hover:text-secondary transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const FeatureCard = ({ icon, title, description, index, isRtl }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
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
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
            className="group relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-[0_20px_45px_rgba(121,75,199,0.06)] hover:border-primary/10 transition-all duration-300 select-none cursor-pointer"
        >
            {/* Icon Wrapper with circle backdrop */}
            <motion.div
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-primary/5 group-hover:border-primary/15 transition-all duration-300"
                whileHover={{
                    scale: 1.1,
                    rotate: 4,
                    transition: { duration: 0.2 }
                }}
            >
                {icon}
            </motion.div>

            {/* Title */}
            <h3 className={`text-lg sm:text-xl font-bold text-slate-800 group-hover:text-primary transition-colors duration-300 mb-3 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                {title}
            </h3>

            {/* Description */}
            <p className={`text-slate-500 text-sm sm:text-base leading-relaxed ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                {description}
            </p>

            {/* Bottom active line */}
            <div className="mt-5 h-[3px] w-0 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-16 transition-all duration-500"></div>
        </motion.div>
    );
};

const AppMockup = ({ isRtl }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
                opacity: 1,
                scale: 1,
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
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto"
        style={{ willChange: "transform, opacity" }}
    >
        {/* Glow effect */}
        <motion.div
            className="absolute -inset-4 bg-purple-500/10 rounded-full blur-2xl opacity-40 -z-10"
            style={{ willChange: "transform, opacity" }}
            animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
            }}
        />

        <motion.div
            animate={{
                y: [0, -12, 0],
                x: [0, 4, 0],
                rotate: isRtl ? [-4, -2, -4] : [4, 6, 4]
            }}
            transition={{
                repeat: Infinity,
                duration: 6,
                ease: "easeInOut"
            }}
            style={{ willChange: "transform" }}
            className="relative"
        >
            {/* Floating cards around features mockup */}
            <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
                className={`absolute top-16 ${isRtl ? '-left-6' : '-right-6'} px-4 py-2.5 rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-purple-100 flex items-center gap-2 z-20 cursor-pointer select-none`}
            >
                <span className="text-lg">🔒</span>
                <span className={`text-xs font-bold text-slate-700 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                    {isRtl ? 'دفع آمن ١٠٠٪' : '100% Secure Payment'}
                </span>
            </motion.div>

            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                style={{ willChange: "transform" }}
                className={`absolute bottom-24 ${isRtl ? '-right-6' : '-left-6'} px-4 py-2.5 rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-pink-100 flex items-center gap-2 z-20 cursor-pointer select-none`}
            >
                <span className="text-lg">⚡</span>
                <span className={`text-xs font-bold text-slate-700 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                    {isRtl ? 'سرعة بالطلب' : 'Instant Booking'}
                </span>
            </motion.div>

            <PhoneFrame imgSrc="/images/payment.jpeg" />
        </motion.div>
    </motion.div>
);

const FeaturesSection = ({ lang }) => {
    const t = translations[lang].features;
    const isRtl = lang === 'ar';
    const key = `features-${lang}`;

    const features = [
        {
            icon: <img src={personalPlannerIcon} alt="Personal Planner" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />,
            title: t.specialOrganizer.title,
            description: t.specialOrganizer.description
        },
        {
            icon: <AllServicesIcon />,
            title: t.allServices.title,
            description: t.allServices.description
        },
        {
            icon: <SaveTimeIcon />,
            title: t.saveTime.title,
            description: t.saveTime.description
        },
        {
            icon: <SecurePaymentsIcon />,
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
        hidden: { opacity: 0, y: -30 },
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
        <section
            id="features-section"
            className="relative py-24 bg-gradient-to-b from-[#F9F7FC] to-white overflow-hidden"
            key={key}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {/* Background dot grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            {/* Background glows */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-80 h-80 bg-primary/5 rounded-full filter blur-3xl"
                    style={{ willChange: "transform" }}
                    animate={{
                        x: [0, 40, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl"
                    style={{ willChange: "transform" }}
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 20, 0]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    variants={titleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <motion.h2
                        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
                    >
                        {isRtl ? (
                            <>
                                لماذا تختار تطبيق <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">مناسبتك؟</span>
                            </>
                        ) : (
                            <>
                                Why Choose <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Monasbtk App?</span>
                            </>
                        )}
                        <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                    </motion.h2>
                    <motion.p
                        className={`mt-6 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}
                    >
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        variants={sectionVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={index}
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                index={index}
                                isRtl={isRtl}
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 22,
                            delay: 0.2
                        }}
                    >
                        <AppMockup isRtl={isRtl} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
