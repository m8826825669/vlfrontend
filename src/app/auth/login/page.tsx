'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email:'', password:'' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      router.push('/dashboard')
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.response?.data?.non_field_errors?.[0] || 'Invalid credentials'
      toast.error(msg)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background:'var(--bg)'}}>
      {/* BG */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
          style={{background:'radial-gradient(circle,#7C3AED,transparent)'}}/>
      </div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-violet-600 rounded-xl rotate-6 opacity-60"/>
              <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center relative">
                <span className="font-bold text-white text-sm">VL</span>
              </div>
            </div>
            <span className="font-bold text-white text-lg" style={{fontFamily:'var(--font-body)'}}>VexenLabs</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>Welcome back</h1>
          <p style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Sign in to access your licenses and downloads</p>
        </div>

        <div className="card-glass p-8">
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Email Address</label>
              <input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}
                className="input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Password</label>
              <div className="relative">
                <input type={show?'text':'password'} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
                  className="input pr-11" placeholder="••••••••" />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:'var(--text-3)'}}>
                  {show?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link href="/auth/forgot-password" className="text-xs" style={{color:'var(--violet-l)',fontFamily:'var(--font-body)'}}>Forgot password?</Link>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
              {loading ? <Loader2 className="w-5 h-5 animate-spin"/> : <>Sign In <ArrowRight className="w-5 h-5"/></>}
            </button>
          </form>
          <p className="text-center text-sm mt-6" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
            Don't have an account?{' '}
            <Link href="/auth/register" style={{color:'var(--violet-l)'}}>Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
