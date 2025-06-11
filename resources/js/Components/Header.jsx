import React, { useState } from 'react';
import { LanguageIcon, MenuIcon } from './Icons';

const Header = () => {
    const [lang, setLang] = useState('en');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    const navLinks = [
        { name: 'Categories', href: '#' },
        { name: 'Shops', href: '#' },
        { name: 'Features', href: '#' },
        { name: 'How To Order', href: '#' },
        { name: 'FAQ', href: '#' },
    ];

    return (
        <>
            <nav className="flex items-center justify-between">
                <div className="text-2xl font-bold">Monasbtk</div>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="hover:text-gray-300 transition-colors">{link.name}</a>
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

            {isMenuOpen && (
                <div className="md:hidden mt-4 bg-white/10 rounded-lg p-4">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="block py-2 text-center hover:text-gray-300 transition-colors">{link.name}</a>
                    ))}
                </div>
            )}
        </>
    );
};

export default Header;