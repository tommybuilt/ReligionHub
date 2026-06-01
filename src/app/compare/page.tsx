'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, ArrowRight } from 'lucide-react';

/* SOURCE LOG: /compare */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center religion reports
   - Encyclopaedia Britannica religion entries
   - Oxford Reference comparative religion topics
   - World Religion Database estimates
   - CIA World Factbook demographic context
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const ALL_RELIGIONS = [
  { slug: 'christianity', name: 'Christianity', symbol: '✝' },
  { slug: 'islam', name: 'Islam', symbol: '☪' },
  { slug: 'hinduism', name: 'Hinduism', symbol: '🕉' },
  { slug: 'buddhism', name: 'Buddhism', symbol: '☸' },
  { slug: 'judaism', name: 'Judaism', symbol: '✡' },
  { slug: 'sikhism', name: 'Sikhism', symbol: '☬' },
  { slug: 'bahai-faith', name: "Baha'i Faith", symbol: '✹' },
  { slug: 'jainism', name: 'Jainism', symbol: '卐' },
  { slug: 'shinto', name: 'Shinto', symbol: '⛩' },
  { slug: 'taoism', name: 'Taoism', symbol: '☯' },
  { slug: 'zoroastrianism', name: 'Zoroastrianism', symbol: '🔥' },
  { slug: 'indigenous-traditions', name: 'Indigenous & Traditional', symbol: '🌿' },
  { slug: 'catholicism', name: 'Catholicism', symbol: '⛪' },
  { slug: 'orthodox-christianity', name: 'Orthodox Christianity', symbol: '☦' },
  { slug: 'protestantism', name: 'Protestantism', symbol: '✝' },
  { slug: 'confucianism', name: 'Confucianism', symbol: '儒' },
  { slug: 'latter-day-saints', name: 'Latter-day Saints', symbol: '📖' },
  { slug: 'jehovahs-witnesses', name: "Jehovah's Witnesses", symbol: '📜' },
  { slug: 'secular-humanism', name: 'Secular Humanism', symbol: '🧠' },
  { slug: 'african-diaspora', name: 'African Diaspora', symbol: '🥁' },
  { slug: 'paganism-wicca', name: 'Paganism & Wicca', symbol: '🌙' },
  { slug: 'rastafari', name: 'Rastafari', symbol: '🦁' },
  { slug: 'druze', name: 'Druze', symbol: '⭐' },
  { slug: 'unitarian-universalism', name: 'Unitarian Universalism', symbol: '🔥' },
];

const POPULAR = [
  { slugs: 'christianity-vs-islam', label: 'Christianity vs Islam' },
  { slugs: 'hinduism-vs-buddhism', label: 'Hinduism vs Buddhism' },
  { slugs: 'christianity-vs-judaism', label: 'Christianity vs Judaism' },
  { slugs: 'islam-vs-judaism', label: 'Islam vs Judaism' },
  { slugs: 'hinduism-vs-jainism', label: 'Hinduism vs Jainism' },
  { slugs: 'buddhism-vs-shinto', label: 'Buddhism vs Shinto' },
  { slugs: 'christianity-vs-hinduism', label: 'Christianity vs Hinduism' },
  { slugs: 'islam-vs-hinduism', label: 'Islam vs Hinduism' },
  { slugs: 'catholicism-vs-protestantism', label: 'Catholicism vs Protestantism' },
  { slugs: 'catholicism-vs-orthodox-christianity', label: 'Catholicism vs Orthodox Christianity' },
  { slugs: 'christianity-vs-buddhism', label: 'Christianity vs Buddhism' },
  { slugs: 'islam-vs-sikhism', label: 'Islam vs Sikhism' },
  { slugs: 'hinduism-vs-sikhism', label: 'Hinduism vs Sikhism' },
  { slugs: 'judaism-vs-christianity', label: 'Judaism vs Christianity' },
  { slugs: 'buddhism-vs-taoism', label: 'Buddhism vs Taoism' },
  { slugs: 'christianity-vs-islam-vs-judaism', label: 'Christianity vs Islam vs Judaism' },
  { slugs: 'hinduism-vs-buddhism-vs-jainism', label: 'Hinduism vs Buddhism vs Jainism' },
  { slugs: 'islam-vs-bahai-faith', label: "Islam vs Baha'i Faith" },
  { slugs: 'christianity-vs-latter-day-saints', label: 'Christianity vs Latter-day Saints' },
  { slugs: 'christianity-vs-jehovahs-witnesses', label: "Christianity vs Jehovah's Witnesses" },
  { slugs: 'protestantism-vs-orthodox-christianity', label: 'Protestantism vs Orthodox Christianity' },
  { slugs: 'buddhism-vs-confucianism', label: 'Buddhism vs Confucianism' },
  { slugs: 'taoism-vs-confucianism', label: 'Taoism vs Confucianism' },
  { slugs: 'shinto-vs-buddhism', label: 'Shinto vs Buddhism' },
  { slugs: 'hinduism-vs-islam', label: 'Hinduism vs Islam' },
  { slugs: 'judaism-vs-islam', label: 'Judaism vs Islam' },
  { slugs: 'sikhism-vs-bahai-faith', label: "Sikhism vs Baha'i Faith" },
  { slugs: 'zoroastrianism-vs-islam', label: 'Zoroastrianism vs Islam' },
  { slugs: 'zoroastrianism-vs-christianity', label: 'Zoroastrianism vs Christianity' },
  { slugs: 'jainism-vs-buddhism', label: 'Jainism vs Buddhism' },
  { slugs: 'paganism-wicca-vs-indigenous-traditions', label: 'Paganism & Wicca vs Indigenous Traditions' },
  { slugs: 'african-diaspora-vs-indigenous-traditions', label: 'African Diaspora vs Indigenous Traditions' },
  { slugs: 'christianity-vs-secular-humanism', label: 'Christianity vs Secular Humanism' },
  { slugs: 'islam-vs-secular-humanism', label: 'Islam vs Secular Humanism' },
  { slugs: 'buddhism-vs-secular-humanism', label: 'Buddhism vs Secular Humanism' },
  { slugs: 'rastafari-vs-christianity', label: 'Rastafari vs Christianity' },
  { slugs: 'latter-day-saints-vs-jehovahs-witnesses', label: "Latter-day Saints vs Jehovah's Witnesses" },
  { slugs: 'taoism-vs-shinto', label: 'Taoism vs Shinto' },
  { slugs: 'hinduism-vs-zoroastrianism', label: 'Hinduism vs Zoroastrianism' },
  { slugs: 'sikhism-vs-islam', label: 'Sikhism vs Islam' },
  { slugs: 'confucianism-vs-taoism-vs-buddhism', label: 'Confucianism vs Taoism vs Buddhism' },
  { slugs: 'christianity-vs-islam-vs-hinduism', label: 'Christianity vs Islam vs Hinduism' },
  { slugs: 'catholicism-vs-latter-day-saints', label: 'Catholicism vs Latter-day Saints' },
  { slugs: 'protestantism-vs-latter-day-saints', label: 'Protestantism vs Latter-day Saints' },
  { slugs: 'bahai-faith-vs-christianity', label: "Baha'i Faith vs Christianity" },
  { slugs: 'african-diaspora-vs-catholicism', label: 'African Diaspora vs Catholicism' },
  { slugs: 'paganism-wicca-vs-secular-humanism', label: 'Paganism & Wicca vs Secular Humanism' },
  { slugs: 'rastafari-vs-african-diaspora', label: 'Rastafari vs African Diaspora' },
  { slugs: 'hinduism-vs-confucianism', label: 'Hinduism vs Confucianism' },
  { slugs: 'judaism-vs-bahai-faith', label: "Judaism vs Baha'i Faith" },
  { slugs: 'druze-vs-islam', label: 'Druze vs Islam' },
  { slugs: 'druze-vs-judaism', label: 'Druze vs Judaism' },
  { slugs: 'druze-vs-christianity', label: 'Druze vs Christianity' },
  { slugs: 'druze-vs-bahai-faith', label: "Druze vs Baha'i Faith" },
  { slugs: 'christianity-vs-unitarian-universalism', label: 'Christianity vs Unitarian Universalism' },
  { slugs: 'secular-humanism-vs-unitarian-universalism', label: 'Secular Humanism vs Unitarian Universalism' },
  { slugs: 'judaism-vs-unitarian-universalism', label: 'Judaism vs Unitarian Universalism' },
  { slugs: 'buddhism-vs-unitarian-universalism', label: 'Buddhism vs Unitarian Universalism' },
];

export default function CompareLandingPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggle = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length < 4 ? [...prev, slug] : prev
    );
  };

  const go = () => {
    if (selected.length >= 2) {
      const sorted = [...selected].sort();
      router.push(`/compare/${sorted.join('-vs-')}`);
    }
  };

  return (
    <div className="container py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Compare</li>
        </ol>
      </nav>

      <div className="mb-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-background p-5">
        <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl mb-2">Compare Religions</h1>
        <p className="text-muted-foreground max-w-2xl">
          Select 2-4 religions to compare side-by-side. All comparisons are built from citation-backed atomic claims [1][2][3].
        </p>
      </div>

      {/* Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Select religions to compare ({selected.length}/4)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {ALL_RELIGIONS.map((r) => {
            const isSelected = selected.includes(r.slug);
            return (
              <button
                key={r.slug}
                onClick={() => toggle(r.slug)}
                className={`p-3 rounded-lg border text-sm font-medium text-center transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border hover:border-primary/50 hover:bg-muted'
                }`}
                aria-pressed={isSelected}
              >
                <span className="flex items-center justify-center gap-2 break-words">
                  <span aria-hidden="true">{r.symbol}</span>
                  <span className="min-w-0 break-words">{r.name}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <Button onClick={go} disabled={selected.length < 2} className="gap-2">
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            Compare {selected.length >= 2 ? `(${selected.length})` : ''}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Popular Comparisons */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Popular Comparisons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {POPULAR.map((comp) => (
            <Link key={comp.slugs} href={`/compare/${comp.slugs}`} className="group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm group-hover:text-primary transition-colors">
                    {comp.label}
                  </CardTitle>
                  <CardDescription className="text-xs">Side-by-side with citations</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-xl border bg-muted/30 p-5">
        <h2 className="font-semibold mb-2">Sources &amp; Further Reading</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Comparison rows summarize published scholarship, major reference works, and source texts [1][2][3].
          Where traditions differ internally, differences are labeled by denomination or school [2][3].
        </p>
        <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
          <li>
            Pew Research Center, religion reports and data portal.
            <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.pewresearch.org/religion/
            </a>
          </li>
          <li>
            Encyclopaedia Britannica, religion reference entries.
            <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.britannica.com/topic/religion
            </a>
          </li>
          <li>
            Oxford Reference, comparative religion resources.
            <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.oxfordreference.com/
            </a>
          </li>
          <li>
            World Religion Database, global religion estimates.
            <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.worldreligiondatabase.org/
            </a>
          </li>
          <li>
            CIA World Factbook, country-level demographic context.
            <a href="https://www.cia.gov/the-world-factbook/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
              https://www.cia.gov/the-world-factbook/
            </a>
          </li>
        </ol>
      </div>
    </div>
  );
}
