import type { Metadata } from 'next';
import { generateMetadata as genMeta } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<Record<string, never>>;
}): Promise<Metadata> {

  return genMeta({
    title: 'Religious Symbols & Icons Quiz',
    description: "How well do you know the symbols of the world's religions? Test your knowledge of sacred icons, emblems, and visual traditions.",
    path: '/quiz/symbols',
    type: 'website',
  });
}

export default function SymbolsQuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
