'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, ArrowRight, Loader2, CheckCircle2, Phone, MapPin, Clock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { authAPI } from '@/lib/api'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      await authAPI.contact(form)
      setSent(true); toast.success('Message sent! We\'ll reply within 4 hours.')
    } catch { toast.error('Failed to send. Email us directly at support@vexenlabs.com') }
    finally { setLoading(false) }
  }

  return (
    <div style={{background:'var(--bg)'}}>
      <Navbar />
      <div className="pt-24">
        <div className="relative py-20 overflow-hidden" style={{borderBottom:'1px solid var(--border)'}}>
          <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 50% 0%,rgba(124,58,237,0.1) 0%,transparent 70%)'}}/>
          <div className="container relative z-10 text-center">
            <div className="badge badge-violet mb-6 inline-flex">Get in Touch</div>
            <h1 className="text-5xl font-bold text-white mb-4" style={{fontFamily:'var(--font-body)'}}>
              We'd love to <span style={{background:'linear-gradient(135deg,#C4B5FD,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>hear from you</span>
            </h1>
            <p className="text-lg max-w-xl mx-auto" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>
              Questions, demos, custom quotes, or just want to say hi — we respond to every message.
            </p>
          </div>
        </div>

        <div className="container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-6">
              {[
                { icon: Mail,    title: 'Email Support', info: 'support@vexenlabs.com', sub: 'Response within 4 hours' },
                { icon: MessageSquare, title: 'WhatsApp',  info: 'Chat with us', sub: 'Quick support on WhatsApp' },
                { icon: Clock,   title: 'Business Hours', info: 'Mon–Sat, 9AM–6PM IST', sub: 'Emergency support available' },
                { icon: MapPin,  title: 'Location',       info: 'Worldwide · Remote-first', sub: 'Support in English & Hindi' },
              ].map(c=>(
                <div key={c.title} className="card-glass p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:'rgba(124,58,237,0.12)'}}>
                    <c.icon className="w-5 h-5" style={{color:'var(--violet-l)'}}/>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm" style={{fontFamily:'var(--font-body)'}}>{c.title}</p>
                    <p className="text-sm" style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>{c.info}</p>
                    <p className="text-xs" style={{color:'var(--text-3)',fontFamily:'var(--font-body)'}}>{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-glass p-8">
                {sent ? (
                  <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="text-center py-12">
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-emerald-400"/>
                    <h3 className="text-2xl font-bold text-white mb-3" style={{fontFamily:'var(--font-body)'}}>Message sent!</h3>
                    <p style={{color:'var(--text-2)',fontFamily:'var(--font-body)'}}>We'll get back to you at <strong className="text-white">{form.email}</strong> within 4 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={submit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Your Name *</label>
                        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="input" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Email Address *</label>
                        <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="input" placeholder="john@company.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Subject *</label>
                      <select required value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="input" style={{fontFamily:'var(--font-body)'}}>
                        <option value="">Select a topic...</option>
                        <option>Pre-sales question</option>
                        <option>Technical support</option>
                        <option>License activation</option>
                        <option>Refund request</option>
                        <option>Custom development</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white" style={{fontFamily:'var(--font-body)'}}>Message *</label>
                      <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="input resize-none" placeholder="Tell us how we can help..." />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 text-base">
                      {loading?<Loader2 className="w-5 h-5 animate-spin"/>:<>Send Message <ArrowRight className="w-5 h-5"/></>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
