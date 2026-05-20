import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import monasbtkMainLogo from '../../images/monasbtk_main_logo.png';

// Social icons
import linkedinLogo from '../../icons/linkedin_logo.png';
import instagramLogo from '../../icons/instagram_logo.png';
import whatsappLogo from '../../icons/whatsapp_logo.png';
import xLogo from '../../icons/x_logo.png';

const AppleIcon = () => (
  <svg viewBox="0 0 814 1000" className="w-6 h-6 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46.7 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 31 0 108.2 2.6 168.5 80.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
  </svg>
);

const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gp1-footer" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#00C6FF" />
        <stop offset="100%" stopColor="#0078FF" />
      </linearGradient>
      <linearGradient id="gp2-footer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD800" />
        <stop offset="100%" stopColor="#FF8A00" />
      </linearGradient>
      <linearGradient id="gp3-footer" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF3A44" />
        <stop offset="100%" stopColor="#C31162" />
      </linearGradient>
      <linearGradient id="gp4-footer" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#32DF84" />
        <stop offset="100%" stopColor="#00C170" />
      </linearGradient>
    </defs>
    <path fill="url(#gp1-footer)" d="M30 6.5C18.6 0 5.4 0.8 0 9.2L200 256 30 6.5z" />
    <path fill="url(#gp2-footer)" d="M512 256l-96-55.6-59.2 55.6 59.2 55.6L512 256z" />
    <path fill="url(#gp3-footer)" d="M0 502.8C5.4 511.2 18.6 512 30 505.5L200 256 0 502.8z" />
    <path fill="url(#gp4-footer)" d="M200 256L0 9.2L370 200.4 200 256z M200 256L370 311.6 0 502.8L200 256z" />
  </svg>
);

const StoreButton = ({ href, icon, topLabel, bottomLabel, isComingSoon = false }) => (
  <motion.a
    href={href}
    target={isComingSoon ? undefined : '_blank'}
    rel="noopener noreferrer"
    whileHover={{ scale: 1.04, y: -2 }}
    whileTap={{ scale: 0.96 }}
    className={`
            relative flex items-center gap-3 px-5 py-3 rounded-2xl min-w-[160px]
            bg-black/30 backdrop-blur-md border border-white/15
            hover:bg-black/45 hover:border-white/25
            shadow-lg hover:shadow-black/20
            transition-all duration-300 overflow-hidden group
            ${isComingSoon ? 'cursor-default opacity-80' : 'cursor-pointer'}
        `}
  >
    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    {icon}
    <div className="flex flex-col leading-tight">
      <span className="text-white/55 text-[10px] font-mikhak-regular tracking-wider uppercase">
        {topLabel}
      </span>
      <span className="text-white text-sm font-mikhak-bold">
        {bottomLabel}
      </span>
    </div>
  </motion.a>
);

const Footer = ({ lang }) => {
  const t = translations[lang].footer;
  const isRTL = lang === 'ar';
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    linkedin: linkedinLogo,
    instagram: instagramLogo,
    whatsapp: whatsappLogo,
    twitter: xLogo,
  };

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'} className="bg-gradient-to-b from-primary via-[#6B00C9] to-[#4F0AA3] text-white">
      {/* Top CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-8 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-14 sm:py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${isRTL ? 'md:flex-row-reverse' : ''}`}
          >
            <div className={`w-full md:w-2/3 ${isRTL ? 'text-center md:text-right' : 'text-center md:text-left'}`}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs font-mikhak-medium mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {isRTL ? 'حمّل التطبيق الآن' : 'Download the app now'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-mikhak-bold mb-4 leading-tight">
                {t.downloadTitle}
              </h2>

              <p className="text-white/85 text-base sm:text-lg font-mikhak-regular max-w-2xl mx-auto md:mx-0 mb-7 leading-relaxed">
                {t.downloadText}
              </p>

              <div className={`flex flex-wrap gap-4 justify-center ${isRTL ? 'md:justify-end' : 'md:justify-start'}`}>
                <StoreButton
                  href="https://apps.apple.com/sa/app/monasbtk/id6755626634"
                  icon={<AppleIcon />}
                  topLabel={isRTL ? 'تحميل من' : 'Download on the'}
                  bottomLabel="App Store"
                />
                <StoreButton
                  href="#"
                  icon={<GooglePlayIcon />}
                  topLabel={isRTL ? 'قريباً على' : 'Coming soon on'}
                  bottomLabel="Google Play"
                  isComingSoon
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full md:w-1/3 flex justify-center"
            >
              <img
                src={monasbtkMainLogo}
                alt="Monasbtk Logo"
                className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/6 border border-white/10 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-mikhak-bold mb-4">{t.aboutTitle}</h3>
            <p className="text-white/80 mb-5 font-mikhak-regular leading-relaxed">
              {t.aboutText}
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { href: 'https://www.linkedin.com/company/monasbatech/', icon: socialIcons.linkedin, label: 'LinkedIn' },
                { href: 'https://www.instagram.com/monasbtkapp?igsh=OThvZDR4YzF1bmJp&utm_source=qr', icon: socialIcons.instagram, label: 'Instagram' },
                { href: 'https://wa.me/966542728123', icon: socialIcons.whatsapp, label: 'WhatsApp' },
                { href: 'https://x.com/monasbtkapp?s=21&t=u1kZpmzFndvZZJvLgvtGAA', icon: socialIcons.twitter, label: 'X' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="bg-white/10 hover:bg-white/18 p-2.5 rounded-full transition-colors shadow-md"
                  aria-label={social.label}
                >
                  <img src={social.icon} alt={social.label} className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-sm bg-white/6 border border-white/10 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-mikhak-bold mb-4">{t.quickLinksTitle}</h3>
            <ul className="space-y-3">
              {t.quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-2 font-mikhak-regular group"
                  >
                    <span className="text-secondary group-hover:translate-x-1 transition-transform duration-200">
                      ›
                    </span>
                    <span>{link.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-sm bg-white/6 border border-white/10 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-mikhak-bold mb-4">{t.contactTitle}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 bg-white/10 p-2 rounded-full">
                  <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/80 font-mikhak-regular break-words">{t.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 bg-white/10 p-2 rounded-full">
                  <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-white/80 font-mikhak-regular" dir="ltr">{t.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 bg-white/10 p-2 rounded-full">
                  <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-white/80 font-mikhak-regular">{t.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Bottom Bar */}
      <section className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} items-center justify-between gap-4`}>
            <p className="text-white/70 text-sm font-mikhak-regular">
              © {currentYear} {t.copyright}
            </p>

            <div className="flex flex-wrap gap-5 justify-center">
              {t.bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-white/70 hover:text-white text-sm transition-colors font-mikhak-regular"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;