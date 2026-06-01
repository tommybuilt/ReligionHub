import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, ArrowRight, ShoppingCart } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateBreadcrumbJsonLd } from '@/lib/seo';
import { stripInlineCitations } from '@/lib/utils';

export interface ResourceHubItem {
  title: string;
  description: string;
  meta: string;
  href?: string;
  quickActionHref?: string;
  quickActionLabel?: string;
}

interface ResourceHubPageProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  items: ResourceHubItem[];
  sourceNotes: string[];
}

export function ResourceHubPage({ title, description, path, icon: Icon, items, sourceNotes }: ResourceHubPageProps) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: title, url: path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">{title}</li>
          </ol>
        </nav>

        <div className="mb-8 max-w-3xl">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground leading-relaxed">{stripInlineCitations(description)}</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            This hub synthesizes reference definitions, comparative framing, and study guidance from the source set listed below.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="sm">
              <Link href="/religions">Explore traditions</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/compare">Compare traditions</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/recommended-reading">Browse reading lists</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/sacred-items">See sacred items</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card key={item.title} className="group relative h-full transition-all hover:shadow-md hover:border-primary/30">
              {item.href ? (
                <Link href={item.href} aria-label={`Open ${item.title}`} className="absolute inset-0 z-10 rounded-xl" />
              ) : null}
              <CardHeader className="pointer-events-none relative z-20 flex flex-row items-start justify-between gap-3 space-y-0">
                <div className="space-y-1.5">
                  <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                  <CardDescription className="text-xs uppercase tracking-wide">{item.meta}</CardDescription>
                </div>
                {item.quickActionHref ? (
                  <Button asChild variant="ghost" size="icon" className="pointer-events-auto relative z-20 -mr-2 -mt-2 shrink-0 text-muted-foreground hover:text-foreground">
                    <Link href={item.quickActionHref} aria-label={item.quickActionLabel ?? `Open ${item.title}`}>
                      <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                ) : null}
              </CardHeader>
              <CardContent className="pointer-events-none relative z-20 flex h-full flex-col">
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {stripInlineCitations(item.description)}
                </p>
                {item.href ? (
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium text-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="mt-10 rounded-xl border bg-muted/30 p-5" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="text-xl font-semibold mb-3">Sources &amp; Further Reading</h2>
          <p className="mb-3 text-sm text-muted-foreground leading-relaxed">
            The page summary and hub entries above draw on standard reference works, comparative religion scholarship, and reading lists already used across the site.
          </p>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            {sourceNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
