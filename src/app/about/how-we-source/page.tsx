import { siteConfig } from '@/lib/config';
import { generateBreadcrumbJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'How We Source',
  description: `Learn how ${siteConfig.name} selects, verifies, and presents citation-backed information about world religions.`,
};

export default function HowWeSourcePage() {
  const name = siteConfig.name;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'How We Source', url: '/about/how-we-source' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container max-w-3xl py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">How We Source</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold mb-8">How We Source</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Our Sourcing Philosophy</h2>
            <p>{name} is built on a simple principle: every factual claim must be backed by a verifiable citation. We do not present opinions, personal interpretations, or unsourced assertions as facts. Our goal is to be the most trustworthy comparative religion resource on the internet.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Source Tiers</h2>
            <p>We classify all sources into three reliability tiers:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Primary Sources</strong>, Sacred texts, official doctrinal documents, catechisms, and authoritative religious bodies. Examples: the Quran, Catechism of the Catholic Church, Guru Granth Sahib, Pali Canon.</li>
              <li><strong>Secondary Sources</strong>, Peer-reviewed academic publications, university press books, established encyclopedias (Britannica, Oxford), and major research institutions (Pew Research Center). These interpret and analyze primary sources.</li>
              <li><strong>Tertiary Sources</strong>, Reputable journalistic outlets, educational websites, and well-sourced reference materials. Used sparingly and only when primary/secondary sources are unavailable.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">The Atomic Claim Model</h2>
            <p>Rather than writing long narrative articles, we break religious information into <strong>atomic claims</strong>, individual, verifiable factual statements. Each claim is:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>A single, clear factual statement</li>
              <li>Linked to one or more citations with page numbers or URLs</li>
              <li>Categorized (beliefs, practices, history, demographics, ethics, sacred texts)</li>
              <li>Attributed to a specific religion or denomination</li>
              <li>Reviewed by editors before publication</li>
            </ul>
            <p className="mt-2">This model allows for precise comparisons and makes it easy to verify any individual piece of information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Editorial Review Process</h2>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li><strong>Research</strong>, Claims are drafted from primary and secondary sources by trained editors.</li>
              <li><strong>Citation</strong>, Every claim is linked to at least one verifiable source with specific page numbers, URLs, or section references.</li>
              <li><strong>Peer Review</strong>, A second editor reviews the claim for accuracy, neutrality, and proper citation.</li>
              <li><strong>Publication</strong>, Approved claims are published with full citation metadata visible to users.</li>
              <li><strong>Ongoing Review</strong>, Published claims are periodically reviewed and updated as new scholarship emerges.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Handling Disagreements</h2>
            <p>Religious traditions are diverse and interpretations vary. When sources disagree, we:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Present the majority scholarly view as the primary claim</li>
              <li>Note significant minority views or denominational differences</li>
              <li>Cite sources for all perspectives presented</li>
              <li>Never present one interpretation as &quot;correct&quot; over another</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Report an Error</h2>
            <p>If you find an inaccuracy, missing citation, or biased presentation, please let us know by emailing <a href="mailto:support@tpsworldwidellc.com" className="text-primary hover:underline">support@tpsworldwidellc.com</a>. We take all reports seriously and respond within 48 hours.</p>
          </section>
        </div>
      </div>
    </>
  );
}
