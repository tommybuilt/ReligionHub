import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight, Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { generateBreadcrumbJsonLd, generateArticleJsonLd, generateMetadata as genMeta } from '@/lib/seo';
import { getAllPublicArticles, getPublicArticleBySlug } from '@/lib/articles';
import { AUTHOR_BIOS } from '../content';
import { ArticleBody } from './article-body';
import { TableOfContents } from './table-of-contents';
import { SocialSharing } from './social-sharing';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublicArticleBySlug(slug);
  if (!article) return {};

  return genMeta({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${slug}`,
    type: 'article',
    publishedTime: article.publishDate,
    modifiedTime: article.publishDate,
    authors: [article.author],
  });
}

export async function generateStaticParams() {
  const articles = await getAllPublicArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPublicArticleBySlug(slug);
  if (!article) notFound();

  const authorBio = AUTHOR_BIOS[article.author];
  const allArticles = await getAllPublicArticles();
  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => allArticles.find((candidate) => candidate.slug === relatedSlug))
    .filter((candidate): candidate is (typeof allArticles)[number] => Boolean(candidate))
    .slice(0, 4);

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
    { name: article.title, url: `/articles/${slug}` },
  ];

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);
  const articleJsonLd = generateArticleJsonLd({
    title: article.title,
    description: article.excerpt,
    url: `/articles/${slug}`,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: article.author,
  });

  const headings = extractHeadings(article.content);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href="/articles" className="hover:text-foreground transition-colors">Articles</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium line-clamp-1" aria-current="page">{article.title}</li>
          </ol>
        </nav>

        {/* Ad slot: leaderboard */}
        <div className="w-full h-[90px] bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground mb-8 border border-dashed border-border" aria-hidden="true">
          Ad Slot, Leaderboard (728×90)
        </div>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge>{article.category}</Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {article.readTime}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {article.displayDate}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <User className="h-4 w-4" aria-hidden="true" />
              <span>By <strong className="text-foreground">{article.author}</strong></span>
            </div>
          </header>

          {/* Mobile TOC (collapsible) */}
          <div className="lg:hidden mb-6">
            <TableOfContents headings={headings} collapsible />
          </div>

          <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
            <div className="min-w-0">
              <ArticleBody content={article.content} />

              {/* In-content ad slot */}
              <div className="w-full h-[250px] bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground my-8 border border-dashed border-border" aria-hidden="true">
                Ad Slot, In-Content (300×250)
              </div>

              {/* Sources & Further Reading */}
              {article.sources.length > 0 ? (
                <section className="mt-10 pt-8 border-t" aria-labelledby="sources-heading">
                  <h2 id="sources-heading" className="text-xl font-bold mb-4">Sources &amp; Further Reading</h2>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    {article.sources.map((src) => (
                      <li key={src.id} id={`source-${src.id}`}>
                        {src.url ? (
                          <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline underline-offset-2">
                            {src.label}
                          </a>
                        ) : (
                          src.label
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {/* Author Bio */}
              {authorBio && (
                <section className="mt-8 p-5 rounded-lg bg-muted/40 border" aria-labelledby="author-bio-heading">
                  <h2 id="author-bio-heading" className="sr-only">About the Author</h2>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {authorBio.name.split(' ').map((w) => w[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{authorBio.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{authorBio.bio}</p>
                    </div>
                  </div>
                </section>
              )}

              {/* Social Sharing */}
              <SocialSharing title={article.title} slug={article.slug} />
            </div>

            {/* Sidebar: Table of Contents (desktop sticky) */}
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section className="mt-12 pt-8 border-t" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xl font-bold mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((ra) => (
                  <Link key={ra.slug} href={`/articles/${ra.slug}`} className="group">
                    <Card className="h-full transition-all hover:shadow-md hover:border-primary/30">
                      <CardContent className="pt-4">
                        <Badge className="text-xs mb-2">{ra.category}</Badge>
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors leading-snug">{ra.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ra.readTime} · {ra.displayDate}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Explore This Tradition */}
          {(article.relatedReligions.length > 0 || article.relatedComparisons.length > 0) && (
            <section className="mt-10 pt-8 border-t" aria-labelledby="explore-heading">
              <h2 id="explore-heading" className="text-xl font-bold mb-4">Explore These Traditions</h2>
              <div className="flex flex-wrap gap-2">
                {article.relatedReligions.map((r) => (
                  <Link
                    key={r}
                    href={`/religions/${r}`}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {r.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </Link>
                ))}
                {article.relatedComparisons.map((c) => (
                  <Link
                    key={c}
                    href={c}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {c.replace('/compare/', '').replace(/-vs-/g, ' vs ').replace(/-/g, ' ').replace(/\b\w/g, (ch) => ch.toUpperCase())}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {article.relatedReligions.length > 0 && (
            <section className="mt-10 pt-8 border-t" aria-labelledby="study-next-heading">
              <h2 id="study-next-heading" className="text-xl font-bold mb-4">Keep Studying</h2>
              <div className="flex flex-wrap gap-2">
                {article.relatedReligions.map((r) => (
                  <Link
                    key={`${r}-reading`}
                    href={`/recommended-reading/${r}`}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {r.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} reading list
                  </Link>
                ))}
                <Link
                  href="/sacred-items"
                  className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  Sacred Items &amp; Gifts
                </Link>
              </div>
            </section>
          )}
        </article>

        {/* Ad slot: bottom banner */}
        <div className="w-full h-[90px] bg-muted/30 rounded-lg flex items-center justify-center text-xs text-muted-foreground mt-12 border border-dashed border-border" aria-hidden="true">
          Ad Slot, Bottom Banner (728×90)
        </div>
      </div>
    </>
  );
}

function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    headings.push({ id, text, level });
  }
  return headings;
}
