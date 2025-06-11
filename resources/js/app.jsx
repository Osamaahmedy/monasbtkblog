import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import Header from './Components/Header';
import Hero from './Components/Hero';
import AboutUs from './Components/AboutUs';

const App = () => {
    const [lang, setLang] = useState('en');

    const toggleLanguage = () => {
        setLang(lang === 'en' ? 'ar' : 'en');
    };

    return (
        <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-primary via-shining to-secondary text-white">
                {/* Abstract Shapes */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-shining rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 right-0 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                    <Header lang={lang} toggleLanguage={toggleLanguage} />
                    <Hero lang={lang} />
                </div>
            </div>
            <AboutUs lang={lang} />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
