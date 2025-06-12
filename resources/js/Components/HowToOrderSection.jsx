import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const HowToOrderSection = ({ lang }) => {
    const t = translations[lang].howToOrder;
    
    const steps = [
        {
            number: '01',
            title: t.steps.step1.title,
            description: t.steps.step1.description,
        },
        {
            number: '02',
            title: t.steps.step2.title,
            description: t.steps.step2.description,
        },
        {
            number: '03',
            title: t.steps.step3.title,
            description: t.steps.step3.description,
        },
        {
            number: '04',
            title: t.steps.step4.title,
            description: t.steps.step4.description,
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#F8F4FC] overflow-hidden">
            <div className="container mx-auto px-4 relative">
                {/* Background decorative elements */}
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

                {/* Section Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2 
                        className="text-4xl font-mikhak-bold mb-4 inline-block relative"
                    >
                        {t.title}
                        <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                    </motion.h2>
                    <motion.p 
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-mikhak-regular"
                    >
                        {t.subtitle}
                    </motion.p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Side: Phone Mockup */}
                    <motion.div 
                        className="lg:w-1/3 hidden lg:block"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
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
                            
                            {/* Phone Mockup */}
                            <motion.div
                                initial={{ opacity: 1, scale: 1, rotate: 6 }}
                                className="relative mx-auto"
                                // Floating animation
                                animate={{
                                    y: [0, -15, 0],
                                    x: [0, 5, 0],
                                    rotate: [6, 8, 6]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 3,
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
                                                <p className="text-xs opacity-80">Easy steps to order</p>
                                            </div>
                                            
                                            {/* Steps in phone */}
                                            <div className="space-y-4">
                                                {steps.map((step, index) => (
                                                    <div key={index} className="bg-white/10 rounded-xl p-3 flex items-center">
                                                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                                            <span className="text-white font-mikhak-bold">{step.number}</span>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white text-sm font-mikhak-medium">{step.title}</h4>
                                                            <div className="w-32 h-2 bg-white/20 rounded-full mt-1"></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* Order button */}
                                            <div className="mt-auto mb-4">
                                                <div className="bg-white/20 rounded-xl p-4 text-center">
                                                    <div className="w-full h-10 bg-white/30 rounded-lg flex items-center justify-center">
                                                        <span className="text-white font-mikhak-bold">Order Now</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Navigation Bar */}
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
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side: Steps */}
                    <motion.div 
                        className="lg:w-2/3"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-8">
                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    className="relative"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="flex items-start">
                                        {/* Step number */}
                                        <motion.div 
                                            className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-mikhak-bold text-2xl mr-6 shadow-lg"
                                            whileHover={{ 
                                                scale: 1.1,
                                                boxShadow: "0 10px 25px -5px rgba(121, 75, 199, 0.5)"
                                            }}
                                            animate={{
                                                boxShadow: ["0 5px 15px rgba(121, 75, 199, 0.3)", "0 15px 25px rgba(121, 75, 199, 0.5)", "0 5px 15px rgba(121, 75, 199, 0.3)"]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            {step.number}
                                        </motion.div>
                                        
                                        {/* Step content */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-mikhak-bold text-gray-800 mb-2">{step.title}</h3>
                                            <p className="text-gray-600 font-mikhak-regular">{step.description}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Connector line (except for last item) */}
                                    {index < steps.length - 1 && (
                                        <motion.div 
                                            className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-primary to-secondary"
                                            initial={{ height: 0 }}
                                            whileInView={{ height: "3rem" }}
                                            viewport={{ once: false }}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HowToOrderSection;





