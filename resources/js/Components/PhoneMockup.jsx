import React from 'react';
import { motion } from 'framer-motion';

const PhoneMockup = () => (
    <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
    >
        <div className="relative w-64 h-[500px] bg-gray-900 rounded-[40px] border-[10px] border-gray-700 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-lg"></div>
            <div className="w-full h-full bg-cover bg-center rounded-[30px] bg-shining flex items-center justify-center">
                <span className="text-gray-400 text-sm">App UI Mockup</span>
            </div>
        </div>
    </motion.div>
);

export default PhoneMockup;