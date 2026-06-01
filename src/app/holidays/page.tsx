import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { HolidaysCalendar } from './calendar-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'Religious Holidays Calendar 2026',
    description:
      'A comprehensive calendar of religious holidays and observances for 2026, covering Christianity, Islam, Judaism, Hinduism, Buddhism, Sikhism, and more. Filter by tradition and download .ics files.',
    path: '/holidays',
    type: 'website',
  });
}

export default function HolidaysPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Religious Holidays Calendar', url: '/holidays' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Religious Holidays Calendar</li>
          </ol>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Religious Holidays Calendar, 2026</h1>
          <p className="text-muted-foreground max-w-2xl">
            A comprehensive guide to major religious holidays and observances across the world&apos;s traditions.
            Filter by religion, browse by month, or download events to your calendar.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Note: Islamic dates are approximate, as the Islamic calendar is lunar and dates depend on moon sighting.
          </p>
        </div>

        <HolidaysCalendar />
      </div>
    </>
  );
}
