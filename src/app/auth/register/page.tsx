'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Loader2, Check } from 'lucide-react'
import { authAPI } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', username:'', phone:'', company:'', password:'', password2:'' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const { fetchProfile } = useAuthStore()
  const router = useRouter()

  const pw = form.password
  const checks = { len: pw.length>=8, num: /\d/.test(pw), letter: /[a-zA-Z]/.test(pw) }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.password2) { toast.error('Passwords do not match'); return }
    setLoading(true)
    try {
      const { data } = await authAPI.register(form)
      localStorage.setItem('access_token', data.access || data.tokens?.access)
      localStorage.setItem('refresh_token', data.refresh || data.tokens?.refresh)
      await fetchProfile()
      toast.success('Account created! Welcome to Vexen Labs.')
      router.push('/dashboard')
    } catch (err: any) {
      const d = err.response?.data
      const msg = d?.email?.[0] || d?.username?.[0] || d?.detail || d?.non_field_errors?.[0] || 'Registration failed'
      toast.error(msg)
    } finally { setLoading(false) }
  }

  const F = (k: string, label: string, type='text', ph='') => (
    <div>
      <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>{label}</label>
      <input type={type} value={(form as any)[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
        className="input" placeholder={ph} required={['first_name','email','username','password','password2'].includes(k)} />
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12" style={{background:'var(--bg)'}}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
          style={{background:'radial-gradient(circle,#7C3AED,transparent)'}}/>
      </div>

      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="w-full max-w-lg relative z-10">
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
          <h1 className="text-3xl font-bold text-white mb-2" style={{fontFamily:'var(--font-body)'}}>Create your account</h1>
          <p style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>Get instant access to your licenses after purchase</p>
        </div>

        <div className="card-glass p-8">
          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {F('first_name','First Name','text','John')}
              {F('last_name','Last Name','text','Doe')}
            </div>
            {F('email','Email Address','email','john@company.com')}
            {F('username','Username','text','john_doe')}
            <div className="grid grid-cols-2 gap-4">
              {F('phone','Phone (optional)','tel','+1 555 000 0000')}
              {F('company','Company (optional)','text','Acme Corp')}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Password</label>
              <div className="relative">
                <input type={show?'text':'password'} required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
                  className="input pr-11" placeholder="Min 8 characters" />
                <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{color:'var(--text-3)'}}>
                  {show?<EyeOff className="w-4 h-4"/>:<Eye className="w-4 h-4"/>}
                </button>
              </div>
              <div className="flex gap-4 mt-2">
                {Object.entries({len:'8+ chars',num:'Number',letter:'Letter'}).map(([k,lbl])=>(
                  <span key={k} className="flex items-center gap-1 text-xs" style={{color:(checks as any)[k]?'#6EE7B7':'var(--text-3)',fontFamily:'var(--font-body)'}}>
                    <Check className="w-3 h-3"/>{lbl}
                  </span>
                ))}
              </div>
            </div>
            {F('password2','Confirm Password','password','Repeat password')}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base mt-2">
              {loading?<Loader2 className="w-5 h-5 animate-spin"/>:<>Create Account <ArrowRight className="w-5 h-5"/></>}
            </button>
          </form>
          <p className="text-center text-sm mt-5" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>
            Already have an account? <Link href="/auth/login" style={{color:'var(--violet-l)'}}>Sign in →</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
