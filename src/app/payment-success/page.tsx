'use client'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Key, Download, ArrowRight, Loader2 } from 'lucide-react'

function PaymentSuccessContent() {
  const params = useSearchParams()
  const licenseKey = params.get('license_key') || params.get('license') || ''
  const productName = params.get('product') || 'Your Software'
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(licenseKey)
    setCopied(true); setTimeout(()=>setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'var(--bg)'}}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{background:'radial-gradient(circle,#10B981,transparent)'}}/>
      </div>
      <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="card-glass p-10 max-w-lg w-full text-center relative z-10">
        <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2,type:'spring'}}>
          <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-6"/>
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>Payment Successful! 🎉</h1>
        <p className="mb-8" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>
          Thank you for purchasing <strong className="text-white">{productName}</strong>. Your license is ready.
        </p>

        {licenseKey && (
          <div className="mb-8 p-5 rounded-2xl text-left" style={{background:'rgba(16,185,129,0.06)',border:'1px solid rgba(16,185,129,0.2)'}}>
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-emerald-400"/>
              <p className="text-sm font-semibold text-emerald-400" style={{fontFamily:'var(--font-body)'}}>Your License Key</p>
            </div>
            <p className="text-lg font-bold text-white mb-3 break-all" style={{fontFamily:'var(--font-mono)'}}>{licenseKey}</p>
            <button onClick={copy} className="btn-primary text-sm py-2 px-4 w-full justify-center">
              {copied?'✓ Copied!':'Copy License Key'}
            </button>
          </div>
        )}

        <p className="text-sm mb-6" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
          📧 A copy of your license key and invoice has been emailed to you.
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/dashboard" className="btn-primary">Go to Dashboard <ArrowRight className="w-4 h-4"/></Link>
          <Link href="/products" className="btn-ghost">Browse More</Link>
        </div>
      </motion.div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}><Loader2 className="w-8 h-8 animate-spin" style={{color:'var(--violet-l)'}}/></div>}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
