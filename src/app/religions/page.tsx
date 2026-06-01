import Link from 'next/link';
import type { Metadata } from 'next';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { Reveal } from '@/components/reveal';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SearchBar } from '@/components/search-bar';
import { ChevronRight, ArrowRight } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {
  return genMeta({
    title: 'World Religions',
    description:
      'Explore 23 world religions and traditions with citation-backed facts on beliefs, practices, history, demographics, and more.',
    path: '/religions',
    type: 'website',
  });
}

/* SOURCE LOG: /religions */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center: Religion reports and datasets
   - Encyclopaedia Britannica religion entries
   - World Religion Database
   - Oxford Reference: comparative religion topics
   - CIA World Factbook (country-level context)
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const RELIGIONS = [
  { slug: 'christianity', name: 'Christianity', symbol: '✝', adherents: '~2.4 billion [1]', origin: 'Levant, 1st century CE [2]' },
  { slug: 'islam', name: 'Islam', symbol: '☪', adherents: '~1.9 billion [1]', origin: 'Arabian Peninsula, 7th century CE [2]' },
  { slug: 'hinduism', name: 'Hinduism', symbol: '🕉', adherents: '~1.2 billion [1]', origin: 'Indian subcontinent, ~1500 BCE [2]' },
  { slug: 'buddhism', name: 'Buddhism', symbol: '☸', adherents: '~500 million [1]', origin: 'Indian subcontinent, 5th century BCE [2]' },
  { slug: 'judaism', name: 'Judaism', symbol: '✡', adherents: '~14-15 million [1]', origin: 'Levant, ~2000 BCE [2]' },
  { slug: 'sikhism', name: 'Sikhism', symbol: '☬', adherents: '~25-30 million [1]', origin: 'Punjab, 15th century CE [2]' },
  { slug: 'bahai-faith', name: "Baha'i Faith", symbol: '✹', adherents: '~5-8 million [1]', origin: 'Persia, 19th century CE [2]' },
  { slug: 'jainism', name: 'Jainism', symbol: '卐', adherents: '~4-5 million [1]', origin: 'Indian subcontinent, 6th century BCE [2]' },
  { slug: 'shinto', name: 'Shinto', symbol: '⛩', adherents: '~4 million [1]', origin: 'Japan, prehistoric religious tradition [2]' },
  { slug: 'taoism', name: 'Taoism', symbol: '☯', adherents: '~12 million [1]', origin: 'China, 4th century BCE [2]' },
  { slug: 'zoroastrianism', name: 'Zoroastrianism', symbol: '🔥', adherents: '~100-200 thousand [1]', origin: 'Persia, ~1500-500 BCE [2]' },
  { slug: 'indigenous-traditions', name: 'Indigenous & Traditional', symbol: '🌿', adherents: '~300+ million [1][3]', origin: 'Various regions, prehistoric and ancestral traditions [2]' },
  { slug: 'catholicism', name: 'Catholicism', symbol: '⛪', adherents: '~1.3 billion [1]', origin: 'Rome, 1st century CE [2]' },
  { slug: 'orthodox-christianity', name: 'Orthodox Christianity', symbol: '☦', adherents: '~220 million [1]', origin: 'Eastern Mediterranean, 1st century CE [2]' },
  { slug: 'protestantism', name: 'Protestantism', symbol: '✝', adherents: '~800 million-1 billion [1]', origin: 'Europe, 16th century CE [2]' },
  { slug: 'confucianism', name: 'Confucianism', symbol: '儒', adherents: '~6-7 million formal [1]', origin: 'China, 6th-5th century BCE [2]' },
  { slug: 'latter-day-saints', name: 'Latter-day Saints', symbol: '📖', adherents: '~17 million [1]', origin: 'United States, 19th century CE [2]' },
  { slug: 'jehovahs-witnesses', name: "Jehovah's Witnesses", symbol: '📜', adherents: '~8.7 million active [1]', origin: 'United States, 1870s CE [2]' },
  { slug: 'secular-humanism', name: 'Secular Humanism & Atheism', symbol: '🧠', adherents: '~1.2 billion unaffiliated [1]', origin: 'Global, Enlightenment era onward [2]' },
  { slug: 'african-diaspora', name: 'African Diaspora Religions', symbol: '🥁', adherents: '~60-100 million [1]', origin: 'Americas & Caribbean, 16th century onward [2]' },
  { slug: 'paganism-wicca', name: 'Paganism & Wicca', symbol: '🌙', adherents: '~3-5 million [1]', origin: 'Europe & global, mid-20th century revival [2]' },
  { slug: 'rastafari', name: 'Rastafari', symbol: '🦁', adherents: '~700,000-1 million [1]', origin: 'Jamaica, 1930s CE [2]' },
  { slug: 'druze', name: 'Druze', symbol: '⭐', adherents: '~1-2 million [1]', origin: 'Egypt/Levant, 11th century CE [2]' },
  { slug: 'unitarian-universalism', name: 'Unitarian Universalism', symbol: '🔥', adherents: '~800,000 [1]', origin: 'Europe & North America, 16th-20th century CE [2]' },
];

export default function ReligionsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Religions', url: '/religions' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Religions</li>
          </ol>
        </nav>

        <Reveal className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">World Religions</h1>
          <p className="text-muted-foreground max-w-2xl mb-6">
            Explore major world religions with factual, citation-backed information on beliefs, practices, history, demographics, and more.
          </p>
          <SearchBar placeholder="Search religions..." className="max-w-md" />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RELIGIONS.map((r, index) => (
            <Reveal key={r.slug} delayMs={index * 35}>
              <Link href={`/religions/${r.slug}`} className="group">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 bg-gradient-to-br from-background via-background to-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10" aria-hidden="true">
                          {r.symbol}
                        </span>
                        {r.name}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </CardTitle>
                    <CardDescription>
                      <span className="block">{r.adherents} adherents</span>
                      <span className="block text-xs mt-0.5">{r.origin}</span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 rounded-xl border bg-muted/30 p-5" delayMs={120}>
          <h2 className="font-semibold mb-2">Sources &amp; Further Reading</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Adherent counts are approximate global estimates and vary by methodology and update cycle [1][3].
            Historical origin windows are summarized from major reference works [2].
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
              World Religion Database, global adherence estimates.
              <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.worldreligiondatabase.org/
              </a>
            </li>
            <li>
              Oxford Reference, comparative religion topics.
              <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.oxfordreference.com/
              </a>
            </li>
            <li>
              CIA World Factbook, country-level demographic context.
              <a href="https://www.cia.gov/the-world-factbook/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                https://www.cia.gov/the-world-factbook/
              </a>
            </li>
          </ol>
        </Reveal>
      </div>
    </>
  );
}
