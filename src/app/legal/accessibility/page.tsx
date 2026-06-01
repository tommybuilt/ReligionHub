import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Accessibility Statement',
  description: `Accessibility Statement for ${siteConfig.name}. Our commitment to digital accessibility.`,
};

export default function AccessibilityPage() {
  const name = siteConfig.name;
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Our Commitment</h2>
          <p>{name} is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Standards</h2>
          <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Measures Taken</h2>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Semantic HTML structure with proper heading hierarchy.</li>
            <li>ARIA labels and roles on interactive elements.</li>
            <li>Keyboard navigation support throughout the site.</li>
            <li>Skip-to-content link for screen reader users.</li>
            <li>Sufficient color contrast ratios in both light and dark modes.</li>
            <li>Alt text for all meaningful images.</li>
            <li>Responsive design that works across devices and zoom levels.</li>
            <li>RTL (right-to-left) support for Arabic and other RTL languages.</li>
            <li>Focus indicators on all interactive elements.</li>
            <li>Form labels and error messages associated with their inputs.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Known Limitations</h2>
          <p>While we strive for full accessibility, some areas may have limitations:</p>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Some third-party embedded content may not be fully accessible.</li>
            <li>Complex comparison tables may be challenging on very small screens.</li>
            <li>Some externally sourced media and archived materials may not expose complete accessibility metadata.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Feedback</h2>
          <p>We welcome your feedback on the accessibility of {name}. If you encounter accessibility barriers, please contact ReligionCompare, a TPS Worldwide LLC property, at support@tpsworldwidellc.com. We will make reasonable efforts to address the issue promptly.</p>
        </section>
      </div>
    </div>
  );
}
