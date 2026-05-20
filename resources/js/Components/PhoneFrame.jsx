import React from 'react';
import { motion } from 'framer-motion';

export default function PhoneFrame({ imgSrc, alt = 'App Screen', className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative mx-auto select-none ${className}`}
        >
            {/* Outer glow */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-[#9B59B6]/20 blur-2xl" />

            {/* Device body */}
            <div className="relative border-[6px] md:border-[8px] border-gray-900 bg-gray-950 rounded-[2.4rem] md:rounded-[2.9rem] h-[430px] sm:h-[470px] md:h-[540px] lg:h-[600px] w-[200px] sm:w-[225px] md:w-[255px] lg:w-[285px] shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-visible">

                {/* Side buttons */}
                <div className="absolute -right-[9px] md:-right-[11px] top-[118px] md:top-[132px] h-[44px] w-[3px] rounded-l-full bg-gray-800" />
                <div className="absolute -left-[9px] md:-left-[11px] top-[72px] md:top-[82px] h-[26px] w-[3px] rounded-r-full bg-gray-800" />
                <div className="absolute -left-[9px] md:-left-[11px] top-[108px] md:top-[118px] h-[26px] w-[3px] rounded-r-full bg-gray-800" />

                {/* Speaker / notch area */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
                    <div className="mx-auto h-[18px] w-[82px] rounded-b-[1rem] bg-gray-900 shadow-inner" />
                </div>

                {/* Screen */}
                <div className="relative z-10 h-full w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-black">
                    {imgSrc ? (
                        <img
                            src={imgSrc}
                            alt={alt}
                            className="h-full w-full object-cover object-top"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-500">
                            Image Placeholder
                        </div>
                    )}

                    {/* Screen shine */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

                    {/* Bottom subtle fade */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/15 to-transparent" />
                </div>

                {/* Bottom chin highlight */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-14 rounded-full bg-white/10 z-20" />
            </div>
        </motion.div>
    );
}