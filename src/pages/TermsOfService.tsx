import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TermsHeroPlayer } from '@/components/legal/TermsHeroPlayer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDocumentTitle } from '@/hooks/use-document-title';

const TermsOfService = () => {
  useDocumentTitle('Terms of Service | ShubhzTechWork');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-8 md:pt-12">
        <TermsHeroPlayer />
      </div>
      <main id="main-content" className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mb-10">Last Updated: February 27, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/85">
          {/* 1 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>services.shubhztechwork.com</strong> (the "Website"), you agree to be bound
              by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you should not use
              the Website.
            </p>
            <p>
              ShubhzTechWork reserves the right to update these Terms at any time. Changes take effect upon posting to
              this page. Continued use of the Website after changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">2. Description of Website</h2>
            <p>
              This Website is an informational and marketing platform for <strong>ShubhzTechWork</strong>, a technology
              services company offering Infrastructure, Security, DevOps & SRE, Graphics, IT Solutions, and Generative
              AI services.
            </p>
            <p>
              The Website provides general information about our services, case studies, blog articles, and a contact
              form. <strong>Nothing on this Website constitutes a binding service agreement.</strong> Actual service
              engagements require a separate signed contract between ShubhzTechWork and the client.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">3. Intellectual Property</h2>
            <p>
              All content on this Website — including but not limited to text, graphics, animations, logos, icons, blog
              posts, case studies, and source code — is the intellectual property of ShubhzTechWork and is protected
              under applicable copyright and trademark laws.
            </p>
            <p>
              You may not reproduce, copy, distribute, modify, or create derivative works from any content on this
              Website without prior written permission from ShubhzTechWork. The ShubhzTechWork name, logo, and brand
              marks are proprietary.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">4. Acceptable Use</h2>
            <p>By using this Website, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Attempt to gain unauthorized access to the Website, its servers, or any connected systems</li>
              <li>Use automated tools, bots, or scrapers to harvest content from the Website</li>
              <li>Submit false, misleading, or malicious content through the contact form</li>
              <li>Use the contact form to send spam or unsolicited commercial communications</li>
              <li>Attempt to disrupt or degrade Website performance through any means</li>
              <li>Use the Website for any purpose that is unlawful under Indian or international law</li>
            </ul>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">5. Contact Form</h2>
            <p>
              By submitting the contact form, you represent that the information you provide is accurate and that your
              inquiry is made in good faith. ShubhzTechWork will respond to genuine business inquiries at its discretion.
            </p>
            <p>
              Submission of the contact form does <strong>not</strong> create any contractual obligation on ShubhzTechWork
              to provide services. Spam or abusive submissions may be reported to relevant authorities.
            </p>
            <p>
              For information on how your contact form data is handled, please see our{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">6. Disclaimer of Warranties</h2>
            <p>
              The Website is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without
              warranties of any kind, either express or implied, including but not limited to warranties of
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>ShubhzTechWork does not warrant that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The Website will be available at all times without interruption</li>
              <li>The Website will be free of errors, viruses, or other harmful components</li>
              <li>
                Information on the Website is complete, accurate, or up-to-date at all times
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, ShubhzTechWork shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from or related to your use of the Website.
            </p>
            <p>
              This includes, without limitation, damages for loss of profits, data, goodwill, or other intangible
              losses, even if ShubhzTechWork has been advised of the possibility of such damages. ShubhzTechWork is not
              liable for any loss caused by reliance on content published on this Website.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">8. No Professional Advice</h2>
            <p>
              The blog articles, case studies, and other content on this Website are for{' '}
              <strong>informational purposes only</strong> and do not constitute legal, financial, technical, or
              professional advice. You should consult a qualified professional before making business decisions based on
              any content from this Website.
            </p>
            <p>
              Case studies reflect past projects and do not guarantee similar outcomes for future engagements.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">9. AI Services Disclaimer</h2>
            <p>
              ShubhzTechWork offers Generative AI and AI-related services. Any descriptions of AI capabilities on this
              Website are general in nature. AI systems can produce variable and unpredictable outputs.
            </p>
            <p>
              ShubhzTechWork is not liable for decisions made based on AI-related content described on this Website.
              Specific capabilities, limitations, and deliverables are defined in individual service contracts.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">10. Third-Party Links</h2>
            <p>
              The Website may contain links to third-party websites (such as LinkedIn, GitHub, and others).
              ShubhzTechWork does not endorse or control these external sites and is not responsible for their content,
              privacy practices, or availability. You visit third-party links at your own risk.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">11. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising
              from or related to these Terms or the use of the Website shall be subject to the exclusive jurisdiction of
              the courts in <strong>Mumbai, Maharashtra, India</strong>.
            </p>
            <p>
              Both parties agree to attempt good-faith resolution of any dispute before initiating legal proceedings. A
              written notice should be sent to{' '}
              <a href="mailto:info@shubhztechwork.com" className="text-primary hover:underline">
                info@shubhztechwork.com
              </a>{' '}
              and a 30-day resolution period shall apply.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">12. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable by a court of competent
              jurisdiction, the remaining provisions shall continue in full force and effect. These Terms, along with our{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>, constitute the entire agreement between you and ShubhzTechWork regarding the use of this Website.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">13. Contact Us</h2>
            <p>If you have any questions about these Terms, contact us:</p>
            <ul className="list-none pl-0 space-y-1 mt-3">
              <li><strong>ShubhzTechWork</strong></li>
              <li>Mumbai, Maharashtra, India</li>
              <li>
                Email:{' '}
                <a href="mailto:info@shubhztechwork.com" className="text-primary hover:underline">
                  info@shubhztechwork.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
