import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageIcon, MenuIcon } from './Icons';
import { translations } from '../translations';
import monasbtkIcon from '../../icons/monasbtk_white_icon.png';

const Header = ({ lang, toggleLanguage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const t = translations[lang];

    const navLinks = [
        { name: t.nav.categories, href: '#occasions-section' },
        { name: t.nav.shops, href: '#occasion-offers-section' },
        { name: t.nav.features, href: '#features-section' },
        { name: t.nav.howToOrder, href: '#how-to-order-section' },
        { name: t.nav.faq, href: '#faq-section' },
    ];

    return (
        <>
            <nav className="flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2"
                >
                    <img src={monasbtkIcon} alt="Monasbtk Logo" className="h-8 w-8" />
                    <div className="text-2xl font-bold">Monasbtk</div>
                </motion.div>
                <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse font-mikhak-medium">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            className="hover:text-gray-300 transition-colors"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={toggleLanguage} className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10">
                        <LanguageIcon />
                        <span className="font-semibold">{lang === 'en' ? 'AR' : 'EN'}</span>
                    </button>
                    <button className="md:hidden p-2 rounded-md hover:bg-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <MenuIcon />
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 bg-white/10 rounded-lg p-4"
                    >
                        {navLinks.map((link) => (
                            <a key={link.name} href={link.href} className="block py-2 text-center hover:text-gray-300 transition-colors">{link.name}</a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;

