import React from 'react';

const PhoneMockup = () => (
    <div className="mt-12 md:mt-0 md:w-1/2 flex justify-center">
        <div className="relative w-64 h-[500px] bg-gray-900 rounded-[40px] border-[10px] border-gray-700 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-lg"></div>
            <div className="w-full h-full bg-cover bg-center rounded-[30px] bg-purple-500 flex items-center justify-center">
                <span className="text-gray-400 text-sm">App UI Mockup</span>
            </div>
        </div>
    </div>
);

export default PhoneMockup;