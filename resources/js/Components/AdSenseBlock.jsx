import { useEffect } from 'react';

export default function AdSenseBlock({ client = 'ca-pub-XXXXXXXXXXXXX', slot, format = 'auto', responsive = 'true', className = '' }) {
    useEffect(() => {
        try {
            if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div className={`adsense-container my-8 flex justify-center ${className}`}>
            <ins 
                className="adsbygoogle"
                style={{ display: 'block', width: '100%' }}
                data-ad-client={client}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            ></ins>
        </div>
    );
}
