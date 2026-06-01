import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Belief Alignment Explorer',
    description: 'Discover which religious traditions most align with your worldview.',
    path: '/quiz/alignment',
    type: 'website',
  });
}

export default function AlignmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
