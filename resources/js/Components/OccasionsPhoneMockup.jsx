import React from 'react';
import { motion } from 'framer-motion';

const OccasionsPhoneMockup = () => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
    >
        {/* Outer Frame */}
        <div className="relative mx-auto border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[550px] w-[270px] shadow-xl">
            {/* Top Bezel with Speaker */}
            <div className="w-[140px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            {/* Right Side Button */}
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -right-[11px] top-[124px] rounded-l-lg"></div>
            {/* Left Side Buttons */}
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[70px] rounded-r-lg"></div>
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[11px] top-[120px] rounded-r-lg"></div>
            {/* Inner Screen */}
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-shining flex items-center justify-center">
                 <span className="text-white text-lg font-bold">Occasions</span>
            </div>
        </div>
    </motion.div>
);

export default OccasionsPhoneMockup;