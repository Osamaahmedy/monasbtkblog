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
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-mikhak-bold mb-4">
                        {t.title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Simple Steps Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div 
                            key={index}
                            className="flex flex-col items-center text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mb-4">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-mikhak-bold text-gray-800 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToOrderSection;










