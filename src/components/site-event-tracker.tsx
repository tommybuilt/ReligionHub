'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function sendEvent(payload: { page_path: string; event_type: 'pageview' | 'shop_click' | 'outbound_click'; referrer?: string }) {
  const body = JSON.stringify(payload);

  if (typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
    return;
  }

  void fetch('/api/track', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  });
}

export function SiteEventTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) {
      return;
    }

    sendEvent({
      page_path: pathname,
      event_type: 'pageview',
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest('a[href*="amazon.com"]');

      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      if (window.location.pathname.startsWith('/admin')) {
        return;
      }

      sendEvent({
        page_path: window.location.pathname,
        event_type: 'shop_click',
        referrer: link.href,
      });
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return null;
}
