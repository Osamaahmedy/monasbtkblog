import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';

const ReviewSection = ({ lang }) => {
  const isRTL = lang === 'ar';
  const t = translations[lang].review;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.email.trim()) newErrors.email = t.required;
    if (!formData.message.trim()) newErrors.message = t.required;
    
    // Basic email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className={`${isRTL ? 'lg:order-2 text-right' : 'lg:order-1 text-left'}`}
            >
              <div className="relative">
                {/* Decorative elements */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl -z-10"
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
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-lg text-gray-600 mt-6 font-mikhak-regular"
                >
                  {t.subtitle}
                </motion.p>
                
                {/* Decorative illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-10 hidden lg:block"
                >
                  <div className="relative h-64">
                    <div className="absolute top-0 left-0 w-full h-full">
                      {/* SVG illustration or image can go here */}
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl flex items-center justify-center">
                        <svg className="w-32 h-32 text-primary/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right side - Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className={`${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-xl p-8 relative"
              >
                {/* Success message */}
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center z-10"
                  >
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-mikhak-bold text-gray-900 mb-2">{t.success}</h3>
                    </div>
                  </motion.div>
                )}
                
                <form onSubmit={handleSubmit} className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-mikhak-medium text-gray-700 mb-1">
                      {t.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-mikhak-medium text-gray-700 mb-1">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-mikhak-medium text-gray-700 mb-1">
                      {t.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.phonePlaceholder}
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-mikhak-medium text-gray-700 mb-1">
                      {t.message} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.messagePlaceholder}
                      rows="4"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors ${isRTL ? 'text-right' : 'text-left'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    ></textarea>
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>
                  
                  <div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 text-white bg-gradient-to-r from-primary to-secondary rounded-lg font-mikhak-medium text-base transition-all duration-200 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Processing...</span>
                        </div>
                      ) : t.submit}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
