import React from 'react';
import PhoneMockup from './PhoneMockup';
import { translations } from '../translations';

const Hero = ({ lang }) => {
    const t = translations[lang];

    return (
        <main className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-between">
            {/* Left Side: Headline and Download Buttons */}
            <div className="text-center md:text-start md:w-1/2">
                <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight font-mikhak-bold">
                    {t.hero.title}
                </h1>
                <p className="mt-4 text-lg text-gray-300 font-mikhak-regular">
                    {t.hero.subtitle}
                </p>
                <div className="mt-8">
                    <p className="font-semibold mb-4">{t.hero.download}</p>
                    <div className="flex justify-center md:justify-start space-x-4 rtl:space-x-reverse">
                        <a href="#" className="bg-black text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1200px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-8" />
                        </a>
                        <a href="#" className="bg-black text-white rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1200px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-8" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Right Side: Phone Mockup */}
            <PhoneMockup />
        </main>
    );
};

export default Hero;