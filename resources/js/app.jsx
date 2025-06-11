import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/app.css';
import Header from './Components/Header';
import Hero from './Components/Hero';

const App = () => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-600 via-purple-800 to-indigo-900 text-white">
            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                <Header />
                <Hero />
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
