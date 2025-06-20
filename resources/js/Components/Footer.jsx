import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import monasbtkMainLogo from '../../images/monasbtk_main_logo.png';

// Import local social media icons
import linkedinLogo from '../../icons/linkedin_logo.png';
import instagramLogo from '../../icons/instagram_logo.png';
import whatsappLogo from '../../icons/whatsapp_logo.png';
import xLogo from '../../icons/x_logo.png';

const Footer = ({ lang }) => {
  const t = translations[lang].footer;
  const isRTL = lang === 'ar';
  const currentYear = new Date().getFullYear();
  
  // Social media icon imports from local resources
  const socialIcons = {
    linkedin: linkedinLogo,
    instagram: instagramLogo,
    whatsapp: whatsappLogo,
    twitter: xLogo
  };
  
  return (
    <footer className="bg-gradient-to-b from-primary to-[#6B00C9] text-white">
      {/* Top Banner */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary opacity-5 blur-3xl"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col md:flex-row items-center ${isRTL ? 'md:flex-row-reverse' : ''} justify-between gap-8`}
          >
            <div className={`text-center md:text-${isRTL ? 'right' : 'left'} max-w-xl`}>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-mikhak-bold mb-4"
              >
                {t.downloadTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-white/90 mb-6 font-mikhak-regular"
              >
                {t.downloadText}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`flex ${isRTL ? 'justify-end md:justify-start' : 'justify-center md:justify-start'} space-x-4 rtl:space-x-reverse`}
              >
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-8" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-8" />
                </motion.a>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={monasbtkMainLogo} 
                alt="Monasbtk Logo" 
                className="h-40 w-auto" // Increased from h-28 to h-40
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Column 1: About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-mikhak-bold mb-4">{t.aboutTitle}</h3>
            <p className="text-white/80 mb-4 font-mikhak-regular">{t.aboutText}</p>
            
            <div className="flex space-x-3 rtl:space-x-reverse mt-6">
              <motion.a 
                href="https://www.linkedin.com/company/monasbatech/" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors shadow-md"
              >
                <img src={socialIcons.linkedin} alt="LinkedIn" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/monasbtkapp?igsh=OThvZDR4YzF1bmJp&utm_source=qr" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors shadow-md"
              >
                <img src={socialIcons.instagram} alt="Instagram" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://wa.me/966542728123" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors shadow-md"
              >
                <img src={socialIcons.whatsapp} alt="WhatsApp" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://x.com/monasbtkapp?s=21&t=u1kZpmzFndvZZJvLgvtGAA" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors shadow-md"
              >
                <img src={socialIcons.twitter} alt="X" className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Column 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-mikhak-bold mb-4">{t.quickLinksTitle}</h3>
            <ul className="space-y-2">
              {t.quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-white/80 hover:text-white transition-colors flex items-center gap-2 font-mikhak-regular"
                  >
                    <span className="text-secondary">›</span> {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Column 3: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-mikhak-bold mb-4">{t.contactTitle}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 bg-white/10 p-2 rounded-full">
                  <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/80 font-mikhak-regular">{t.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1 bg-white/10 p-2 rounded-full">
                  <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-white/80 font-mikhak-regular">{t.phone}</span>
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
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-8">
        <div className="container mx-auto px-4 py-6">
          <div className={`flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} justify-between items-center`}>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-white/70 text-sm font-mikhak-regular"
            >
              © {currentYear} {t.copyright}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0"
            >
              {t.bottomLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="text-white/70 hover:text-white text-sm transition-colors font-mikhak-regular"
                >
                  {link.text}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;






