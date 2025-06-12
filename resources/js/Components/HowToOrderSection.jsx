import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { translations } from '../translations';

const HowToOrderSection = ({ lang }) => {
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '-100px'
    });
    
    const t = translations[lang].howToOrder;
    
    const steps = [
        {
            number: '01',
            title: t.steps.step1.title,
            description: t.steps.step1.description,
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 21C16.5 16.5 21 12.8137 21 9C21 4.02944 16.9706 1 12 1C7.02944 1 3 4.02944 3 9C3 12.8137 7.5 16.5 12 21Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
            ),
        },
        {
            number: '02',
            title: t.steps.step2.title,
            description: t.steps.step2.description,
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 6H4.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 12H4.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M4 18H4.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            ),
        },
        {
            number: '03',
            title: t.steps.step3.title,
            description: t.steps.step3.description,
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 22H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M15 7L11 11L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ),
        },
        {
            number: '04',
            title: t.steps.step4.title,
            description: t.steps.step4.description,
            icon: (
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 14H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 14H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 14H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M8 18H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M12 18H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M16 18H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            ),
        },
    ];

    return (
        <motion.section
            ref={sectionRef}
            className="relative py-20 overflow-hidden bg-white"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            key={`how-to-order-${lang}`} // Re-render when language changes
        >
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <motion.div 
                    className="absolute top-20 left-10 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl opacity-60"
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
                    className="absolute bottom-20 right-10 w-64 h-64 bg-secondary/30 rounded-full filter blur-3xl opacity-60"
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
                <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-shining/30 rounded-full filter blur-3xl opacity-40"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 10,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="container mx-auto px-4">
                {/* Section header */}
                <div className="text-center mb-16">
                    <motion.h2 
                        className="text-4xl font-mikhak-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p 
                        className="text-lg font-mikhak-regular text-gray-600 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Steps container */}
                <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative flex-1 bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                            whileHover={{ 
                                y: -10, 
                                boxShadow: "0 25px 50px -12px rgba(121, 75, 199, 0.25)",
                                borderColor: "rgba(121, 75, 199, 0.5)"
                            }}
                        >
                            {/* Step number */}
                            <div className="absolute -top-6 -left-2 font-bold text-7xl text-primary/10">
                                {step.number}
                            </div>
                            
                            {/* Icon container */}
                            <div className="relative mb-6 mt-2">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-md"></div>
                                <motion.div 
                                    className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/80 to-secondary/80 text-white rounded-full shadow-lg"
                                    whileHover={{ 
                                        scale: 1.05,
                                        boxShadow: "0 0 20px rgba(121, 75, 199, 0.5)"
                                    }}
                                    animate={{
                                        boxShadow: ["0 0 0px rgba(121, 75, 199, 0.3)", "0 0 15px rgba(121, 75, 199, 0.7)", "0 0 0px rgba(121, 75, 199, 0.3)"]
                                    }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {step.icon}
                                </motion.div>
                            </div>
                            
                            {/* Content */}
                            <motion.h3 
                                className="text-xl font-mikhak-bold mb-2 text-gray-800"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                            >
                                {step.title}
                            </motion.h3>
                            <motion.p 
                                className="text-gray-600 font-mikhak-regular"
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                            >
                                {step.description}
                            </motion.p>
                            
                            {/* Connector line (except for last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent">
                                    <motion.div 
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.7, 1, 0.7]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 2,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default HowToOrderSection;



