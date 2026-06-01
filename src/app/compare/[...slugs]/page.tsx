import Link from 'next/link';
import type { Metadata } from 'next';
import { generateMetadata as genMeta, generateBreadcrumbJsonLd, generateCompareCanonical, generateDatasetJsonLd } from '@/lib/seo';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RELIGION_CONTENT } from '../../religions/[slug]/content';
import type { ReligionContent } from '../../religions/[slug]/content';
import { CompareTabs } from '@/components/compare-tabs';
import { CompareCharts } from '@/components/compare-charts';
import { generateDifferencesContent } from '@/lib/differences-content';
import { collapseInlineCitations } from '@/lib/utils';

/* SOURCE LOG: /compare/[...slugs] */
/* Last updated: 2026-02-15 (full content build) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center religion reports and datasets
   - CIA World Factbook demographic data (public domain)
   - Sacred-texts.com public domain scripture translations
   - UNESCO World Heritage Centre site listings
   - Academic consensus from widely published reference works
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

interface ComparePageProps {
  params: Promise<{ slugs: string[] }>;
}

function parseSlugs(slugs: string[]): string[] {
  return slugs.join('/').split('-vs-').map((s) => s.trim()).filter(Boolean);
}

function firstParagraph(text: string): string {
  const p = collapseInlineCitations(text.split('\n\n')[0] || text);
  return p.length > 400 ? p.slice(0, 397) + '...' : p;
}

const COMPARE_ROWS: { key: keyof ReligionContent; label: string }[] = [
  { key: 'origins', label: 'Origins' },
  { key: 'beliefs', label: 'Core Beliefs' },
  { key: 'practices', label: 'Practices' },
  { key: 'texts', label: 'Sacred Texts' },
  { key: 'demographics', label: 'Demographics' },
  { key: 'afterlife', label: 'Afterlife Views' },
  { key: 'ethics', label: 'Ethics' },
  { key: 'leadership', label: 'Leadership' },
  { key: 'denominations', label: 'Denominations' },
  { key: 'holidays', label: 'Holidays' },
  { key: 'symbols', label: 'Symbols' },
];

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const { slugs } = await params;
  const religions = parseSlugs(slugs);
  const names = religions.map((s) => RELIGION_CONTENT[s]?.name || s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  const canonical = generateCompareCanonical(religions);
  return genMeta({
    title: `Compare ${names.join(' vs ')}`,
    description: `Side-by-side comparison of ${names.join(' and ')}, beliefs, practices, history, demographics, and more. All facts are citation-backed.`,
    path: canonical,
  });
}

function DifferencesExplained({ names, contentList }: { names: string[]; contentList: (ReligionContent | undefined)[] }) {
  const data = generateDifferencesContent(names, contentList);
  return (
    <div className="space-y-8">
      {data.sections.map((section, i) => (
        <Card key={i}>
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold mb-3">{section.heading}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">{collapseInlineCitations(section.narrative)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slugs } = await params;
  const religions = parseSlugs(slugs);
  const contentList = religions.map((slug) => RELIGION_CONTENT[slug]);
  const names = religions.map((s, i) => contentList[i]?.name || s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  const canonical = generateCompareCanonical(religions);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Compare', url: '/compare' },
    { name: names.join(' vs '), url: canonical },
  ]);

  const datasetJsonLd = generateDatasetJsonLd({
    name: `${names.join(' vs ')} Comparison`,
    description: `Structured comparison data for ${names.join(' and ')}`,
    url: canonical,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />

      <div className="container py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/compare" className="hover:text-foreground transition-colors">Compare</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="break-words text-foreground font-medium" aria-current="page">{names.join(' vs ')}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="break-words text-2xl font-bold leading-tight sm:text-3xl md:text-4xl mb-2">{names.join(' vs ')}</h1>
          <p className="text-muted-foreground max-w-2xl">
            Side-by-side comparison with citation-backed facts across standardized categories used in comparative religion analysis.
          </p>
        </div>

        {/* Tabbed Views */}
        <CompareTabs
          tableView={
            <>
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse" role="table">
                      <thead>
                        <tr className="border-b-2 border-primary/20">
                          <th className="text-left p-3 bg-muted/50 font-semibold text-sm min-w-[140px]" scope="col">Category</th>
                          {religions.map((slug, i) => (
                            <th key={slug} className="text-left p-3 bg-muted/50 font-semibold text-sm min-w-[250px]" scope="col">
                              <Link href={`/religions/${slug}`} className="hover:text-primary transition-colors">
                                {names[i]}
                              </Link>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {COMPARE_ROWS.map((row) => (
                          <tr key={row.key} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="p-3 font-medium text-sm align-top border-r bg-background">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">{row.label}</span>
                            </td>
                            {contentList.map((content, i) => (
                              <td key={religions[i]} className="p-3 align-top text-sm">
                                <p className="text-muted-foreground text-xs leading-relaxed">
                                  {content ? firstParagraph(content[row.key]) : `Content for ${names[i]} is not yet available.`}
                                </p>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {religions.map((slug, i) => (
                  <Button key={slug} variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                    <Link href={`/religions/${slug}`}>
                      <BookOpen className="h-4 w-4 mr-1" aria-hidden="true" />
                      Full {names[i]} Profile
                    </Link>
                  </Button>
                ))}
              </div>
            </>
          }
          differencesView={
            <DifferencesExplained names={names} contentList={contentList} />
          }
          chartsView={
            <CompareCharts names={names} />
          }
        />

        <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="next-steps-heading">
          <h2 id="next-steps-heading" className="text-xl font-semibold mb-3">Best Next Steps</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            After a side-by-side comparison, the fastest way to deepen context is to read one recommended introduction for each tradition and then explore how material culture or ritual objects express those same differences in daily life.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {religions.map((slug, i) => (
              <Button key={`${slug}-reading`} variant="outline" size="sm" className="w-full sm:w-auto" asChild>
                <Link href={`/recommended-reading/${slug}`}>Read {names[i]} books</Link>
              </Button>
            ))}
            <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
              <Link href="/sacred-items">Browse sacred items</Link>
            </Button>
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-muted/30 p-5" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
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
        </section>
      </div>
    </>
  );
}
