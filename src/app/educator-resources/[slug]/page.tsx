import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceDetailPage } from '@/components/resource-detail-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { EDUCATOR_RESOURCE_DETAILS } from '@/lib/resource-details/educator-resources';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = EDUCATOR_RESOURCE_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    return { title: 'Educator Resources', description: 'Teaching-oriented religion resources.' };
  }

  return genMeta({
    title: entry.title,
    description: entry.description,
    path: `/educator-resources/${entry.slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return EDUCATOR_RESOURCE_DETAILS.map((entry) => ({ slug: entry.slug }));
}

export default async function EducatorResourceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = EDUCATOR_RESOURCE_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return <ResourceDetailPage hubTitle="Educator Resources" hubPath="/educator-resources" entry={entry} />;
}
