'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Search, X, Globe, BarChart3, HelpCircle, BookOpen, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/search-bar';
import { ThemeToggle } from '@/components/theme-toggle';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/religions', label: 'Religions', icon: Globe },
  { href: '/compare', label: 'Compare', icon: BarChart3 },
  { href: '/quiz', label: 'Quizzes', icon: HelpCircle },
  { href: '/recommended-reading', label: 'Reading', icon: BookOpen },
  { href: '/sacred-items', label: 'Sacred Items', icon: Gift },
];

export function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMobileSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileSearchOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileSearchOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center" aria-label={`${siteConfig.name} home`}>
            <Image
              src="/religioncompare-logo.svg?v=3"
              alt={siteConfig.name}
              width={400}
              height={80}
              priority
              className="h-9 w-auto max-w-[11rem] sm:h-10 sm:max-w-none"
            />
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden lg:block w-64">
            <SearchBar size="default" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => {
              setMobileOpen(false);
              setMobileSearchOpen(true);
            }}
            aria-label="Open search"
            aria-expanded={mobileSearchOpen}
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            <Button
              type="button"
              variant="outline"
              className="mb-3 w-full justify-start gap-2"
              onClick={() => {
                setMobileOpen(false);
                setMobileSearchOpen(true);
              }}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              Search the site
            </Button>
            <nav className="space-y-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
          <div className="container flex h-full flex-col py-4">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Search ReligionCompare</p>
                <p className="text-sm text-muted-foreground break-words">Search religions, comparisons, quizzes, articles, legal pages, holidays, and more.</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={() => setMobileSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <SearchBar
              overlay
              autoFocus
              size="lg"
              className="w-full"
              placeholder="Search religions, comparisons, quizzes, and more..."
              onNavigate={() => setMobileSearchOpen(false)}
              onRequestClose={() => setMobileSearchOpen(false)}
            />
          </div>
        </div>
      )}
    </header>
  );
}
