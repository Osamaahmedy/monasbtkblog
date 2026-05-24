import { useState, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Toast from '@/Components/Toast';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import monasbtkLogo from '../../images/monasbtk_colored_logo.png';
import { LanguageProvider, useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/translations';
import { LanguageIcon } from '@/Components/Icons';

function AuthenticatedLayoutContent({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const { lang, toggleLanguage } = useLanguage();
    const t = translations[lang] || translations.en;

    useEffect(() => {
        if (flash.success) setToast({ message: flash.success, type: 'success' });
        if (flash.error) setToast({ message: flash.error, type: 'error' });
    }, [flash]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: t.admin.sidebar.dashboard, href: route('dashboard'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: route().current('dashboard') },
        { name: t.admin.sidebar.articles, href: route('admin.articles.index'), icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z', active: route().current('admin.articles.*') },
        { name: t.admin.sidebar.categories, href: route('admin.categories.index'), icon: 'M4 6h16M4 12h16M4 18h16', active: route().current('admin.categories.*') },
        { name: t.admin.sidebar.comments, href: route('admin.comments.index'), icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', active: route().current('admin.comments.*') },
    ];

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F8FAFC] font-mikhak-regular overflow-x-hidden">
            {/* Desktop Sidebar */}
            <aside 
                className={`fixed top-0 ${lang === 'ar' ? 'right-0 border-l' : 'left-0 border-r'} z-40 h-screen transition-all duration-300 ease-in-out bg-white border-gray-100 ${isSidebarOpen ? 'w-72' : 'w-20'} hidden lg:block shadow-2xl shadow-gray-200/50`}
            >
                <div className="flex flex-col h-full px-4 py-8">
                    <div className="flex items-center justify-center mb-12">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                            <img src={monasbtkLogo} alt="Monasbtk Logo" className="h-10 w-auto" />
                            {isSidebarOpen && <span className="text-2xl font-mikhak-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Monasbtk</span>}
                        </Link>
                    </div>

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const IconWrapper = item.active ? motion.div : 'div';
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center p-4 rounded-2xl transition-all duration-300 group ${
                                        item.active 
                                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-secondary/20' 
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                                    }`}
                                >
                                    <svg className={`w-6 h-6 transition-colors ${item.active ? 'text-white' : 'group-hover:text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                                    </svg>
                                    {isSidebarOpen && <span className={`${lang === 'ar' ? 'mr-4' : 'ml-4'} font-mikhak-medium`}>{item.name}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="pt-8 mt-8 border-t border-gray-50">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-white ${isSidebarOpen ? '' : 'hidden'}`}>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-md">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-mikhak-bold text-gray-900 truncate w-32">{user.name}</p>
                                    <p className="text-xs text-gray-400 truncate w-32">{t.admin.sidebar.administrator}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Drawer (Sidebar) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black lg:hidden"
                        />
                        
                        {/* Drawer body */}
                        <motion.div
                            initial={{ x: lang === 'ar' ? '100%' : '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: lang === 'ar' ? '100%' : '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className={`fixed top-0 ${lang === 'ar' ? 'right-0' : 'left-0'} z-50 w-72 h-screen bg-white shadow-2xl flex flex-col p-6 lg:hidden`}
                        >
                            <div className="flex items-center justify-between mb-10">
                                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => setIsMobileMenuOpen(false)}>
                                    <img src={monasbtkLogo} alt="Monasbtk Logo" className="h-9 w-auto" />
                                    <span className="text-xl font-mikhak-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Monasbtk</span>
                                </Link>
                                <button 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <nav className="flex-1 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center p-4 rounded-xl transition-all duration-200 ${
                                            item.active 
                                                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md' 
                                                : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                        </svg>
                                        <span className={`${lang === 'ar' ? 'mr-4' : 'ml-4'} font-mikhak-medium text-sm`}>{item.name}</span>
                                    </Link>
                                ))}
                            </nav>

                            <div className="pt-6 border-t border-slate-100 mt-6">
                                <div className="p-3.5 rounded-xl bg-slate-50 flex items-center space-x-3 rtl:space-x-reverse">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-sm text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-mikhak-bold text-slate-800 truncate w-36">{user.name}</p>
                                        <p className="text-xs text-slate-400 truncate">{t.admin.sidebar.administrator}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Wrapper */}
            <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? (lang === 'ar' ? 'lg:mr-72' : 'lg:ml-72') : (lang === 'ar' ? 'lg:mr-20' : 'lg:ml-20')}`}>
                {/* Header Navbar */}
                <nav className={`sticky top-0 z-30 transition-all duration-300 px-4 lg:px-8 py-4 ${
                    scrolled 
                        ? 'bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm' 
                        : 'bg-transparent'
                }`}>
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        {/* Left Side: Hamburgers & Mob Logo */}
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            {/* Desktop toggle */}
                            <button 
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-primary transition-all shadow-sm hidden lg:block"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Mobile Hamburger toggle */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2.5 rounded-xl bg-white border border-gray-100 text-slate-600 hover:text-primary transition-all shadow-sm lg:hidden"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            {/* Mobile brand presentation */}
                            <Link href="/" className="flex items-center space-x-2 lg:hidden">
                                <img src={monasbtkLogo} alt="Monasbtk Logo" className="h-8 w-auto" />
                                <span className="text-lg font-mikhak-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Monasbtk</span>
                            </Link>
                        </div>

                        {/* Right Side: Account menu & Language Selector */}
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <button 
                                onClick={toggleLanguage} 
                                className="flex items-center space-x-2 rtl:space-x-reverse p-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-primary transition-all text-slate-700 h-[42px] px-3.5"
                            >
                                <LanguageIcon />
                                <span className="font-mikhak-bold text-xs uppercase">{lang === 'en' ? 'AR' : 'EN'}</span>
                            </button>

                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-primary transition-all">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary/10 to-secondary/10 text-primary flex items-center justify-center font-mikhak-bold text-sm">
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className="text-sm font-mikhak-medium text-gray-700 hidden sm:block">{user.name}</span>
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>{t.admin.sidebar.profile}</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">{t.admin.sidebar.logout}</Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {/* Page Header */}
                {header && (
                    <header className="px-4 lg:px-8 pt-8 pb-4">
                        <div className="max-w-7xl mx-auto">
                            {header}
                        </div>
                    </header>
                )}

                {/* Page Content */}
                <main className="px-4 lg:px-8 py-8 max-w-7xl mx-auto">
                    {children}
                </main>

                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast({ message: '', type: 'success' })} 
                />
            </div>
        </div>
    );
}

export default function AuthenticatedLayout({ header, children }) {
    return (
        <AuthenticatedLayoutContent header={header}>
            {children}
        </AuthenticatedLayoutContent>
    );
}

