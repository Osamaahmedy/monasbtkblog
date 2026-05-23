import React, { useState } from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import AboutUs from '../Components/AboutUs';
import OccasionsSection from '../Components/OccasionsSection';
import OccasionOffersSection from '../Components/OccasionOffersSection';
import MiddleBannerSection from '../Components/MiddleBannerSection';
import FAQSection from '../Components/FAQSection';
import FeaturesSection from '../Components/FeaturesSection';
import HowToOrderSection from '../Components/HowToOrderSection';
import DownloadAppSection from '../Components/DownloadAppSection';
import ReviewSection from '../Components/ReviewSection';
import BlogSection from '../Components/BlogSection';
import Footer from '../Components/Footer';
import { Head } from '@inertiajs/react';

export default function Home({ articles }) {
    const [lang, setLang] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('monasbtk_lang') || 'en';
        }
        return 'en';
    });

    React.useEffect(() => {
        localStorage.setItem('monasbtk_lang', lang);
    }, [lang]);

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="overflow-x-hidden max-w-full">
            <Head title="Home">
                <meta name="description" content="Monasbtk - Your one-stop destination for planning and organizing perfect celebrations and events. Download our app now!" />
                <meta name="keywords" content="Monasbtk, events, occasions, celebrations, party planning, Saudi Arabia" />
            </Head>
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-primary via-shining to-secondary text-white">
                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

                {/* Animated Glowing Light Beam */}
                <div className="absolute top-0 left-1/4 w-1/2 h-[450px] bg-purple-400/20 rounded-full blur-[140px] pointer-events-none animate-pulse-glow"></div>

                {/* Abstract Shapes with Fixed Typo-Animations */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-shining/40 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob"></div>
                <div className="absolute top-10 right-10 w-80 h-80 bg-secondary/40 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob animate-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/40 rounded-full mix-blend-screen filter blur-2xl opacity-60 animate-blob animate-delay-4000"></div>

                <div className="relative z-10 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <Header lang={lang} toggleLanguage={toggleLanguage} />
                        <Hero lang={lang} />
                    </div>
                    <AboutUs lang={lang} />
                </div>
            </div>
            <div className="overflow-x-hidden">
                <OccasionsSection lang={lang} />
                <OccasionOffersSection lang={lang} />
                <FeaturesSection lang={lang} />
                <HowToOrderSection lang={lang} />
                <DownloadAppSection lang={lang} />
                <MiddleBannerSection lang={lang} />
                <FAQSection lang={lang} />
                <ReviewSection lang={lang} />
                <BlogSection lang={lang} articles={articles} />
                <Footer lang={lang} />
            </div>
        </div>
    );
}
