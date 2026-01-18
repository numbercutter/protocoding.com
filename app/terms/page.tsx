import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Protocoding\'s website and services.',
};

const LAST_UPDATED = 'January 18, 2026';

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <div className="section-row-dark">
        <div className="gutter-left" />
        <div className="material-dark p-8 pt-20 md:p-12 md:pt-12 lg:p-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-4">Legal</p>
          <h1 className="text-3xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Terms of <span className="text-accent">Service</span>
          </h1>
          <p className="text-sm text-white/40">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Content */}
      <div className="section-row">
        <div className="gutter-left" />
        <div className="material-elevated p-6 md:p-10 lg:p-16">
          <div className="max-w-3xl space-y-10">
            
            {/* Introduction */}
            <section>
              <p className="text-sm text-gray-600 leading-relaxed">
                Welcome to Protocoding. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Protocoding website at protocoding.com (the &quot;Site&quot;) and any services provided by Protocoding, Inc. (&quot;Protocoding,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using our Site, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Site.
              </p>
            </section>

            {/* Use of Site */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">1. Use of Our Site</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                You may use our Site only for lawful purposes and in accordance with these Terms. You agree not to:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li>Use the Site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to any part of the Site or its systems</li>
                <li>Use automated tools to scrape, crawl, or extract data from the Site without permission</li>
                <li>Transmit malware, viruses, or other harmful code</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Interfere with or disrupt the Site&apos;s operation or servers</li>
              </ul>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">2. Our Services</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Protocoding provides software development, design, and consulting services. Any engagement for services will be governed by a separate agreement (such as a Statement of Work or Master Services Agreement) that will contain specific terms regarding scope, deliverables, timelines, payment, and other conditions.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Information provided on this Site about our services is for general informational purposes only and does not constitute a binding offer or guarantee of any specific results.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">3. Intellectual Property</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                All content on this Site, including but not limited to text, graphics, logos, images, code, and software, is the property of Protocoding or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise use any content from this Site without our prior written consent, except as permitted by law for personal, non-commercial use.
              </p>
            </section>

            {/* User Submissions */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">4. User Submissions</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                When you submit information through our contact forms, job applications, or other means, you grant us the right to use that information for the purposes for which it was submitted (e.g., responding to inquiries, evaluating job applications).
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                You represent that any information you provide is accurate, current, and complete, and that you have the right to share any materials you submit.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">5. Third-Party Links</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our Site may contain links to third-party websites or services. These links are provided for convenience only. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites. Your use of third-party sites is at your own risk.
              </p>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">6. Disclaimers</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, PROTOCODING DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-600 leading-relaxed space-y-1 ml-2">
                <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                <li>Warranties that the Site will be uninterrupted, error-free, or secure</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of any content</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">7. Limitation of Liability</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY LAW, PROTOCODING AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING UNDER THESE TERMS SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">8. Indemnification</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                You agree to indemnify, defend, and hold harmless Protocoding and its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your violation of these Terms, your use of the Site, or your violation of any rights of another party.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">9. Modifications to Terms</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will post any changes on this page and update the &quot;Last updated&quot; date. Your continued use of the Site after any modifications constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">10. Termination</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We may terminate or suspend your access to the Site at any time, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Site will immediately cease.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">11. Governing Law & Disputes</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Any dispute arising out of or relating to these Terms or your use of the Site shall be resolved exclusively in the state or federal courts located in San Francisco County, California, and you consent to the personal jurisdiction of such courts.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">12. Severability</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties&apos; original intent.
              </p>
            </section>

            {/* Entire Agreement */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">13. Entire Agreement</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                These Terms, together with our <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link>, constitute the entire agreement between you and Protocoding regarding your use of the Site. Any separate service agreements will supplement but not replace these Terms with respect to the specific services covered.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight mb-4">14. Contact Us</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                If you have questions about these Terms, please contact us:
              </p>
              <div className="material-inset p-4 text-sm text-gray-600">
                <p className="font-bold text-gray-900">Protocoding, Inc.</p>
                <p>San Francisco, CA</p>
                <p>Email: <a href="mailto:legal@protocoding.com" className="text-accent hover:underline">legal@protocoding.com</a></p>
              </div>
            </section>

          </div>
        </div>
        <div className="gutter-right" />
      </div>

      {/* Back link */}
      <div className="section-row">
        <div className="gutter-left" />
        <Link
          href="/"
          className="material-inset flex items-center justify-center gap-2 p-6 text-xs font-bold text-gray-900 hover:material transition-all uppercase tracking-[0.2em]"
        >
          ← Back to Home
        </Link>
        <div className="gutter-right" />
      </div>
    </>
  );
}
