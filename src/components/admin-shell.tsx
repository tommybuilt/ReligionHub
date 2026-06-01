'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type AdminCounts = {
  draftArticles: number;
  unreadMessages: number;
};

interface AdminShellProps {
  children: ReactNode;
  counts: AdminCounts;
}

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/articles', label: 'Articles', icon: '📄', badgeKey: 'draftArticles' as const },
  { href: '/admin/products', label: 'Products', icon: '🛍️' },
  { href: '/admin/messages', label: 'Messages', icon: '✉️', badgeKey: 'unreadMessages' as const },
  { href: '/admin/analytics', label: 'Analytics', icon: '📊' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export function AdminShell({ children, counts }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(
    () => NAV_ITEMS.map((item) => ({
      ...item,
      badgeValue: item.badgeKey ? counts[item.badgeKey] : 0,
    })),
    [counts]
  );

  async function handleLogout() {
    await fetch('/api/admin/logout', {
      method: 'POST',
    });

    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 md:flex">
      <div className="border-b border-stone-200 bg-[#faf8f5] px-4 py-4 md:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-300 bg-white text-xl text-stone-800 shadow-sm"
          aria-label="Open admin navigation"
        >
          ☰
        </button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-40 bg-[rgba(58,42,26,0.25)] transition-opacity md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col bg-[#3a2a1a] px-4 py-5 text-[#faf8f5] shadow-2xl transition-transform md:static md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link href="/admin" className="inline-flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <Image
              src="/religioncompare-logo.svg?v=3"
              alt="ReligionCompare"
              width={220}
              height={44}
              className="h-8 w-auto brightness-[1.8] contrast-[0.95]"
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 text-lg md:hidden"
            aria-label="Close admin navigation"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = item.href === '/admin' ? pathname === item.href : pathname.startsWith(item.href);

            return (
              <div key={item.href}>
                {index === 1 || index === 5 ? <div className="my-3 border-t border-white/10" /> : null}
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-medium transition-colors',
                    isActive ? 'bg-[#c79a4d] text-[#3a2a1a]' : 'text-[#faf8f5] hover:bg-[#4a3725]'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.badgeValue ? (
                    <span
                      className={cn(
                        'inline-flex min-w-7 items-center justify-center rounded-full px-2 py-1 text-xs font-semibold',
                        item.href === '/admin/messages' ? 'bg-orange-200 text-orange-900' : 'bg-white/15 text-[#faf8f5]'
                      )}
                    >
                      {item.badgeValue}
                    </span>
                  ) : null}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto space-y-2 pt-6">
          <a
            href="https://www.religioncompare.com"
            className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-[#faf8f5] transition-colors hover:bg-[#4a3725]"
          >
            <span aria-hidden="true" className="text-lg">←</span>
            <span>Back to Site</span>
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium text-[#faf8f5] transition-colors hover:bg-[#4a3725]"
          >
            <span aria-hidden="true" className="text-lg">🚪</span>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
