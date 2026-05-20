import { useEffect, useState } from 'react';

export default function Toast({ message, type = 'success', onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setTimeout(onClose, 300); // Wait for fade out animation
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    const icons = {
        success: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
        error: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
        warning: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    };

    const colors = {
        success: 'bg-green-500 text-white shadow-green-200',
        error: 'bg-red-500 text-white shadow-red-200',
        warning: 'bg-amber-500 text-white shadow-amber-200',
    };

    return (
        <div className={`fixed bottom-8 right-8 z-[100] transform transition-all duration-300 ease-out ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}>
            <div className={`flex items-center p-4 min-w-[300px] rounded-2xl shadow-2xl ${colors[type]}`}>
                <div className="p-2 bg-white/20 rounded-xl mr-4">
                    {icons[type]}
                </div>
                <div className="flex-1 mr-4">
                    <p className="font-mikhak-bold text-sm tracking-wide">{message}</p>
                </div>
                <button onClick={() => setIsVisible(false)} className="hover:rotate-90 transition-transform duration-300 opacity-60 hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
        </div>
    );
}
