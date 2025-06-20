import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const FAQSection = ({ lang }) => {
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState(null);
  const isRTL = lang === 'ar';

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
    <section id="faq-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header with decorative elements */}
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl -z-10"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-mikhak-bold text-gray-900 mb-4 inline-block relative"
          >
            {t.title}
            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </motion.h2>
        </div>

        {/* FAQ Cards */}
        <div className="max-w-4xl mx-auto">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-6"
            >
              <motion.div 
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-l-4 ${openIndex === index ? 'border-primary' : 'border-transparent'} transition-all duration-300`}
                whileHover={{ 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  y: -2
                }}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className={`w-full py-5 px-6 flex items-center justify-between text-left ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <h3 className={`text-lg font-mikhak-medium text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {item.question}
                  </h3>
                  <div className={`flex-shrink-0 ml-4 ${isRTL ? 'ml-0 mr-4' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${openIndex === index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {openIndex === index ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-gray-50"
                >
                  <div className="px-6 py-5">
                    <p className={`text-base text-gray-600 font-mikhak-regular ${isRTL ? 'text-right' : 'text-left'}`}>
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;



