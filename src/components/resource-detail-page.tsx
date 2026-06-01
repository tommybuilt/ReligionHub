import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateBreadcrumbJsonLd, generateFaqJsonLd } from '@/lib/seo';
import { slugify } from '@/lib/resource-details/helpers';
import type { ResourceDetailEntry } from '@/lib/resource-details/types';
import { collapseSectionCitations, stripInlineCitations } from '@/lib/utils';

interface ResourceDetailPageProps {
  hubTitle: string;
  hubPath: string;
  entry: ResourceDetailEntry;
  children?: React.ReactNode;
}

export function ResourceDetailPage({ hubTitle, hubPath, entry, children }: ResourceDetailPageProps) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: hubTitle, url: hubPath },
    { name: entry.title, url: `${hubPath}/${entry.slug}` },
  ]);

  const faqJsonLd = entry.faq?.length ? generateFaqJsonLd(entry.faq) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li><Link href={hubPath} className="hover:text-foreground transition-colors">{hubTitle}</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">{entry.title}</li>
          </ol>
        </nav>

        <div className="max-w-4xl mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{entry.categoryLabel}</Badge>
            <Badge variant="outline">{entry.wordCountLabel}</Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{entry.title}</h1>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{stripInlineCitations(entry.summary)}</p>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{stripInlineCitations(entry.description)}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href={hubPath}>Back to {hubTitle}</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/religions">Explore traditions</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/compare">Compare traditions</Link>
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {entry.sections.map((section) => (
            <section key={section.heading} aria-labelledby={slugify(section.heading)}>
              <Card>
                <CardHeader>
                  <CardTitle id={slugify(section.heading)} className="text-2xl">{section.heading}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                  {collapseSectionCitations(section.body).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {entry.relatedLinks.length > 0 ? (
          <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="related-links-heading">
            <h2 id="related-links-heading" className="text-xl font-semibold mb-3">Related Paths</h2>
            <div className="flex flex-wrap gap-3">
              {entry.relatedLinks.map((link) => (
                <Button key={link.href} asChild variant="outline" size="sm">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
          </section>
        ) : null}

        {entry.faq?.length ? (
          <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl font-semibold mb-3">Quick Questions</h2>
            <div className="space-y-4">
              {entry.faq.map((item) => (
                <div key={item.question}>
                  <h3 className="font-medium mb-1">{item.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{stripInlineCitations(item.answer)}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {children}

        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            {entry.sources.map((source) => (
              <li key={source.label}>
                {source.label}
                {source.url ? (
                  <a href={source.url} target="_blank" rel="noreferrer" className="underline hover:text-foreground ml-1">
                    {source.url}
                  </a>
                ) : null}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
