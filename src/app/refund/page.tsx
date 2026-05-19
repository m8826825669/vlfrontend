import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { CheckCircle2, XCircle, AlertTriangle, Mail } from 'lucide-react'

const LAST_UPDATED = 'May 13, 2026'

export default function RefundPage() {
  return (
    <div style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="pt-24">
        <div className="relative py-16 overflow-hidden" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
          <div className="container relative z-10 max-w-3xl">
            <div className="badge badge-emerald mb-4 inline-flex">Customer Promise</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-body)' }}>Refund Policy</h1>
            <p style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Last updated: {LAST_UPDATED}</p>
          </div>
        </div>

        <div className="container max-w-3xl py-16 space-y-10">

          {/* The guarantee */}
          <div className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(4,4,10,0) 100%)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <div className="text-5xl mb-4">↩️</div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-body)' }}>7-Day Money-Back Guarantee</h2>
            <p className="text-lg" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
              If you're not satisfied for any reason within 7 days of purchase, email us for a full refund.
              No long forms. No interrogation. No delays.
            </p>
          </div>

          {/* What's covered */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              ✅ Situations covered for a full refund
            </h2>
            <div className="space-y-3">
              {[
                'The software does not install or run on your system despite following the installation guide.',
                'A feature listed on the product page does not work as described.',
                'You purchased the wrong product or plan by mistake (within 7 days).',
                'You are dissatisfied with the software for any reason, within 7 days of purchase.',
                'Technical issues that our support team cannot resolve within 7 days.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 card-glass p-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What's not covered */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              ❌ Situations not eligible for a refund
            </h2>
            <div className="space-y-3">
              {[
                'Requests made more than 7 days after the original purchase date.',
                'If you have shared the licence key with third parties, resulting in licence abuse.',
                'Dissatisfaction with features that were not listed or promised on the product page.',
                'Change of mind after the 7-day window has passed.',
                'Purchases where an active licence has been used on 3 or more devices (indicates significant use).',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 card-glass p-4">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to request */}
          <section>
            <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              How to request a refund
            </h2>
            <div className="space-y-4 text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
              <div className="card-glass p-5">
                <p className="font-semibold text-white mb-2">Step 1 — Email us</p>
                <p>Send an email to <strong className="text-white">support@vexenlabs.com</strong> with the subject line:</p>
                <div className="mt-2 p-2.5 rounded-lg font-mono text-xs" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', color: '#A78BFA' }}>
                  Refund Request — Order #[YOUR ORDER NUMBER]
                </div>
              </div>
              <div className="card-glass p-5">
                <p className="font-semibold text-white mb-2">Step 2 — Include these details</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Your registered email address</li>
                  <li>Order number (found in your dashboard or purchase email)</li>
                  <li>Product name and plan purchased</li>
                  <li>Brief reason for the refund (optional but helpful)</li>
                </ul>
              </div>
              <div className="card-glass p-5">
                <p className="font-semibold text-white mb-2">Step 3 — We process it</p>
                <p>
                  We will review and process your refund within <strong className="text-white">2 business days</strong>.
                  The amount will be returned to your original payment method.
                  Bank processing time is typically 3–7 business days after we initiate the refund.
                </p>
              </div>
            </div>
          </section>

          {/* Note about licence revocation */}
          <div className="card-glass p-5 flex gap-4">
            <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
              <p className="font-semibold text-white mb-1">Licence revocation on refund</p>
              <p>
                When a refund is issued, the associated licence key will be deactivated and will stop working.
                Any data you have entered into the software remains on your machine — we do not delete your local data.
                You will lose access to software updates but not your data.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-6">
            <p className="text-sm mb-4" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
              Have a question before purchasing?
            </p>
            <Link href="/contact" className="btn-primary inline-flex gap-2 text-sm py-3 px-8">
              <Mail className="h-4 w-4" /> Contact Support
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}