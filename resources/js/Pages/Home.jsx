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
                {/* Abstract Shapes */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-shining rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 overflow-x-hidden">
                    <div className="p-4 sm:p-6 lg:p-8">
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
