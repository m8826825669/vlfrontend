'use client'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4" style={{background:'var(--bg)'}}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 50%,rgba(124,58,237,0.08) 0%,transparent 70%)'}}/>
      </div>
      <div className="relative z-10 max-w-lg">
        <p className="text-8xl font-bold mb-4" style={{background:'linear-gradient(135deg,#C4B5FD,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',fontFamily:'var(--font-body)'}}>404</p>
        <h1 className="text-3xl font-bold text-white mb-4" style={{fontFamily:'var(--font-body)'}}>Page not found</h1>
        <p className="mb-8" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn-primary">Go Home <ArrowRight className="w-4 h-4"/></Link>
          <Link href="/products" className="btn-ghost">Browse Software</Link>
        </div>
      </div>
    </div>
  )
}
