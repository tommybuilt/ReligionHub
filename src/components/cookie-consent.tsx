'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

interface ConsentPrefs {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
}

function updateGoogleConsent(prefs: ConsentPrefs) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: prefs.analytics ? 'granted' : 'denied',
      ad_storage: prefs.advertising ? 'granted' : 'denied',
      ad_user_data: prefs.advertising ? 'granted' : 'denied',
      ad_personalization: prefs.advertising ? 'granted' : 'denied',
    });
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [advertising, setAdvertising] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const save = useCallback((prefs: ConsentPrefs) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    updateGoogleConsent(prefs);
    setVisible(false);
  }, []);

  const acceptAll = useCallback(() => {
    save({ essential: true, analytics: true, advertising: true });
  }, [save]);

  const rejectNonEssential = useCallback(() => {
    save({ essential: true, analytics: false, advertising: false });
  }, [save]);

  const saveCustom = useCallback(() => {
    save({ essential: true, analytics, advertising });
  }, [save, analytics, advertising]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 p-4 border-t shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container max-w-4xl mx-auto">
        {!showPrefs ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">
                We use cookies to keep this site working and, with your consent, to analyze usage and show relevant ads.
                Read our <Link href="/legal/cookies" className="underline hover:text-foreground">Cookie Policy</Link> for details.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <Button size="sm" variant="outline" onClick={rejectNonEssential}>
                Reject Non-Essential
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Accept All
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setShowPrefs(true)}>
                Customize
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Cookie Preferences</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowPrefs(false)} aria-label="Close preferences">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Strictly Necessary</p>
                  <p className="text-xs text-muted-foreground">Theme, locale, consent preference, security. Cannot be disabled.</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Always on</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Analytics</p>
                  <p className="text-xs text-muted-foreground">Google Analytics 4, anonymized usage data to improve the site.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Enable analytics cookies"
                  />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Advertising</p>
                  <p className="text-xs text-muted-foreground">Google AdSense, personalized ads based on browsing interests.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={advertising}
                    onChange={(e) => setAdvertising(e.target.checked)}
                    className="sr-only peer"
                    aria-label="Enable advertising cookies"
                  />
                  <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={saveCustom}>Save Preferences</Button>
              <Button size="sm" variant="outline" onClick={acceptAll}>Accept All</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
