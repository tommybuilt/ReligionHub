import { siteConfig } from '@/lib/config';

export const metadata = {
  title: 'DMCA Policy',
  description: `DMCA Policy for ${siteConfig.name}. How to report copyright infringement.`,
};

export default function DmcaPage() {
  const name = siteConfig.name;
  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-bold mb-8">DMCA Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Effective date: March 17, 2026 &middot; Last updated: March 17, 2026</p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Copyright Policy</h2>
          <p>{name} respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&quot;DMCA&quot;), we will respond expeditiously to claims of copyright infringement committed using our service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Fair Use</h2>
          <p>{name} presents factual information about world religions with citations to original sources. We believe our use of brief excerpts from published works for educational, comparative, and commentary purposes constitutes fair use under 17 U.S.C. &sect; 107. We always attribute sources and link to originals where possible.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Filing a DMCA Takedown Notice</h2>
          <p>If you believe that content on {name} infringes your copyright, please send a written notification to our designated DMCA agent containing:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>A physical or electronic signature of the copyright owner or authorized agent.</li>
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing, with sufficient information to locate it on our site (URL).</li>
            <li>Your contact information (address, telephone number, email).</li>
            <li>A statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement, under penalty of perjury, that the information in the notification is accurate and that you are the copyright owner or authorized to act on behalf of the owner.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">DMCA Agent</h2>
          <p>Send DMCA notices to: support@tpsworldwidellc.com</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">Counter-Notification</h2>
          <p>If you believe your content was removed in error, you may file a counter-notification containing: your physical or electronic signature; identification of the removed material and its former location; a statement under penalty of perjury that you have a good faith belief the material was removed by mistake; and your name, address, and telephone number, along with consent to jurisdiction of the federal court in your district.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mt-8 mb-3">General Contact</h2>
          <p>For corrections, feedback, or general inquiries about content on {name}:</p>
          <p>ReligionCompare, a TPS Worldwide LLC property<br />Phoenix, AZ, USA<br />Email: <a href="mailto:support@tpsworldwidellc.com" className="text-primary hover:underline">support@tpsworldwidellc.com</a></p>
        </section>
      </div>
    </div>
  );
}
