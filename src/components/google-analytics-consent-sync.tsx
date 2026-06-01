'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalyticsConsentSync() {
  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');

    if (!stored) {
      return;
    }

    try {
      const prefs = JSON.parse(stored) as {
        analytics?: boolean;
        advertising?: boolean;
      };

      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: prefs.analytics ? 'granted' : 'denied',
          ad_storage: prefs.advertising ? 'granted' : 'denied',
          ad_user_data: prefs.advertising ? 'granted' : 'denied',
          ad_personalization: prefs.advertising ? 'granted' : 'denied',
        });
      }
    } catch {
      return;
    }
  }, []);

  return null;
}
