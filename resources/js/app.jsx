import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route } from 'ziggy-js';
import { LanguageProvider } from '@/hooks/useLanguage';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        // Make route global
        window.route = props.initialPage.props.ziggy?.location ? (...args) => route(...args) : route;
        root.render(
            <LanguageProvider>
                <App {...props} />
            </LanguageProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// Track page views on Inertia navigation (SPA support for Google Analytics & GTM)
router.on('navigate', (event) => {
    // 1. Google Analytics (gtag.js)
    if (typeof window.gtag === 'function') {
        window.gtag('config', 'G-8FF16W6S3C', {
            page_path: event.detail.page.url,
            page_title: document.title,
        });
    }

    // 2. Google Tag Manager (GTM)
    if (typeof window.dataLayer !== 'undefined') {
        window.dataLayer.push({
            event: 'pageview',
            page: event.detail.page.url,
            title: document.title,
        });
    }
});







