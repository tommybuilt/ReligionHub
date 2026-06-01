import Link from 'next/link';
import type { Metadata } from 'next';
import { ChevronRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { generateBreadcrumbJsonLd, generateMetadata as genMeta } from '@/lib/seo';

export function generateMetadata(): Metadata {
  return genMeta({
    title: 'Contact',
    description: 'Contact the ReligionCompare editorial team with corrections, DMCA-related questions, or general inquiries.',
    path: '/contact',
    type: 'website',
  });
}

export default function ContactPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container py-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Contact</li>
          </ol>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="rounded-[28px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
            <CardHeader>
              <CardTitle className="text-4xl text-stone-900">Contact ReligionCompare</CardTitle>
              <CardDescription className="mt-2 max-w-2xl text-base leading-relaxed text-stone-600">
                Send corrections, source questions, partnership notes, or general messages to the editorial team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border-stone-200 bg-[#fffaf2] shadow-[0_18px_45px_rgba(58,42,26,0.08)]">
            <CardHeader>
              <CardTitle className="text-3xl text-stone-900">Response Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-stone-600">
              <p>Use this form for factual corrections, copyright questions, editorial concerns, or general site feedback.</p>
              <p>DMCA-related submissions can also be sent through the contact form if that is more convenient.</p>
              <p>To report a citation issue, include the page URL and the sentence or section that should be reviewed.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
