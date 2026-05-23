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
    const isRtl = lang === 'ar';
    const [activeTab, setActiveTab] = useState('birthday');
    const [sectionRef, isVisible] = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '-80px'
    }, true);

    const tabs = Object.keys(occasionOffersData);

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section 
            id="occasion-offers-section" 
            className="relative py-24 bg-gradient-to-b from-[#F9F7FC] to-white overflow-hidden"
            ref={sectionRef}
            dir={isRtl ? 'rtl' : 'ltr'}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div 
                    className="text-center mb-16"
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={titleVariants}
                >
                    <motion.h2 
                        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
                    >
                        {isRtl ? (
                            <>
                                لكل مناسبة، نقدم <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">عروضنا الخاصة</span>
                            </>
                        ) : (
                            <>
                                For Each Occasion, We Offer <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Our Services</span>
                            </>
                        )}
                    </motion.h2>
                    <div className="mt-3 flex justify-center">
                        <div className="h-[3px] w-24 bg-gradient-to-r from-primary to-secondary rounded-full" />
                    </div>
                </motion.div>

                {/* Glassmorphic sliding Tabs */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 p-1.5 bg-slate-100/50 backdrop-blur-sm rounded-3xl max-w-3xl mx-auto border border-slate-200/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {tabs.map((tabKey) => (
                        <button
                            key={tabKey}
                            onClick={() => setActiveTab(tabKey)}
                            className={`relative px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-bold transition-all duration-300 select-none cursor-pointer
                                ${activeTab === tabKey ? 'text-white' : 'text-slate-600 hover:text-slate-900'}
                                ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}
                            `}
                        >
                            {activeTab === tabKey && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-[0_4px_16px_rgba(121,75,199,0.2)]"
                                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                                />
                            )}
                            <span className="relative z-10">{t.tabs[tabKey]}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Offers Grid */}
                <motion.div 
                    className="mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6"
                        >
                            {occasionOffersData[activeTab].map((offerKey) => (
                                <motion.div
                                    key={offerKey}
                                    className="group relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_20px_45px_rgba(121,75,199,0.06)] hover:border-primary/10 transition-all duration-300 cursor-pointer select-none"
                                    whileHover={{ y: -6 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                >
                                    {/* Icon Container */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-primary/5 group-hover:border-primary/15 transition-all duration-300 relative">
                                        <img 
                                            src={offerIcons[offerKey]} 
                                            alt="" 
                                            className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-500 group-hover:scale-110" 
                                        />
                                    </div>
                                    <span className={`text-sm sm:text-base font-bold text-slate-700 group-hover:text-primary transition-colors duration-300 ${isRtl ? 'font-mikhak-medium' : 'font-outfit'}`}>
                                        {t.services[offerKey]}
                                    </span>

                                    {/* Bottom highlight bar */}
                                    <div className="mt-4 h-[3px] w-0 bg-gradient-to-r from-primary to-secondary rounded-full group-hover:w-12 transition-all duration-300"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default OccasionOffersSection;
