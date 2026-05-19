'use client'
import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'

// ── ⚠  FILL IN YOUR REAL DETAILS BELOW  ──────────────────────────────────────
const WHATSAPP_NUMBER = 'YOUR_NUMBER_WITHOUT_PLUS'   // e.g. 919876543210
const TWITTER_URL     = 'https://twitter.com/vexenlabs'   // or remove
const LINKEDIN_URL    = 'https://linkedin.com/company/vexenlabs'
const GITHUB_URL      = 'https://github.com/vexenlabs'    // or remove
// ─────────────────────────────────────────────────────────────────────────────

const LINKS = {
  Products: [
    { label: 'School Management ERP',   href: '/products/school-erp'     },
    { label: 'Clinic Manager Pro',       href: '/products/clinic-manager'  },
    { label: 'Medical Store ERP',        href: '/products/medical-store'   },
    { label: 'BharatBooks Accounting',   href: '/products/accounting'      },
    { label: 'All Products',             href: '/products'                 },
  ],
  Company: [
    { label: 'About Vexen Labs',  href: '/about'   },
    { label: 'Contact Us',        href: '/contact' },
    { label: 'Validate Licence',  href: '/validate'},
  ],
  Support: [
    { label: 'Contact Support',   href: '/contact'          },
    { label: 'Validate Licence',  href: '/validate'         },
    { label: 'WhatsApp Chat',     href: `https://wa.me/${WHATSAPP_NUMBER}`, external: true },
  ],
  Legal: [
    { label: 'Privacy Policy',      href: '/privacy' },
    { label: 'Terms of Service',    href: '/terms'   },
    { label: 'Refund Policy',       href: '/refund'  },
    { label: 'Licence Agreement',   href: '/eula'    },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      <div className="container py-20">

        {/* Top grid */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-12 mb-16">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-violet-600 rounded-xl rotate-6 opacity-60" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-white text-sm">VL</span>
                </div>
              </div>
              <span className="font-bold text-white text-xl tracking-tight" style={{ fontFamily: 'var(--font-body)' }}>
                Vexen<span className="text-violet-400">Labs</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
              Building powerful offline-first desktop software for schools, clinics, and businesses.
              One-time purchase. Lifetime ownership. No subscriptions.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <a href="mailto:support@vexenlabs.com" className="flex items-center gap-2.5 group">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--violet-l)' }} />
                <span className="text-sm group-hover:text-white transition-colors" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                  support@vexenlabs.com
                </span>
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
                {/* WhatsApp SVG icon */}
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--violet-l)' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm group-hover:text-white transition-colors" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                  Chat on WhatsApp
                </span>
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--violet-l)' }} />
                <span className="text-sm" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>India · Ships Worldwide</span>
              </div>
            </div>

            {/* Social — only show real ones */}
            <div className="flex gap-2">
              {[
                { label:'Twitter',  href: TWITTER_URL,  svg: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.836 5.905-5.836zm-1.161 17.52h1.833L7.084 4.126H5.117z"/> },
                { label:'LinkedIn', href: LINKEDIN_URL, svg: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/> },
                { label:'GitHub',   href: GITHUB_URL,   svg: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-3)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(124,58,237,0.4)'
                    el.style.color = '#A78BFA'
                    el.style.background = 'rgba(124,58,237,0.08)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.color = 'var(--text-3)'
                    el.style.background = 'transparent'
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">{s.svg}</svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-5"
                style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{group}</h4>
              <ul className="space-y-3">
                {items.map((item: any) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment trust bar */}
        <div className="flex flex-wrap items-center gap-4 py-6 mb-6"
          style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Accepted payments</span>
          <div className="flex flex-wrap gap-2">
            {['Razorpay', 'UPI', 'Visa', 'Mastercard', 'Net Banking'].map(p => (
              <span key={p} className="badge badge-violet text-[10px]">{p}</span>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>🔒 256-bit SSL</span>
            <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>↩️ 7-day refund</span>
            <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>📴 Offline-first</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            © {year} Vexen Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms"   className="hover:text-white transition-colors">Terms</Link>
            <Link href="/refund"  className="hover:text-white transition-colors">Refunds</Link>
            <Link href="/eula"    className="hover:text-white transition-colors">EULA</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}