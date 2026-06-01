import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30" role="contentinfo">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="mb-3 inline-flex items-center" aria-label={`${siteConfig.name} home`}>
              <Image
                src="/religioncompare-logo.svg?v=3"
                alt={siteConfig.name}
                width={400}
                height={80}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Factual, neutral, citation-backed information about world religions. Educational information only.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/religions" className="hover:text-foreground transition-colors">Religions</Link></li>
              <li><Link href="/compare" className="hover:text-foreground transition-colors">Compare</Link></li>
              <li><Link href="/quiz" className="hover:text-foreground transition-colors">Quizzes</Link></li>
              <li><Link href="/articles" className="hover:text-foreground transition-colors">Articles</Link></li>
              <li><Link href="/sacred-items" className="hover:text-foreground transition-colors">Sacred Items &amp; Gifts</Link></li>
              <li><Link href="/holidays" className="hover:text-foreground transition-colors">Holidays Calendar</Link></li>
              <li><Link href="/infographics" className="hover:text-foreground transition-colors">Infographics</Link></li>
              <li><Link href="/trending" className="hover:text-foreground transition-colors">Trending Topics</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Study Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/recommended-reading" className="hover:text-foreground transition-colors">Recommended Reading</Link></li>
              <li><Link href="/glossary" className="hover:text-foreground transition-colors">Glossary</Link></li>
              <li><Link href="/beginner-guides" className="hover:text-foreground transition-colors">Beginner Guides</Link></li>
              <li><Link href="/etiquette-guides" className="hover:text-foreground transition-colors">Etiquette Guides</Link></li>
              <li><Link href="/sacred-texts" className="hover:text-foreground transition-colors">Sacred Texts</Link></li>
              <li><Link href="/faqs" className="hover:text-foreground transition-colors">FAQs</Link></li>
              <li><Link href="/educator-resources" className="hover:text-foreground transition-colors">Educator Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Trust & Sources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about/how-we-source" className="hover:text-foreground transition-colors">How We Source Facts</Link></li>
              <li><Link href="/about/editorial-policy" className="hover:text-foreground transition-colors">Editorial Policy</Link></li>
              <li><Link href="/legal/disclaimers" className="hover:text-foreground transition-colors">Disclaimers</Link></li>
              <li><Link href="/legal/image-credits" className="hover:text-foreground transition-colors">Image Credits</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/affiliate-disclosure" className="hover:text-foreground transition-colors">Affiliate Disclosure</Link></li>
              <li><Link href="/legal/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
              <li><Link href="/legal/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link></li>
              <li><Link href="/legal/dmca" className="hover:text-foreground transition-colors">DMCA / Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-xs text-muted-foreground space-y-1">
          <p>Educational information only. Not affiliated with any religion. Interpretations vary by tradition and denomination.</p>
          <p>All factual claims are citation-backed. If you see an error, <Link href="/legal/dmca" className="underline hover:text-foreground">please report it</Link>.</p>
          <p>&copy; 2026 ReligionCompare. A TPS Worldwide LLC property.</p>
        </div>
      </div>
    </footer>
  );
}
