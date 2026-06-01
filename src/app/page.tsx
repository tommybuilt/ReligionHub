import Link from 'next/link';
import type { Metadata } from 'next';
import { SearchBar } from '@/components/search-bar';
import { Reveal } from '@/components/reveal';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, BookOpen, HelpCircle, Heart, ChevronRight, Sparkles, Leaf, Sun, FileText, CalendarDays, BarChart3, TrendingUp, Compass } from 'lucide-react';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta, generateWebSiteJsonLd, generateOrganizationJsonLd } from '@/lib/seo';
import { stripInlineCitations } from '@/lib/utils';
import { RELIGION_CONTENT } from './religions/[slug]/content';

/* SOURCE LOG: / */
/* Last updated: 2026-02-15 (attribution pass) */
/* References consulted for fact verification (no text copied):
   - Pew Research Center religion reports and datasets
   - Encyclopaedia Britannica religion entries
   - UNESCO World Heritage Centre pages
   - World Religion Database summaries
   - Oxford Reference comparative religion entries
*/
/* ALL VISIBLE TEXT IS ORIGINAL. */

const POPULAR_COMPARISONS = [
  { slugs: 'christianity-vs-islam', label: 'Christianity vs Islam', emoji: '✝ ☪' },
  { slugs: 'hinduism-vs-buddhism', label: 'Hinduism vs Buddhism', emoji: '🕉 ☸' },
  { slugs: 'christianity-vs-judaism', label: 'Christianity vs Judaism', emoji: '✝ ✡' },
  { slugs: 'islam-vs-judaism', label: 'Islam vs Judaism', emoji: '☪ ✡' },
  { slugs: 'hinduism-vs-jainism', label: 'Hinduism vs Jainism', emoji: '🕉 卐' },
  { slugs: 'buddhism-vs-shinto', label: 'Buddhism vs Shinto', emoji: '☸ ⛩' },
];

const RELIGIONS_PREVIEW = [
  { slug: 'christianity', name: 'Christianity', symbol: '✝', adherents: '~2.4B [1]', color: 'from-rose-100/60 to-amber-50/40' },
  { slug: 'islam', name: 'Islam', symbol: '☪', adherents: '~1.9B [1]', color: 'from-emerald-100/60 to-teal-50/40' },
  { slug: 'hinduism', name: 'Hinduism', symbol: '🕉', adherents: '~1.2B [1]', color: 'from-orange-100/60 to-amber-50/40' },
  { slug: 'buddhism', name: 'Buddhism', symbol: '☸', adherents: '~500M [1]', color: 'from-amber-100/60 to-yellow-50/40' },
  { slug: 'judaism', name: 'Judaism', symbol: '✡', adherents: '~14-15M [1]', color: 'from-blue-100/60 to-sky-50/40' },
  { slug: 'sikhism', name: 'Sikhism', symbol: '☬', adherents: '~25-30M [1]', color: 'from-orange-100/60 to-yellow-50/40' },
];

const TOTAL_TRADITIONS = Object.keys(RELIGION_CONTENT).length;

const SACRED_PLACES = [
  { name: 'Jerusalem', traditions: 'Judaism, Christianity, Islam', note: 'Holy city to three Abrahamic faiths, home to the Western Wall, Church of the Holy Sepulchre, and Al-Aqsa Mosque [2][3].' },
  { name: 'Varanasi', traditions: 'Hinduism, Buddhism, Jainism', note: 'One of the oldest continuously inhabited cities, sacred along the Ganges for pilgrimage and spiritual practice [2][3].' },
  { name: 'Bodh Gaya', traditions: 'Buddhism', note: 'Site of the Bodhi Tree where Siddhartha Gautama attained enlightenment and a UNESCO World Heritage Site [3].' },
  { name: 'Mecca', traditions: 'Islam', note: 'Birthplace of the Prophet Muhammad and home of the Kaaba, the holiest site in Islam [2].' },
  { name: 'Amritsar', traditions: 'Sikhism', note: 'Home of the Golden Temple (Harmandir Sahib), a major center of Sikh devotion [2].' },
  { name: 'Ise', traditions: 'Shinto', note: 'Location of the Grand Shrine of Ise, often described as the most sacred Shinto shrine [2].' },
];

const SOURCE_SNAPSHOT = [
  { label: 'Pew Research Center', url: 'https://www.pewresearch.org/religion/' },
  { label: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/topic/religion' },
  { label: 'UNESCO World Heritage Centre', url: 'https://whc.unesco.org/' },
  { label: 'World Religion Database', url: 'https://www.worldreligiondatabase.org/' },
];

 export async function generateMetadata({
   params,
 }: {
   params: Promise<Record<string, never>>;
 }): Promise<Metadata> {
   return genMeta({
     title: 'Compare World Religions Side by Side',
     description:
       "Compare world religions side-by-side with factual, citation-backed information. Explore beliefs, practices, history, sacred texts, and more.",
     path: '/',
     type: 'website',
   });
 }

export default function HomePage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationJsonLd()) }}
      />

      {/* Hero, warm, inviting, peaceful */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-orange-50/30 to-background" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, hsl(25 55% 42%) 1px, transparent 1px), radial-gradient(circle at 75% 75%, hsl(150 25% 50%) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container relative py-20 md:py-28 lg:py-36">
          <Reveal className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex justify-center gap-3 text-3xl opacity-60" aria-hidden="true">
              <span>✝</span><span>☪</span><span>🕉</span><span>☸</span><span>✡</span><span>☯</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Understanding Faith,<br />
              <span className="text-primary">Together</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A peaceful space to explore the world&apos;s religious traditions, their wisdom, history, sacred places, and living practices, with respect and honest scholarship.
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar size="lg" placeholder="Search beliefs, traditions, sacred texts..." />
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button size="lg" className="rounded-full px-6 shadow-md" asChild>
                <Link href="/religions">
                  <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
                  Explore Traditions
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-6" asChild>
                <Link href="/compare">
                  Compare Side by Side
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Explore Religions, warm cards with symbols */}
      <section className="py-16 md:py-20" aria-labelledby="explore-religions-heading">
        <div className="container">
          <Reveal className="text-center mb-10">
            <h2 id="explore-religions-heading" className="text-3xl md:text-4xl font-bold mb-3">
              The World&apos;s Living Traditions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each tradition carries centuries of wisdom, practice, and community. Begin your journey here.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {RELIGIONS_PREVIEW.map((r, index) => (
              <Reveal key={r.slug} delayMs={index * 45}>
                <Link href={`/religions/${r.slug}`} className="group">
                  <Card className={`h-full text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br ${r.color} border-transparent hover:border-primary/20`}>
                    <CardHeader className="pb-2 pt-6">
                      <div className="text-3xl mb-2" aria-hidden="true">{r.symbol}</div>
                      <CardTitle className="text-sm group-hover:text-primary transition-colors">
                        {r.name}
                      </CardTitle>
                      <CardDescription className="text-xs">{r.adherents}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-6" delayMs={120}>
            <Button variant="ghost" asChild>
              <Link href="/religions">
                View all {TOTAL_TRADITIONS} traditions <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Sacred Places, evocative, warm */}
      <section className="bg-gradient-to-b from-accent/30 via-accent/10 to-background py-16 md:py-20" aria-labelledby="places-heading">
        <div className="container">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-primary mb-3">
              <Sun className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium uppercase tracking-wider">Sacred Geography</span>
            </div>
            <h2 id="places-heading" className="text-3xl md:text-4xl font-bold mb-3">
              Places Where Faith Lives
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From ancient temples to living pilgrimage routes, these places hold deep meaning for billions of people.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SACRED_PLACES.map((place, index) => (
              <Reveal key={place.name} delayMs={index * 55}>
                <Card className="h-full border-none shadow-sm bg-card/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary/70" aria-hidden="true" />
                      {place.name}
                    </CardTitle>
                    <p className="text-xs font-medium text-primary/80">{place.traditions}</p>
                    <CardDescription className="leading-relaxed mt-1">{stripInlineCitations(place.note)}</CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="container py-16 md:py-20" aria-labelledby="popular-comparisons-heading">
        <div className="text-center mb-10">
          <h2 id="popular-comparisons-heading" className="text-3xl md:text-4xl font-bold mb-3">
            Explore Connections &amp; Differences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Side-by-side comparisons grounded in scholarship, not stereotypes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_COMPARISONS.map((comp) => (
            <Link key={comp.slugs} href={`/compare/${comp.slugs}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
                <CardHeader className="pb-3">
                  <div className="text-lg mb-1 opacity-50" aria-hidden="true">{comp.emoji}</div>
                  <CardTitle className="text-base group-hover:text-primary transition-colors">
                    {comp.label}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Citation-backed comparison
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Button variant="ghost" asChild>
            <Link href="/compare">
              Build your own comparison <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="bg-gradient-to-b from-accent/20 via-accent/5 to-background py-16 md:py-20" aria-labelledby="resources-heading">
        <div className="container">
          <Reveal className="text-center mb-10">
            <h2 id="resources-heading" className="text-3xl md:text-4xl font-bold mb-3">
              Explore More Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Go deeper with reading lists, sacred items, articles, quizzes, and a calendar of religious holidays from around the world.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Reveal delayMs={0}><Link href="/recommended-reading" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 border-primary/20 bg-gradient-to-br from-amber-50/70 via-background to-background"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><BookOpen className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">Recommended Reading</CardTitle><CardDescription className="leading-relaxed">Curated reading lists with Staff Picks, dual buy links, and guided next steps for deeper study.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={35}><Link href="/sacred-items" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20 border-primary/20 bg-gradient-to-br from-orange-50/70 via-background to-background"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><Heart className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">Sacred Items &amp; Gifts</CardTitle><CardDescription className="leading-relaxed">Explore the material culture of world religions through curated items, devotional tools, and ritual objects.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={70}><Link href="/articles" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><FileText className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">Articles</CardTitle><CardDescription className="leading-relaxed">25 in-depth, citation-backed articles on beliefs, practices, history, and culture.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={105}><Link href="/quiz/what-religion-am-i" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><Compass className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">What Religion Am I?</CardTitle><CardDescription className="leading-relaxed">Answer 25 questions to discover which world religions resonate with your values.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={140}><Link href="/holidays" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">Holidays Calendar</CardTitle><CardDescription className="leading-relaxed">2026 religious holidays across 10 traditions with .ics downloads.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={175}><Link href="/infographics" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">Infographics</CardTitle><CardDescription className="leading-relaxed">Data-driven visual guides, populations, timelines, sacred texts, and more.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={210}><Link href="/trending" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">Trending Topics</CardTitle><CardDescription className="leading-relaxed">Curated religion-in-the-news topics with context and internal links.</CardDescription></CardHeader></Card></Link></Reveal>
            <Reveal delayMs={245}><Link href="/quiz" className="group"><Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20"><CardHeader><div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2"><HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" /></div><CardTitle className="text-lg group-hover:text-primary transition-colors">All Quizzes</CardTitle><CardDescription className="leading-relaxed">9 quizzes covering knowledge, alignment, traditions, symbols, and more.</CardDescription></CardHeader></Card></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20" aria-labelledby="study-hubs-heading">
        <Reveal className="text-center mb-10">
          <h2 id="study-hubs-heading" className="text-3xl md:text-4xl font-bold mb-3">
            Study Paths &amp; Teaching Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Move from quick discovery into structured learning with curated reading lists, glossary terms, beginner pathways, etiquette guidance, sacred text introductions, and classroom-friendly resources.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Link href="/recommended-reading" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">Recommended Reading</CardTitle>
                <CardDescription className="leading-relaxed">Curated book lists for major religions, balancing approachable introductions with respected deeper-study picks.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/sacred-items" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">Sacred Items &amp; Gifts</CardTitle>
                <CardDescription className="leading-relaxed">A curated guide to prayer beads, puja tools, menorahs, prayer mats, icons, and other objects used in religious life.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/glossary" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">Glossary</CardTitle>
                <CardDescription className="leading-relaxed">Clear definitions for terms like karma, dharma, nirvana, halal, kosher, and rebirth across traditions.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/beginner-guides" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">Beginner Guides</CardTitle>
                <CardDescription className="leading-relaxed">Start with the right concepts first when you are new to Christianity, Islam, Hinduism, Buddhism, Judaism, or Sikhism.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/etiquette-guides" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">Etiquette Guides</CardTitle>
                <CardDescription className="leading-relaxed">Practical visitor guidance for churches, mosques, synagogues, temples, and gurdwaras.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/sacred-texts" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">Sacred Texts</CardTitle>
                <CardDescription className="leading-relaxed">Introductory guides to the Bible, Quran, Bhagavad Gita, Torah, Tripitaka, Guru Granth Sahib, and more.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link href="/faqs" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/20">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <HelpCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">FAQs</CardTitle>
                <CardDescription className="leading-relaxed">Short answers to common comparison questions about belief, conversion, diet, interpretation, and respectful study.</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
        <Reveal className="mt-6 flex justify-center" delayMs={160}>
          <Button variant="outline" asChild>
            <Link href="/educator-resources">
              Explore educator resources <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </section>

      {/* Values / Trust, warm and human */}
      <section className="bg-gradient-to-b from-background via-secondary/30 to-background py-16 md:py-20" aria-labelledby="trust-heading">
        <div className="container">
          <Reveal className="text-center mb-10">
            <h2 id="trust-heading" className="text-3xl md:text-4xl font-bold mb-3">
              Built on Respect &amp; Honest Scholarship
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm bg-card/80">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Cited Sources</CardTitle>
                <CardDescription className="leading-relaxed text-sm">
                  Every claim links back to reputable scholarship, primary texts, peer-reviewed research, and established reference works.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-sm bg-card/80">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-accent/50 flex items-center justify-center mb-3">
                  <Heart className="h-6 w-6 text-accent-foreground" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Deep Respect</CardTitle>
                <CardDescription className="leading-relaxed text-sm">
                  We honor each tradition on its own terms. Where beliefs differ by denomination or school, we present the full spectrum without judgment.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-sm bg-card/80">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <HelpCircle className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl">Discover &amp; Reflect</CardTitle>
                <CardDescription className="leading-relaxed text-sm">
                  Take a quiz to explore your own spiritual curiosity, or dive deeper into the traditions that intrigue you.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mt-12 rounded-2xl border bg-card/60 backdrop-blur-sm p-6 max-w-2xl mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-4">Sources &amp; Further Reading</p>
            <ol className="text-left space-y-2 text-xs text-muted-foreground list-decimal pl-5 mb-4">
              <li>
                Pew Research Center, religion reports and data portal.
                <a href="https://www.pewresearch.org/religion/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                  https://www.pewresearch.org/religion/
                </a>
              </li>
              <li>
                Encyclopaedia Britannica, religion and sacred-site reference entries.
                <a href="https://www.britannica.com/topic/religion" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                  https://www.britannica.com/topic/religion
                </a>
              </li>
              <li>
                UNESCO World Heritage Centre, sacred and historic site documentation.
                <a href="https://whc.unesco.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                  https://whc.unesco.org/
                </a>
              </li>
              <li>
                World Religion Database, adherence estimate context.
                <a href="https://www.worldreligiondatabase.org/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                  https://www.worldreligiondatabase.org/
                </a>
              </li>
              <li>
                Oxford Reference, comparative religion overview entries.
                <a href="https://www.oxfordreference.com/" target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                  https://www.oxfordreference.com/
                </a>
              </li>
            </ol>
            <div className="flex flex-wrap justify-center gap-3">
              {SOURCE_SNAPSHOT.map((src) => (
                <a key={src.url} href={src.url} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-full border bg-background hover:bg-secondary transition-colors">
                  {src.label}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              <Link href="/about/how-we-source" className="underline hover:text-foreground">How We Source</Link>
              {' '}&middot;{' '}
              <Link href="/legal/image-credits" className="underline hover:text-foreground">Image Credits</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
