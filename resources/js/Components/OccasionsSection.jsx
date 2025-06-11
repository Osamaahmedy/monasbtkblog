import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

// --- Icon Imports ---
import birthdayIcon from '../../icons/occasions-birthday.svg';
import graduationIcon from '../../icons/occasions-graduation.svg';
import familyIcon from '../../icons/family-gathering.svg';
import engagementIcon from '../../icons/engagment.svg';
import motherIcon from '../../icons/occasions-mother.svg';
import fatherIcon from '../../icons/occasions-father.svg';
import marriageIcon from '../../icons/occasions-marriage.svg';
import babyIcon from '../../icons/occasions-sex.svg';

// --- Main Component ---

const OccasionsSection = ({ lang }) => {
    const t = translations[lang].occasions;

    const occasions = [
        { key: 'birthday', icon: birthdayIcon },
        { key: 'graduation', icon: graduationIcon },
        { key: 'family', icon: familyIcon },
        { key: 'engagement', icon: engagementIcon },
        { key: 'mother', icon: motherIcon },
        { key: 'father', icon: fatherIcon },
        { key: 'marriage', icon: marriageIcon },
        { key: 'baby', icon: babyIcon },
    ];

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.section
            key={lang} // Re-trigger animation on language change
            className="bg-white py-12 sm:py-16 lg:py-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }} // Allow animation to re-run
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-mikhak-bold tracking-tight text-gray-900 sm:text-4xl">
                        {t.title}
                    </h2>
                    <p className="mt-4 font-mikhak-regular text-lg leading-8 text-gray-600">
                        {t.subtitle}
                    </p>
                </div>

                {/* --- Single Responsive Grid --- */}
                <motion.div
                    className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6"
                    variants={sectionVariants} // Use same container variants for staggering
                >
                    {occasions.map((occasion) => (
                        <motion.div
                            key={occasion.key}
                            variants={cardVariants}
                            whileHover={{ y: -5, scale: 1.05, borderColor: '#8B5CF6' }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 border border-gray-200 rounded-2xl cursor-pointer"
                        >
                            <img
                                className="h-16 w-16"
                                src={occasion.icon}
                                alt={t[occasion.key]}
                            />
                            <h3 className="mt-4 font-mikhak-medium text-gray-800">
                                {t[occasion.key]}
                            </h3>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default OccasionsSection;