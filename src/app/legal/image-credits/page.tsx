import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
 import { generateMetadata as genMeta } from '@/lib/seo';

 export async function generateMetadata({
   params,
 }: {
   params: Promise<Record<string, never>>;
 }): Promise<Metadata> {
   return genMeta({
     title: 'Image and Symbol Credits',
     description: 'Attribution and license notes for visual assets, symbols, and reference imagery used on ReligionCompare.',
     path: '/legal/image-credits',
     type: 'website',
   });
 }

const CREDITS = [
  {
    item: 'Unicode religious symbols and cultural glyphs',
    source: 'Unicode Character Database',
    license: 'Unicode License (free use with terms)',
    url: 'https://www.unicode.org/terms_of_use.html',
    note: 'Used as textual symbols (e.g., ✝ ☪ ✡ ☸ 🕉 ⛩) for educational UI labels and cultural context.',
  },
  {
    item: 'Global religion demographic references',
    source: 'Pew Research Center',
    license: 'Pew terms and citation guidelines',
    url: 'https://www.pewresearch.org/religion/',
    note: 'Used for aggregate adherent ranges and comparative context.',
  },
  {
    item: 'General religion encyclopedia references',
    source: 'Encyclopaedia Britannica',
    license: 'Reference use under fair citation and linking',
    url: 'https://www.britannica.com/topic/religion',
    note: 'Used for high-level historical and definitional cross-checking.',
  },
  {
    item: 'Sacred site and heritage references',
    source: 'UNESCO World Heritage Centre',
    license: 'UNESCO terms and attribution guidance',
    url: 'https://whc.unesco.org/',
    note: 'Used for contextual references to major religious and historical sites.',
  },
];

export default function ImageCreditsPage() {
  return (
    <div className="container max-w-4xl py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li><Link href="/legal" className="hover:text-foreground transition-colors">Legal</Link></li>
          <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
          <li className="text-foreground font-medium" aria-current="page">Image Credits</li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-3">Image and Symbol Credits</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        ReligionCompare aims to use free-use symbols and properly attributed reference material.
        This page lists our current visual and data attribution notes.
      </p>

      <div className="space-y-4">
        {CREDITS.map((c) => (
          <section key={c.item} className="rounded-xl border bg-muted/20 p-5">
            <h2 className="font-semibold mb-1">{c.item}</h2>
            <p className="text-sm text-muted-foreground"><strong>Source:</strong> {c.source}</p>
            <p className="text-sm text-muted-foreground"><strong>License/Terms:</strong> {c.license}</p>
            <p className="text-sm text-muted-foreground mt-1">{c.note}</p>
            <a href={c.url} target="_blank" rel="noreferrer" className="inline-block text-sm underline mt-2 hover:text-foreground">
              View source / terms
            </a>
          </section>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        If you believe any asset attribution is missing or inaccurate, contact us through the DMCA page.
      </p>
    </div>
  );
}
