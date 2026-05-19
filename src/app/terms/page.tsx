import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const LAST_UPDATED = 'May 13, 2026'

const S = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-body)' }}>{title}</h2>
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{children}</div>
  </section>
)

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24">
        <div className="relative py-16 overflow-hidden" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.10) 0%, transparent 70%)' }} />
          <div className="container relative z-10 max-w-3xl">
            <div className="badge badge-violet mb-4 inline-flex">Legal</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-body)' }}>Terms of Service</h1>
            <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        <div className="container max-w-3xl py-16">

          <div className="card-glass p-5 mb-10 text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
            Please read these Terms of Service carefully before purchasing or using any Vexen Labs software.
            By completing a purchase or using our software, you agree to be bound by these terms.
          </div>

          <S title="1. Acceptance of Terms">
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of vexenlabs.com and any software products
              purchased from Vexen Labs (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By creating an account, making a purchase, or downloading
              our software, you agree to these Terms.
            </p>
          </S>

          <S title="2. Software Licence">
            <p>
              When you purchase a Vexen Labs software product, you receive a non-exclusive, non-transferable licence
              to use the software on the number of devices specified by your plan (Starter: 1, Professional: 3,
              Enterprise: 10). The licence is perpetual — it does not expire unless revoked for breach of these Terms.
            </p>
            <p><strong className="text-white">You may:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Install and use the software on your licensed number of devices.</li>
              <li>Use the software for commercial purposes within your own business.</li>
              <li>Make one backup copy of the software installer.</li>
            </ul>
            <p><strong className="text-white">You may not:</strong></p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Resell, sublicence, rent, or lend the software or your licence key to any third party.</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code.</li>
              <li>Use the software to build a competing product.</li>
              <li>Share your licence key publicly or with parties outside your licensed organisation.</li>
              <li>Remove or alter copyright notices or licence declarations within the software.</li>
            </ul>
          </S>

          <S title="3. Accounts">
            <p>
              You must create an account to purchase and manage licences. You are responsible for maintaining the
              confidentiality of your login credentials and for all activity that occurs under your account.
              You must provide accurate, current, and complete information during registration.
              Notify us immediately at support@vexenlabs.com if you suspect unauthorised access to your account.
            </p>
          </S>

          <S title="4. Pricing and Payment">
            <p>
              All prices are displayed in Indian Rupees (₹) unless otherwise specified. Prices are exclusive of
              applicable taxes (GST). Tax amounts are displayed at checkout before payment.
            </p>
            <p>
              Payment is processed by Razorpay. We accept UPI, credit/debit cards (Visa, Mastercard), net banking,
              and wallets. Your payment information is handled directly by Razorpay and is never stored on our servers.
            </p>
            <p>
              Licence keys are delivered to your registered email and dashboard immediately upon successful payment
              confirmation. If delivery fails, contact support@vexenlabs.com within 24 hours.
            </p>
          </S>

          <S title="5. Refund Policy">
            <p>
              We offer a <strong className="text-white">7-day money-back guarantee</strong> on all software purchases.
              See our <a href="/refund" className="underline" style={{ color: 'var(--violet-l)' }}>Refund Policy</a> for full details and conditions.
            </p>
          </S>

          <S title="6. Software Updates">
            <p>
              Free updates are included for the period specified in your plan (Starter: 1 year, Professional: 2 years,
              Enterprise: lifetime). Updates include bug fixes, security patches, and feature improvements.
              After the included update period, the software continues to work — you simply will not receive new
              feature updates unless you purchase an upgrade at a discounted rate.
            </p>
          </S>

          <S title="7. Support">
            <p>
              Technical support is provided via email at support@vexenlabs.com. We aim to respond within 4 business
              hours during Mon–Sat, 9AM–6PM IST. Support covers installation issues, licence activation problems,
              and software defects. It does not cover custom development, integration work, or issues caused by
              modifications to the software by the customer.
            </p>
          </S>

          <S title="8. Disclaimer of Warranties">
            <p>
              The software is provided &quot;as is&quot; without warranty of any kind, express or implied, including but not
              limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
              We do not warrant that the software will be error-free or that defects will be corrected within any
              specific timeframe.
            </p>
          </S>

          <S title="9. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, Vexen Labs shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising from your use of the software, even
              if we have been advised of the possibility of such damages. Our total liability to you for any claim
              arising from these Terms shall not exceed the amount you paid for the relevant software licence.
            </p>
          </S>

          <S title="10. Indemnification">
            <p>
              You agree to indemnify and hold Vexen Labs harmless from any claims, losses, damages, liabilities,
              and expenses (including legal fees) arising from your use of the software, your violation of these
              Terms, or your violation of any rights of a third party.
            </p>
          </S>

          <S title="11. Termination">
            <p>
              We reserve the right to suspend or terminate your account and revoke your licence(s) without refund
              if you breach these Terms, engage in fraudulent activity, or use the software in violation of
              applicable law. You may terminate your account at any time by emailing us; termination does not
              entitle you to a refund beyond the 7-day refund window.
            </p>
          </S>

          <S title="12. Governing Law">
            <p>
              These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject
              to the exclusive jurisdiction of the courts in [YOUR CITY, STATE], India.
            </p>
            <p className="p-3 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', color: '#FCD34D' }}>
              ⚠ Fill in your city and state above before publishing.
            </p>
          </S>

          <S title="13. Changes to Terms">
            <p>
              We may update these Terms from time to time. We will notify registered users of material changes
              by email at least 14 days before the changes take effect. Continued use after the effective date
              constitutes acceptance of the revised Terms.
            </p>
          </S>

          <S title="14. Contact">
            <p>
              For questions about these Terms, email <strong className="text-white">support@vexenlabs.com</strong>.
            </p>
          </S>
        </div>
      </div>
      <Footer />
    </div>
  )
}