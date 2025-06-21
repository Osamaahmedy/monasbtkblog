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
            className="md:w-1/2 relative h-[400px] md:h-[500px] overflow-hidden"
          >
            <div className="flex justify-center items-center h-full max-w-full">
              {/* First Phone */}
              <motion.div
                className="relative mx-1 md:mx-2 lg:mx-4 max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
                initial={{ rotate: -3 }}
                animate={{
                  y: [0, -10, 0],
                  rotate: [-3, -6, -3]
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Outer Frame */}
                <div className="relative border-gray-800 bg-gray-800 border-[4px] md:border-[5px] lg:border-[6px] rounded-[1.5rem] md:rounded-[2rem] h-[300px] md:h-[350px] lg:h-[400px] w-[150px] md:w-[175px] lg:w-[200px] shadow-xl max-w-full">
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
                      {/* App Store Download Screen */}
                      <div className="flex-1 flex flex-col">
                        {/* App Header */}
                        <div className="flex justify-between items-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white text-xs">←</span>
                          </div>
                          <div className="text-white text-xs font-bold">App Store</div>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white text-xs">⋮</span>
                          </div>
                        </div>
                        
                        {/* App Preview */}
                        <div className="bg-white/10 rounded-lg p-3 mb-3">
                          <div className="flex items-center mb-2">
                            <div className="w-12 h-12 rounded-xl bg-white/30 mr-2 flex items-center justify-center">
                              <span className="text-white text-lg">M</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-white text-sm font-bold mb-1">Monasbtk</div>
                              <div className="text-white/70 text-xs">{lang === 'ar' ? 'تنظيم المناسبات' : 'Event Planning'}</div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-white/70 text-xs">★★★★★</div>
                            <div className="text-white/70 text-xs">4.9</div>
                          </div>
                        </div>
                        
                        {/* Screenshots */}
                        <div className="mb-3">
                          <div className="text-white text-xs mb-2">{lang === 'ar' ? 'لقطات الشاشة' : 'Screenshots'}</div>
                          <div className="flex space-x-2 overflow-x-auto pb-2">
                            <div className="w-20 h-36 rounded-lg bg-white/20 flex-shrink-0"></div>
                            <div className="w-20 h-36 rounded-lg bg-white/20 flex-shrink-0"></div>
                            <div className="w-20 h-36 rounded-lg bg-white/20 flex-shrink-0"></div>
                          </div>
                        </div>
                        
                        {/* Download Button */}
                        <div className="mt-auto">
                          <button className="w-full py-2 bg-white/20 rounded-lg text-white text-sm font-bold">
                            {lang === 'ar' ? 'تنزيل' : 'DOWNLOAD'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Second Phone */}
              <motion.div
                className="relative mx-1 md:mx-2 lg:mx-4 max-w-[160px] md:max-w-[180px] lg:max-w-[200px]"
                initial={{ rotate: 3 }}
                animate={{
                  y: [0, 10, 0],
                  rotate: [3, 6, 3]
                }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 5,
                    ease: "easeInOut"
                  },
                  rotate: {
                    repeat: Infinity,
                    duration: 7,
                    ease: "easeInOut"
                  }
                }}
              >
                {/* Outer Frame */}
                <div className="relative border-gray-800 bg-gray-800 border-[4px] md:border-[5px] lg:border-[6px] rounded-[1.5rem] md:rounded-[2rem] h-[300px] md:h-[350px] lg:h-[400px] w-[150px] md:w-[175px] lg:w-[200px] shadow-xl max-w-full">
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
                      {/* Google Play Download Screen */}
                      <div className="flex-1 flex flex-col">
                        {/* App Header */}
                        <div className="flex justify-between items-center mb-3">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white text-xs">←</span>
                          </div>
                          <div className="text-white text-xs font-bold">Google Play</div>
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-white text-xs">⋮</span>
                          </div>
                        </div>
                        
                        {/* App Preview */}
                        <div className="bg-white/10 rounded-lg p-3 mb-3">
                          <div className="flex items-center mb-2">
                            <div className="w-12 h-12 rounded-xl bg-white/30 mr-2 flex items-center justify-center">
                              <span className="text-white text-lg">M</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-white text-sm font-bold mb-1">Monasbtk</div>
                              <div className="text-white/70 text-xs">{lang === 'ar' ? 'تنظيم المناسبات' : 'Event Planning'}</div>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-white/70 text-xs">★★★★★</div>
                            <div className="text-white/70 text-xs">4.8</div>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="mb-3">
                          <div className="text-white text-xs mb-2">{lang === 'ar' ? 'المميزات' : 'Features'}</div>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-white/20 mr-2 flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <div className="text-white text-xs">{lang === 'ar' ? 'تخطيط سهل' : 'Easy Planning'}</div>
                            </div>
                            <div className="flex items-center">
                              <div className="w-6 h-6 rounded-full bg-white/20 mr-2 flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                              <div className="text-white text-xs">{lang === 'ar' ? 'حجز فوري' : 'Instant Booking'}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Download Button */}
                        <div className="mt-auto">
                          <button className="w-full py-2 bg-white/20 rounded-lg text-white text-sm font-bold">
                            {lang === 'ar' ? 'تثبيت' : 'INSTALL'}
                          </button>
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









