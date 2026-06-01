import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Compare Religions',
    description:
      'Select 2-4 religions to compare side-by-side with citation-backed facts on beliefs, practices, history, and demographics.',
    path: '/compare',
    type: 'website',
  });
}

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
