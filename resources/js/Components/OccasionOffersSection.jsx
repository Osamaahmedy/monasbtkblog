import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// --- Offer Icon Imports ---
import cameraIcon from '../../icons/occasion_offers_icon/camera.png';
import entertainmentIcon from '../../icons/occasion_offers_icon/entertainment.png';
import carIcon from '../../icons/occasion_offers_icon/car.png';
import cakeIcon from '../../icons/occasion_offers_icon/cake.png';
import balloonsIcon from '../../icons/occasion_offers_icon/balloons.png';
import boatIcon from '../../icons/occasion_offers_icon/boat.png';
import buffetIcon from '../../icons/occasion_offers_icon/buffet.png';
import giftIcon from '../../icons/occasion_offers_icon/gift.png';
import inviteIcon from '../../icons/occasion_offers_icon/elecrtonic_invite.png';
import decorationIcon from '../../icons/occasion_offers_icon/decoration.png';
import vipIcon from '../../icons/occasion_offers_icon/vip.png';
import uniformIcon from '../../icons/occasion_offers_icon/uniform.png';

const offerIcons = {
    photography: cameraIcon,
    entertainment: entertainmentIcon,
    limousine: carIcon,
    cake: cakeIcon,
    balloons: balloonsIcon,
    yacht: boatIcon,
    buffet: buffetIcon,
    gifts: giftIcon,
    invites: inviteIcon,
    decorations: decorationIcon,
    boat: boatIcon,
    babyBuffet: buffetIcon,
    babyGifts: giftIcon,
    vip: vipIcon,
    gradGifts: giftIcon,
    gradInvites: inviteIcon,
    gradUniform: uniformIcon,
    gradCake: cakeIcon,
};

const occasionOffersData = {
    birthday: ['photography', 'entertainment', 'limousine', 'cake', 'balloons', 'yacht'],
    marriage: ['photography', 'buffet', 'limousine', 'gifts', 'invites', 'decorations'],
    engagement: ['photography', 'buffet', 'limousine', 'gifts', 'invites', 'decorations'],
    anniversary: ['photography', 'boat', 'limousine', 'balloons'],
    baby: ['photography', 'babyBuffet', 'limousine', 'babyGifts', 'balloons'],
    family: ['vip'],
    graduation: ['photography', 'gradGifts', 'limousine', 'buffet', 'balloons', 'gradInvites', 'gradUniform', 'gradCake'],
};

const OccasionOffersSection = ({ lang }) => {
    const t = translations[lang].offers;
    const [activeTab, setActiveTab] = useState('birthday');
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.2,
        rootMargin: '-100px'
    });

    const tabs = Object.keys(occasionOffersData);

    return (
        <motion.section
            ref={sectionRef}
            className="py-12 sm:py-16 lg:py-20 bg-gray-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-mikhak-bold tracking-tight text-gray-900 sm:text-4xl">
                        {t.title}
                    </h2>
                </motion.div>

                {/* Tabs */}
                <motion.div 
                    className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {tabs.map((tabKey) => (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            className={`relative px-4 py-2 rounded-full text-sm sm:text-base font-mikhak-medium transition-colors duration-300
                                ${activeTab === tabKey ? 'text-white' : 'text-gray-600 hover:bg-gray-200'}
                            `}
                        >
                            {activeTab === tabKey && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-violet-500 rounded-full"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{t.tabs[tabKey]}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Offers Grid */}
                <motion.div 
                    className="mt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6"
                        >
                            {occasionOffersData[activeTab].map((offerKey) => (
                                <motion.div
                                    key={offerKey}
                                    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg cursor-pointer"
                                    whileHover={{ y: -5, scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <img src={offerIcons[offerKey]} alt="" className="h-20 w-20 mb-4" />
                                    <span className="text-lg font-mikhak-medium text-gray-800">{t.services[offerKey]}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default OccasionOffersSection;
