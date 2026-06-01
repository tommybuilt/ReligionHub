import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceDetailPage } from '@/components/resource-detail-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { FAQ_DETAILS } from '@/lib/resource-details/faqs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = FAQ_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    return { title: 'FAQs', description: 'Frequently asked questions about religion.' };
  }

  return genMeta({
    title: entry.title,
    description: entry.description,
    path: `/faqs/${entry.slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return FAQ_DETAILS.map((entry) => ({ slug: entry.slug }));
}

export default async function FaqDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = FAQ_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return <ResourceDetailPage hubTitle="FAQs" hubPath="/faqs" entry={entry} />;
}
