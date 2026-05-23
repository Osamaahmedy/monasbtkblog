import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import PhoneFrame from './PhoneFrame';

// --- Apple / Google SVG Icons ---
const AppleIcon = () => (
  <svg viewBox="0 0 814 1000" className="w-6 h-6 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 31 0 108.2 2.6 168.5 80.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
  </svg>
);

const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gp1-dl" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00C6FF" />
        <stop offset="100%" stopColor="#0078FF" />
      </linearGradient>
      <linearGradient id="gp2-dl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD800" />
        <stop offset="100%" stopColor="#FF8A00" />
      </linearGradient>
      <linearGradient id="gp3-dl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3A44" />
        <stop offset="100%" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="gp4-dl" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#32DF84" />
        <stop offset="100%" stopColor="#00C170" />
      </linearGradient>
    </defs>
    <path fill="url(#gp1-dl)" d="M30 6.5C18.6 0 5.4 0.8 0 9.2L200 256 30 6.5z" />
    <path fill="url(#gp2-dl)" d="M512 256l-96-55.6-59.2 55.6 59.2 55.6L512 256z" />
    <path fill="url(#gp3-dl)" d="M0 502.8C5.4 511.2 18.6 512 30 505.5L200 256 0 502.8z" />
    <path fill="url(#gp4-dl)" d="M200 256L0 9.2L370 200.4 200 256z M200 256L370 311.6 0 502.8L200 256z" />
  </svg>
);

// --- Reusable StoreButton ---
const StoreButton = ({ href, icon, topLabel, bottomLabel, isComingSoon = false, isRtl }) => (
  <motion.a
    href={href}
    target={isComingSoon ? undefined : '_blank'}
    rel="noopener noreferrer"
    whileHover={isComingSoon ? {} : { scale: 1.04, y: -2 }}
    whileTap={isComingSoon ? {} : { scale: 0.96 }}
    className={`
      relative flex items-center gap-3 px-5 py-3 rounded-2xl min-w-[170px]
      bg-white/[0.04] border border-white/10 backdrop-blur-md
      hover:bg-white/[0.08] hover:border-white/20
      shadow-xl transition-all duration-300 overflow-hidden group select-none
      ${isComingSoon ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
    `}
  >
    {!isComingSoon && (
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    )}
    {icon}
    <div className="flex flex-col leading-tight text-left">
      <span className={`text-white/50 text-[10px] tracking-wider ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>
        {topLabel}
      </span>
      <span className={`text-white text-sm font-bold ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
        {bottomLabel}
      </span>
    </div>
  </motion.a>
);

// --- Main Component ---
const DownloadAppSection = ({ lang }) => {
  const t = translations[lang].downloadApp;
  const isRtl = lang === 'ar';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section
      id="download-section"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-[#1C0E24] via-[#481E54] to-[#691C62]"
    >
      {/* Background neon glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:w-1/2 text-white space-y-8"
          >
            {/* Live Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs font-semibold backdrop-blur-md shadow-inner select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className={isRtl ? 'font-mikhak-medium' : 'font-outfit'}>
                  {isRtl ? 'متاح الآن على متجر التطبيقات' : 'Now Live on App Store'}
                </span>
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className={`text-3.5xl sm:text-4.5xl lg:text-5.5xl font-extrabold leading-tight text-white ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
            >
              {t.title}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className={`text-base sm:text-lg text-white/70 leading-relaxed max-w-lg ${isRtl ? 'font-mikhak-regular' : 'font-outfit font-light'}`}
            >
              {t.subtitle}
            </motion.p>

            {/* Download Buttons */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className={`text-xs font-bold text-white/40 uppercase tracking-widest ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                {t.getApp}
              </p>
              <div className="flex flex-wrap gap-4">
                <StoreButton
                  href="https://apps.apple.com/sa/app/monasbtk/id6755626634"
                  icon={<AppleIcon />}
                  topLabel={isRtl ? 'تحميل من' : 'Download on the'}
                  bottomLabel="App Store"
                  isRtl={isRtl}
                />
                <StoreButton
                  href="#"
                  icon={<GooglePlayIcon />}
                  topLabel={isRtl ? 'قريباً على' : 'Coming soon on'}
                  bottomLabel="Google Play"
                  isComingSoon={true}
                  isRtl={isRtl}
                />
              </div>
            </motion.div>

            {/* Social Trust Metrics */}
            <motion.div
              variants={itemVariants}
              className="flex gap-10 pt-4 border-t border-white/5"
            >
              {[
                { value: '4.9★', label: isRtl ? 'تقييم التطبيق' : 'User Rating' },
                { value: '10K+', label: isRtl ? 'مستخدم نشط' : 'Active Users' },

              ].map((stat) => (
                <div key={stat.label} className="text-left select-none">
                  <p className={`text-white font-extrabold text-2xl ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>{stat.value}</p>
                  <p className={`text-white/40 text-xs font-semibold mt-1 ${isRtl ? 'font-mikhak-regular' : 'font-outfit'}`}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Double Phone Mockups & Floating Widgets */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 relative h-[450px] sm:h-[550px] lg:h-[600px] w-full"
          >
            {/* Ambient Background Radial Glow behind phones */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="flex justify-center items-center h-full gap-4 md:gap-6 relative">
              {/* Floating Widgets */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                className={`absolute top-16 ${isRtl ? 'right-0 sm:right-6' : 'left-0 sm:left-6'} px-4 py-2.5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2 z-20 cursor-pointer select-none`}
              >
                <span className="text-lg">⭐</span>
                <span className={`text-xs font-bold text-white ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}>
                  {isRtl ? '٤.٩ تقييم مستخدمين' : '4.9 Rating'}
                </span>
              </motion.div>


              {/* Phone 1 */}
              <motion.div
                className="relative"
                animate={{ y: [0, -12, 0], rotate: [-3, -6, -3] }}
                transition={{
                  y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut' }
                }}
              >
                <div className="scale-[0.8] xs:scale-[0.85] sm:scale-95 md:scale-100 origin-center">
                  <PhoneFrame imgSrc="/images/app_mockup.png" />
                </div>
              </motion.div>

              {/* Phone 2 */}
              <motion.div
                className="relative"
                animate={{ y: [0, 12, 0], rotate: [3, 6, 3] }}
                transition={{
                  y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 7, ease: 'easeInOut' }
                }}
              >
                <div className="scale-[0.8] xs:scale-[0.85] sm:scale-95 md:scale-100 origin-center">
                  <PhoneFrame imgSrc="/images/app_mockup.png" />
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;