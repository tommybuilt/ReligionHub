import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceDetailPage } from '@/components/resource-detail-page';
import { generateMetadata as genMeta } from '@/lib/seo';
import { BEGINNER_GUIDE_DETAILS } from '@/lib/resource-details/beginner-guides';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = BEGINNER_GUIDE_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    return { title: 'Beginner Guides', description: 'Beginner-friendly guides to world religions.' };
  }

  return genMeta({
    title: entry.title,
    description: entry.description,
    path: `/beginner-guides/${entry.slug}`,
    type: 'website',
  });
}

export function generateStaticParams() {
  return BEGINNER_GUIDE_DETAILS.map((entry) => ({ slug: entry.slug }));
}

export default async function BeginnerGuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = BEGINNER_GUIDE_DETAILS.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return <ResourceDetailPage hubTitle="Beginner Guides" hubPath="/beginner-guides" entry={entry} />;
}
