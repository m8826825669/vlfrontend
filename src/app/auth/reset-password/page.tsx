'use client'
import { Suspense, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, Loader2, CheckCircle2, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

function ResetPasswordContent() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') || ''
  const uid = params.get('uid') || ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const passwordStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++
    if (/\d/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }
  const strength = passwordStrength(password)
  const strengthLabel = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'][strength]
  const strengthColor = ['#EF4444', '#F59E0B', '#FCD34D', '#A78BFA', '#6EE7B7', '#10B981'][strength]

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) { toast.error('Password must be at least 8 characters'); return }
    if (password !== confirm) { toast.error('Passwords do not match'); return }
    if (!token || !uid) { toast.error('Invalid or expired reset link'); return }

    setLoading(true)
    try {
      await authAPI.resetPassword({ uid, token, password, new_password: password })
      setDone(true)
      toast.success('Password reset successfully')
      setTimeout(() => router.push('/auth/login'), 2500)
    } catch (e: any) {
      const detail = e?.response?.data?.detail || e?.response?.data?.error || 'Reset link is invalid or expired'
      toast.error(detail)
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="card-glass p-10 max-w-md w-full text-center relative z-10">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-5" />
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>Password Reset!</h1>
        <p className="mb-6" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
          Your password has been updated. Redirecting you to login…
        </p>
        <Link href="/auth/login" className="btn-primary w-full justify-center">
          Continue to Login <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="card-glass p-10 max-w-md w-full relative z-10">
      <div className="text-center mb-7">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.25)' }}>
          <ShieldCheck className="w-6 h-6" style={{ color: '#A78BFA' }} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-body)' }}>
          Reset your password
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-2)', fontFamily: 'var(--font-body)' }}>
          Choose a new password for your Vexen Labs account.
        </p>
      </div>

      {(!token || !uid) ? (
        <div className="p-5 rounded-2xl text-sm text-center"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: '#FCA5A5', fontFamily: 'var(--font-body)' }}>
          This reset link is invalid or expired.
          <div className="mt-4">
            <Link href="/auth/forgot-password" className="btn-primary text-xs py-2 px-4">
              Request a new link
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs mb-1.5 block uppercase tracking-wider"
              style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-3)' }} />
              <input type={showPwd ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters" required className="input pl-11 pr-11" />
              <button type="button" onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors hover:bg-white/[0.05]">
                {showPwd ? <EyeOff className="w-4 h-4" style={{ color: 'var(--text-3)' }} /> : <Eye className="w-4 h-4" style={{ color: 'var(--text-3)' }} />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-all"
                      style={{ background: i < strength ? strengthColor : 'rgba(255,255,255,0.06)' }} />
                  ))}
                </div>
                <p className="text-xs" style={{ color: strengthColor, fontFamily: 'var(--font-body)' }}>{strengthLabel}</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs mb-1.5 block uppercase tracking-wider"
              style={{ color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-3)' }} />
              <input type={showPwd ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your new password" required className="input pl-11" />
            </div>
            {confirm && password !== confirm && (
              <p className="text-xs mt-1.5" style={{ color: '#FCA5A5', fontFamily: 'var(--font-body)' }}>
                Passwords don't match
              </p>
            )}
          </div>

          <button type="submit" disabled={loading || strength < 2}
            className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Updating…</> : <>Reset Password <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      )}

      <div className="text-center mt-6">
        <Link href="/auth/login" className="text-sm transition-colors hover:text-white"
          style={{ color: 'var(--text-3)', fontFamily: 'var(--font-body)' }}>
          ← Back to login
        </Link>
      </div>
    </motion.div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent)' }} />
      </div>
      <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin" style={{ color: 'var(--violet-l)' }} />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}