import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const HowToOrderSection = ({ lang }) => {
    const t = translations[lang].howToOrder;
    const isRTL = lang === 'ar';
    
    const steps = [
        {
            number: '1',
            title: t.steps.step1.title,
            description: t.steps.step1.description,
        },
        {
            number: '2',
            title: t.steps.step2.title,
            description: t.steps.step2.description,
        },
        {
            number: '3',
            title: t.steps.step3.title,
            description: t.steps.step3.description,
        },
        {
            number: '4',
            title: t.steps.step4.title,
            description: t.steps.step4.description,
        },
    ];

    return (
        <section 
            id="how-to-order-section" 
            className="relative py-24 bg-gradient-to-b from-white to-[#F9F7FC] overflow-hidden"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRTL ? 'font-mikhak-bold' : 'font-outfit'}`}>
                        {isRTL ? (
                            <>
                                كيف يتم <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">الطلب؟</span>
                            </>
                        ) : (
                            <>
                                How to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Order?</span>
                            </>
                        )}
                        <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                    </h2>
                    <p className={`mt-6 text-base sm:text-lg text-slate-500 max-w-xl mx-auto ${isRTL ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                        {t.subtitle}
                    </p>
                </div>

                {/* Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            {/* Directional Connector Arrow (Large Screens) */}
                            {index < 3 && (
                                <div className={`hidden lg:block absolute top-8 w-[calc(100%-4rem)] h-6 z-0 pointer-events-none text-purple-200/60
                                    ${isRTL ? 'right-[calc(50%+2rem)]' : 'left-[calc(50%+2rem)]'}
                                `}>
                                    <svg className="w-full h-full" fill="none" viewBox="0 0 100 24" preserveAspectRatio="none">
                                        <path 
                                            d={isRTL ? "M100,12 L10,12" : "M0,12 L90,12"} 
                                            stroke="currentColor" 
                                            strokeWidth="2.5" 
                                            strokeDasharray="5 5" 
                                        />
                                        <polygon 
                                            points={isRTL ? "12,6 0,12 12,18" : "88,6 100,12 88,18"} 
                                            fill="currentColor" 
                                        />
                                    </svg>
                                </div>
                            )}

                            {/* Step Card */}
                            <motion.div 
                                className="relative flex flex-col items-center text-center group cursor-pointer"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Glowing Circle Badge */}
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-extrabold mb-6 shadow-[0_8px_20px_rgba(121,75,199,0.25)] group-hover:scale-110 group-hover:shadow-[0_12px_24px_rgba(121,75,199,0.35)] transition-all duration-300 relative z-10 select-none">
                                    {step.number}
                                </div>
                                
                                {/* Title */}
                                <h3 className={`text-lg sm:text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors duration-300 ${isRTL ? 'font-mikhak-bold' : 'font-outfit'}`}>
                                    {step.title}
                                </h3>
                                
                                {/* Description */}
                                <p className={`text-slate-500 text-sm sm:text-base leading-relaxed max-w-[260px] ${isRTL ? 'font-mikhak-regular' : 'font-outfit font-light'}`}>
                                    {step.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToOrderSection;
