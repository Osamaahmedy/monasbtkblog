import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';
import pattern from '../../images/pattern.png';

const AboutUs = ({ lang }) => {
    const t = translations[lang].about;

    return (
        <section
            className="relative py-20 bg-white text-gray-800 overflow-hidden"
        >
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `url(${pattern})`,
                    backgroundRepeat: 'repeat',
                }}
            ></div>
            <div className="relative container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <img src={monasbtkLogo} alt="Monasbtk Logo" className="h-32 w-32 mx-auto mb-8" />
                    <h2 className="text-4xl font-bold text-primary mb-6 font-mikhak-bold">{t.title}</h2>
                    <p className="text-lg text-gray-600 leading-relaxed font-mikhak-regular">{t.description}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;