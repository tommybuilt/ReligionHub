import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'Site Guidelines',
  description: `Site guidelines for ${siteConfig.name}. Standards for respectful, factual communication and submissions.`,
};

export default function GuidelinesPage() {
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">Site Guidelines</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Our Mission</h2>
          <p>{siteConfig.name} exists to provide factual, neutral, citation-backed information about world religions. These guidelines apply to corrections, submissions, contact messages, and any other direct interaction with the site team.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">1. Be Respectful</h2>
          <p>Treat all religions, their adherents, and other readers with respect. Disagreement is welcome; disrespect is not. Personal attacks, insults, and derogatory language will not be accepted in submissions or correspondence.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">2. Stay Factual</h2>
          <p>When making claims about a religion, cite your sources. Anecdotal experience is valid for personal sharing but should not be presented as representative of an entire tradition. Distinguish between widely held beliefs and minority interpretations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">3. No Proselytizing</h2>
          <p>Do not use site submissions, correction requests, or contact channels to recruit, convert, or promote one religion over another. Sharing your perspective is fine in context, but attempts to persuade readers to adopt a belief system are outside the site’s purpose.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">4. No Hate Speech</h2>
          <p>Content that promotes hatred, violence, or discrimination against any religious group, ethnicity, gender, sexual orientation, or other protected characteristic is strictly prohibited and will result in immediate account suspension.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">5. Stay On Topic</h2>
          <p>Keep messages and submissions focused on religion literacy, factual corrections, sourcing, or site functionality. Off-topic outreach may be declined. Political discussion is appropriate only when it is directly relevant to religion, policy, or history.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">6. No Spam or Self-Promotion</h2>
          <p>Do not post advertisements, affiliate links, or repetitive content. Sharing relevant academic resources or books is welcome; commercial promotion is not.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">7. Report, Don&apos;t Retaliate</h2>
          <p>If you find a factual error or harmful issue on the site, contact ReligionCompare, a TPS Worldwide LLC property, at support@tpsworldwidellc.com with the page URL and a concise description. Do not escalate through harassment or repeated hostile messages.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Enforcement</h2>
          <p>Violations may lead to correspondence being declined, submissions being rejected, or reported material being removed from consideration. Severe violations, including hate speech or threats, may be escalated immediately.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Appeals</h2>
          <p>If you believe a decision was made in error, contact ReligionCompare, a TPS Worldwide LLC property, at support@tpsworldwidellc.com with the page URL, the relevant material, and a concise description of the issue.</p>
        </section>
      </div>
    </div>
  );
}
