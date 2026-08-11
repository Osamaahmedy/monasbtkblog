import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageIcon, MenuIcon } from './Icons';
import { translations } from '../translations';
import monasbtkIcon from '../../images/monasbtk_colored_logo.png';

const Header = ({ lang, toggleLanguage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = translations[lang];

    const navLinks = [
        { name: t.nav.categories, href: '/#occasions-section' },
        { name: t.nav.shops, href: '/#occasion-offers-section' },
        { name: t.nav.features, href: '/#features-section' },
        { name: t.nav.howToOrder, href: '/#how-to-order-section' },
        { name: t.nav.faq, href: '/#faq-section' },
        { name: t.nav.blog, href: '/blog' },
    ];

    return (
        <>
            <nav className="flex items-center justify-between py-2">
                <motion.a
                    href="/"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2.5 group"
                >
                    <img src={monasbtkIcon} alt="Monasbtk Logo" className="h-8 w-8 object-contain transition-transform group-hover:scale-105" />
                    <div className="text-2xl font-bold tracking-tight text-white font-mikhak-bold">Monasbtk</div>
                </motion.a>
                
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8 rtl:space-x-reverse font-mikhak-medium">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                            className="hover:text-white/80 transition-colors text-white/90 text-sm lg:text-base"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <button 
                        onClick={toggleLanguage} 
                        className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-white text-xs font-bold active:scale-95"
                    >
                        <LanguageIcon />
                        <span>{lang === 'en' ? 'AR' : 'EN'}</span>
                    </button>
                    <button 
                        className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 border border-white/10" 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Navigation Menu"
                    >
                        <MenuIcon />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0.9, y: -10 }}
                        animate={{ opacity: 1, scaleY: 1, y: 0 }}
                        exit={{ opacity: 0, scaleY: 0.9, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        style={{ originY: 0, willChange: "transform, opacity" }}
                        className="md:hidden mt-3 bg-black/50 backdrop-blur-xl border border-white/15 rounded-2xl p-3 shadow-2xl space-y-1 relative z-50 font-mikhak-medium"
                    >
                        {navLinks.map((link) => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                onClick={() => setIsMenuOpen(false)}
                                className="block py-2.5 px-4 text-center rounded-xl text-white hover:bg-white/15 transition-all active:scale-98 text-sm"
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;

