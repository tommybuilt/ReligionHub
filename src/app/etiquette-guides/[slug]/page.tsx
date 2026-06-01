import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceDetailPage } from '@/components/resource-detail-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { ETIQUETTE_GUIDE_DETAILS } from '@/lib/resource-details/etiquette-guides';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = ETIQUETTE_GUIDE_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    return { title: 'Etiquette Guides', description: 'Respectful visitor guides for sacred spaces.' };
  }

  return genMeta({
    title: entry.title,
    description: entry.description,
    path: `/etiquette-guides/${entry.slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return ETIQUETTE_GUIDE_DETAILS.map((entry) => ({ slug: entry.slug }));
}

export default async function EtiquetteGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = ETIQUETTE_GUIDE_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return <ResourceDetailPage hubTitle="Etiquette Guides" hubPath="/etiquette-guides" entry={entry} />;
}
