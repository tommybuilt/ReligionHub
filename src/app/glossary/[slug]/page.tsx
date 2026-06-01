import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceDetailPage } from '@/components/resource-detail-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { GLOSSARY_DETAILS } from '@/lib/resource-details/glossary';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = GLOSSARY_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    return { title: 'Glossary', description: 'Comparative religion glossary terms.' };
  }

  return genMeta({
    title: entry.title,
    description: entry.description,
    path: `/glossary/${entry.slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return GLOSSARY_DETAILS.map((entry) => ({ slug: entry.slug }));
}

export default async function GlossaryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = GLOSSARY_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return <ResourceDetailPage hubTitle="Glossary" hubPath="/glossary" entry={entry} />;
}
