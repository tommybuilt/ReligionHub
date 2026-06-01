import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Ethics & Philosophy Quiz',
    description: 'Explore the moral teachings, ethical principles, and philosophical foundations of world religions.',
    path: '/quiz/ethics',
    type: 'website',
  });
}

export default function EthicsQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
