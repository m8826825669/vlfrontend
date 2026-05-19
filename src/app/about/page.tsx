'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Globe, Heart } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div style={{background:'var(--bg)'}}>
      <Navbar />
      <div className="pt-24">
        {/* Hero */}
        <div className="relative py-24 overflow-hidden" style={{borderBottom:'1px solid var(--border)'}}>
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.12) 0%,transparent 70%)'}}/>
          <div className="container relative z-10 max-w-3xl text-center">
            <div className="badge badge-violet mb-6 inline-flex">Our Story</div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{fontFamily:'var(--font-body)'}}>
              We believe software should be{' '}
              <span style={{background:'linear-gradient(135deg,#C4B5FD,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>owned, not rented</span>
            </h1>
            <p className="text-xl leading-relaxed" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>
              Vexen Labs was founded on a simple idea: businesses deserve powerful software without the endless subscription trap.
            </p>
          </div>
        </div>

        {/* Mission */}
        <section className="section">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6" style={{fontFamily:'var(--font-body)'}}>Why we built this</h2>
                <p className="leading-relaxed mb-4" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>
                  We watched small businesses pay $200/month forever for software they could have bought once for $500. We watched schools in areas with poor internet struggle with cloud-dependent systems. We watched pharmacies lose thousands of rupees in expired stock because their inventory system lacked proper expiry tracking.
                </p>
                <p className="leading-relaxed" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>
                  So we built the alternative. Offline-first. One-time purchase. Professional-grade. No compromises.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'Privacy first', desc: 'Your data stays on your machine. Always.' },
                  { icon: Zap,    title: 'Built for speed', desc: 'Native desktop performance, not browser lag.' },
                  { icon: Globe,  title: 'Works everywhere', desc: 'Offline-first. Internet optional.' },
                  { icon: Heart,  title: 'Fair pricing',    desc: 'Pay once. Own forever. No tricks.' },
                ].map(v=>(
                  <div key={v.title} className="card-glass p-4 flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(124,58,237,0.12)'}}>
                      <v.icon className="w-4 h-4" style={{color:'var(--violet-l)'}}/>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm" style={{fontFamily:'var(--font-body)'}}>{v.title}</p>
                      <p className="text-xs" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section" style={{background:'var(--bg-2)'}}>
          <div className="container text-center max-w-2xl">
            <h2 className="text-3xl font-bold text-white mb-4" style={{fontFamily:'var(--font-body)'}}>Ready to own your software?</h2>
            <p className="mb-8" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Join 500+ businesses worldwide who chose ownership over subscription.</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products" className="btn-amber px-8 py-3.5">Browse Software <ArrowRight className="w-4 h-4"/></Link>
              <Link href="/contact" className="btn-ghost px-8 py-3.5">Contact Us</Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
