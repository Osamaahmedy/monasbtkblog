import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';

const AboutUs = ({ lang }) => {
    const t = translations[lang].about;

    return (
        <section className="py-20 text-white">
            <div className="container mx-auto px-4">
                <motion.div
                    key={lang} // Re-trigger animation on language change
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }} // Allow animation to re-run
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <img src={monasbtkLogo} alt="Monasbtk Logo" className="h-32 w-32 mx-auto mb-8" />
                    <h2 className="text-4xl font-bold text-white mb-6 font-mikhak-bold">{t.title}</h2>
                    <p className="text-lg text-gray-300 leading-relaxed font-mikhak-regular">{t.description}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
