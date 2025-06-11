import React from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const DownloadAppSection = ({ lang }) => {
  const t = translations[lang].downloadApp;

  return (
    <section className="py-16 bg-gradient-to-r from-purple-800 to-pink-600 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 text-white mb-10 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-mikhak-bold mb-4">{t.title}</h2>
            <p className="text-lg opacity-90 mb-8 font-mikhak-regular">{t.subtitle}</p>
            
            <p className="text-sm uppercase tracking-wider mb-4">{t.getApp}</p>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="transform hover:scale-105 transition-transform">
                <div className="h-[45px] w-[150px] flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" 
                    alt="Google Play" 
                    className="h-[45px] max-w-[150px]" 
                  />
                </div>
              </a>
              <a href="#" className="transform hover:scale-105 transition-transform">
                <div className="h-[45px] w-[150px] flex items-center justify-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png" 
                    alt="App Store" 
                    className="h-[45px] max-w-[150px]" 
                  />
                </div>
              </a>
            </div>
          </motion.div>
          
          {/* Phone Mockups - With consistent floating animations */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 relative h-[500px]"
          >
            <div className="flex justify-center items-center h-full">
              {/* First Phone */}
              <motion.div
                className="relative mx-4"
                initial={{ rotate: -6 }}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: -6
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Outer Frame */}
                <div className="relative border-gray-800 bg-gray-800 border-[6px] rounded-[2rem] h-[400px] w-[200px] shadow-xl">
                  {/* Top Bezel with Speaker */}
                  <div className="w-[100px] h-[14px] bg-gray-800 top-0 rounded-b-[0.8rem] left-1/2 -translate-x-1/2 absolute"></div>
                  {/* Right Side Button */}
                  <div className="h-[36px] w-[2px] bg-gray-800 absolute -right-[8px] top-[100px] rounded-l-lg"></div>
                  {/* Left Side Buttons */}
                  <div className="h-[26px] w-[2px] bg-gray-800 absolute -left-[8px] top-[60px] rounded-r-lg"></div>
                  <div className="h-[26px] w-[2px] bg-gray-800 absolute -left-[8px] top-[100px] rounded-r-lg"></div>
                  
                  {/* Inner Screen */}
                  <div className="rounded-[1.7rem] overflow-hidden w-full h-full bg-gradient-to-br from-[#6B1D8E] to-[#9B59B6] p-3">
                    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col h-full">
                      {/* Status bar */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-12 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="w-full h-2 rounded-full bg-white/20 mb-1.5"></div>
                          <div className="w-3/4 h-2 rounded-full bg-white/20"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white/10 rounded-lg p-2 flex flex-col justify-center items-center">
                              <div className="w-8 h-8 rounded-full bg-white/20 mb-1.5"></div>
                              <div className="w-full h-1.5 rounded-full bg-white/20 mb-1"></div>
                              <div className="w-2/3 h-1.5 rounded-full bg-white/20"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-2 mt-auto">
                          <div className="flex justify-between">
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Second Phone */}
              <motion.div
                className="relative mx-4"
                initial={{ rotate: 6 }}
                animate={{ 
                  y: [0, 10, 0],
                  rotate: 6
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Outer Frame */}
                <div className="relative border-gray-800 bg-gray-800 border-[6px] rounded-[2rem] h-[400px] w-[200px] shadow-xl">
                  {/* Top Bezel with Speaker */}
                  <div className="w-[100px] h-[14px] bg-gray-800 top-0 rounded-b-[0.8rem] left-1/2 -translate-x-1/2 absolute"></div>
                  {/* Right Side Button */}
                  <div className="h-[36px] w-[2px] bg-gray-800 absolute -right-[8px] top-[100px] rounded-l-lg"></div>
                  {/* Left Side Buttons */}
                  <div className="h-[26px] w-[2px] bg-gray-800 absolute -left-[8px] top-[60px] rounded-r-lg"></div>
                  <div className="h-[26px] w-[2px] bg-gray-800 absolute -left-[8px] top-[100px] rounded-r-lg"></div>
                  
                  {/* Inner Screen */}
                  <div className="rounded-[1.7rem] overflow-hidden w-full h-full bg-gradient-to-br from-pink-600 to-purple-700 p-3">
                    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="flex flex-col h-full">
                      {/* Status bar */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-12 h-1.5 rounded-full bg-white/20"></div>
                        <div className="w-6 h-1.5 rounded-full bg-white/20"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col gap-3">
                        <div className="bg-white/10 rounded-lg p-2">
                          <div className="w-full h-2 rounded-full bg-white/20 mb-1.5"></div>
                          <div className="w-3/4 h-2 rounded-full bg-white/20"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 flex-1">
                          {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white/10 rounded-lg p-2 flex flex-col justify-center items-center">
                              <div className="w-8 h-8 rounded-full bg-white/20 mb-1.5"></div>
                              <div className="w-full h-1.5 rounded-full bg-white/20 mb-1"></div>
                              <div className="w-2/3 h-1.5 rounded-full bg-white/20"></div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-2 mt-auto">
                          <div className="flex justify-between">
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                            <div className="w-6 h-6 rounded-full bg-white/20"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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








