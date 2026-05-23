import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../translations';

const FAQSection = ({ lang }) => {
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState(null);
  const isRtl = lang === 'ar';

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    { question: t.customize.question, answer: t.customize.answer },
    { question: t.booking.question, answer: t.booking.answer },
    { question: t.verified.question, answer: t.verified.answer },
    { question: t.tracking.question, answer: t.tracking.answer },
    { question: t.eventTypes.question, answer: t.eventTypes.answer },
  ];

  return (
    <section 
      id="faq-section" 
      className="relative py-24 bg-gradient-to-b from-[#F9F7FC] to-white overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(121,75,199,0.025)_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-r from-primary/15 to-secondary/15 blur-2xl -z-10"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 inline-block relative ${isRtl ? 'font-mikhak-bold' : 'font-outfit'}`}
          >
            {isRtl ? (
              <>
                الأسئلة <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">الشائعة</span>
              </>
            ) : (
              <>
                Frequently Asked <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
              </>
            )}
            <div className="absolute -bottom-3 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </motion.h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-5">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative"
            >
              <div 
                className={`overflow-hidden border border-slate-100 rounded-3xl transition-all duration-500 shadow-sm hover:shadow-[0_15px_30px_rgba(121,75,199,0.04)]
                  ${openIndex === index 
                    ? 'bg-gradient-to-r from-purple-50/30 via-white to-pink-50/10 border-primary/20 shadow-[0_20px_40px_rgba(121,75,199,0.05)]' 
                    : 'bg-white hover:border-primary/15'
                  }
                `}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleOpen(index)}
                  className={`w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left cursor-pointer focus:outline-none select-none ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <h3 className={`text-base sm:text-lg font-bold text-slate-800 transition-colors duration-300 ${openIndex === index ? 'text-primary' : 'text-slate-700'} ${isRtl ? 'text-right font-mikhak-medium' : 'text-left font-outfit'}`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 ${isRtl ? 'mr-6' : 'ml-6'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 
                      ${openIndex === index ? 'bg-primary text-white scale-110 shadow-md shadow-primary/25' : 'bg-slate-50 text-slate-500'}`}
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform duration-350 ${openIndex === index ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                
                {/* Collapsible Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden bg-slate-50/40 border-t border-slate-100"
                    >
                      <div className="px-6 py-5 sm:px-8 sm:py-6">
                        <p className={`text-sm sm:text-base text-slate-500 leading-relaxed ${isRtl ? 'text-right font-mikhak-regular' : 'text-left font-outfit font-light'}`}>
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
