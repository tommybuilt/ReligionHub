import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'World Religions Knowledge Quiz',
    description: 'Test your knowledge of world religions with citation-backed questions.',
    path: '/quiz/knowledge',
    type: 'website',
  });
}

export default function KnowledgeQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
