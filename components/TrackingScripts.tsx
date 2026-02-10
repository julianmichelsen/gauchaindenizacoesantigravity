import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';

/**
 * TrackingScripts dynamically injects Facebook Pixel and Google Analytics.
 * Also implements a local click tracker for WhatsApp conversions.
 */
export const TrackingScripts: React.FC = () => {
    const { content } = useContent();
    const fbInitialized = useRef(false);
    const gaInitialized = useRef('');

    // 1. LOCAL CONVERSION TRACKER (WhatsApp Clicks)
    useEffect(() => {
        const handleWaClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            // Check if it's a WhatsApp link
            if (anchor && anchor.href && (anchor.href.includes('wa.me') || anchor.href.includes('whatsapp.com'))) {
                try {
                    // Update local stats for the Admin Dashboard
                    const currentTotal = parseInt(localStorage.getItem('wa_clicks_total') || '0');
                    localStorage.setItem('wa_clicks_total', (currentTotal + 1).toString());

                    // Also set a daily stat
                    const today = new Date().toISOString().split('T')[0];
                    const dailyTotal = parseInt(localStorage.getItem(`wa_clicks_${today}`) || '0');
                    localStorage.setItem(`wa_clicks_${today}`, (dailyTotal + 1).toString());

                    console.log('WhatsApp Conversion Tracked (Local)');
                } catch (err) {
                    console.warn('Error tracking WA click:', err);
                }
            }
        };

        window.addEventListener('click', handleWaClick);
        return () => window.removeEventListener('click', handleWaClick);
    }, []);

    // 2. FACEBOOK PIXEL
    useEffect(() => {
        const pixelId = content.facebookPixelId?.trim();
        if (!pixelId) return;
        if (fbInitialized.current) return;

        try {
            if (!(window as any).fbq) {
                const n = (window as any).fbq = function () {
                    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                };
                if (!(window as any)._fbq) (window as any)._fbq = n;
                n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];

                const script = document.createElement('script');
                script.async = true;
                script.src = 'https://connect.facebook.net/en_US/fbevents.js';
                document.head.appendChild(script);
            }

            (window as any).fbq('init', pixelId);
            (window as any).fbq('track', 'PageView');
            fbInitialized.current = true;
        } catch (e) {
            console.error('Facebook Pixel error:', e);
        }
    }, [content.facebookPixelId]);

    // 3. GOOGLE ANALYTICS 4
    useEffect(() => {
        const gaId = content.googleAnalyticsId?.trim();
        if (!gaId) return;
        if (gaInitialized.current === gaId) return;

        try {
            const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
            if (!existingScript) {
                const script = document.createElement('script');
                script.async = true;
                script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
                document.head.appendChild(script);
            }

            (window as any).dataLayer = (window as any).dataLayer || [];
            function gtag(...args: any[]) { (window as any).dataLayer.push(arguments); }
            (window as any).gtag = gtag;
            gtag('js', new Date());
            gtag('config', gaId);
            gaInitialized.current = gaId;
        } catch (e) {
            console.error('Google Analytics error:', e);
        }
    }, [content.googleAnalyticsId]);

    return null;
};
