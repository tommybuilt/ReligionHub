import { siteConfig } from '@/lib/config';
import { generateBreadcrumbJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Editorial Policy',
  description: `Editorial Policy for ${siteConfig.name}. Our standards for neutrality, accuracy, and fairness.`,
};

export default function EditorialPolicyPage() {
  const name = siteConfig.name;
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Editorial Policy', url: '/about/editorial-policy' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="container max-w-3xl py-12">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><ChevronRight className="h-3 w-3" aria-hidden="true" /></li>
            <li className="text-foreground font-medium" aria-current="page">Editorial Policy</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold mb-8">Editorial Policy</h1>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Mission</h2>
            <p>{name} exists to provide the most accurate, neutral, and accessible comparative religion resource available. We serve students, educators, researchers, journalists, and anyone seeking to understand the world&apos;s religious traditions through factual, citation-backed information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Neutrality</h2>
            <p>We are committed to presenting all religions with equal respect and without bias. Our editorial standards require:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>No religion is presented as superior, more true, or more valid than any other</li>
              <li>Descriptive language only, we describe what adherents believe, not whether those beliefs are correct</li>
              <li>Equal depth of coverage proportional to available scholarly sources</li>
              <li>No editorial commentary or opinion in factual content</li>
              <li>Sensitivity to how adherents describe their own traditions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Accuracy Standards</h2>
            <p>Every published claim on {name} must meet these standards:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Backed by at least one verifiable citation from a primary or secondary source</li>
              <li>Reviewed and approved by a human editor before publication</li>
              <li>Free of generalizations that misrepresent the diversity within a tradition</li>
              <li>Clearly attributed to specific denominations when beliefs vary within a religion</li>
              <li>Dated and updated when new scholarship emerges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">AI-Assisted Workflow</h2>
            <p>{name} may use AI-assisted tools to help with early drafting, structure, copyediting, or formatting. These tools are used only under human editorial supervision.</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>AI tools are never treated as sources or authorities</li>
              <li>Every factual statement must still be checked against cited sources by a human editor</li>
              <li>Editors revise, approve, or reject AI-assisted wording before publication</li>
              <li>When a page is materially updated, it is reviewed again for accuracy, neutrality, and citation quality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Language Guidelines</h2>
            <p>Our editors follow these language principles:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Use &quot;adherents believe&quot; or &quot;the tradition teaches&quot; rather than stating beliefs as facts</li>
              <li>Avoid loaded terms, use &quot;denomination&quot; not &quot;sect,&quot; &quot;tradition&quot; not &quot;cult&quot;</li>
              <li>Use the names and terms that adherents use for themselves</li>
              <li>Provide transliterations and original-language terms where helpful</li>
              <li>Write at a reading level accessible to a general audience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Corrections Policy</h2>
            <p>We take errors seriously. When an error is identified:</p>
            <ol className="list-decimal pl-6 space-y-1 mt-2">
              <li>The claim is immediately flagged for review</li>
              <li>An editor verifies the error against original sources</li>
              <li>The claim is corrected or removed within 48 hours</li>
              <li>Material corrections are noted on the page or in internal revision records</li>
              <li>The reporter is notified of the outcome</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Independence</h2>
            <p>{name} is editorially independent. We do not accept funding, sponsorship, or editorial direction from any religious organization, government, or advocacy group. Our content decisions are made solely by our editorial team based on scholarly merit and user needs.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-3">Contact</h2>
            <p>Questions about our editorial policy can be directed to ReligionCompare, a TPS Worldwide LLC property, at support@tpsworldwidellc.com.</p>
          </section>
        </div>
      </div>
    </>
  );
}
