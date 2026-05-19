'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try { await authAPI.forgotPassword({ email }); setSent(true) }
    catch { toast.error('Could not send reset email. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'var(--bg)'}}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" style={{background:'radial-gradient(circle,#7C3AED,transparent)'}}/>
      </div>
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center">
              <span className="font-bold text-white text-sm">VL</span>
            </div>
            <span className="font-bold text-white text-lg" style={{fontFamily:'var(--font-body)'}}>VexenLabs</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>Forgot password?</h1>
          <p style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Enter your email to receive a reset link</p>
        </div>
        <div className="card-glass p-8">
          {sent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4"/>
              <p className="font-bold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>Check your inbox!</p>
              <p className="text-sm" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Reset link sent to <strong className="text-white">{email}</strong></p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Email Address</label>
                <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="input" placeholder="you@example.com"/>
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Send Reset Link <ArrowRight className="w-5 h-5"/></>}
              </button>
            </form>
          )}
          <p className="text-center text-sm mt-5" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
            <Link href="/auth/login" style={{color:'var(--violet-l)'}}>← Back to login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
