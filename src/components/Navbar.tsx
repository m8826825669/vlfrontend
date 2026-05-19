'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, LogOut, LayoutDashboard, Key, User, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropOpen, setDropOpen]   = useState(false)
  const { user, isAuthenticated, logout, fetchProfile } = useAuthStore()
  const router   = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const t = localStorage.getItem('access_token')
    if (t && !user) fetchProfile()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    toast.success('Signed out successfully')
    router.push('/')
  }

  const navLinks = [
    { label: 'Products', href: '/products' },
    { label: 'Pricing',  href: '/products#pricing' },
    { label: 'About',    href: '/about' },
    { label: 'Contact',  href: '/contact' },
  ]

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(4,4,10,0.85)] backdrop-blur-2xl border-b border-white/[0.06] py-4'
          : 'py-6'
      }`}>
        <div className="container flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-violet-600 rounded-xl rotate-6 opacity-60 group-hover:rotate-12 transition-transform" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-violet-500 to-violet-700 rounded-xl flex items-center justify-center">
                <span className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-body)' }}>VL</span>
              </div>
            </div>
            <div>
              <span className="font-bold text-white text-lg tracking-tight" style={{ fontFamily: 'var(--font-body)' }}>
                Vexen<span className="text-violet-400">Labs</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  pathname === link.href
                    ? 'text-white bg-white/[0.08]'
                    : 'text-[var(--text-2)] hover:text-white hover:bg-white/[0.05]'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative">
                <button onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.04] hover:border-violet-500/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-bold">
                    {user?.first_name?.[0] || user?.email?.[0] || 'U'}
                  </div>
                  <span className="text-sm text-[var(--text-2)]" style={{ fontFamily: 'var(--font-body)' }}>
                    {user?.first_name || 'Account'}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-3)] transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 card-glass py-2 shadow-2xl"
                      onMouseLeave={() => setDropOpen(false)}
                    >
                      {[
                        { icon: LayoutDashboard, label: 'Dashboard',   href: '/dashboard' },
                        { icon: Key,            label: 'My Licenses', href: '/dashboard' },
                        { icon: User,           label: 'Profile',     href: '/dashboard/profile' },
                        ...(user?.is_staff ? [{ icon: ShieldCheck, label: 'Admin', href: '/admin' }] : []),
                      ].map(item => (
                        <Link key={item.href} href={item.href} onClick={() => setDropOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-2)] hover:text-white hover:bg-white/[0.05] transition-all"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          <item.icon className="w-4 h-4 text-violet-400" />
                          {item.label}
                        </Link>
                      ))}
                      <div className="border-t border-white/[0.06] mt-1 pt-1">
                        <button onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="btn-ghost text-sm py-2.5 px-5">Sign In</Link>
                <Link href="/products" className="btn-primary text-sm py-2.5 px-5">
                  Browse Software <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-[var(--text-2)] hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-0 inset-x-0 z-40 bg-[var(--bg-2)] border-b border-white/[0.06] pt-20 pb-6"
          >
            <div className="container flex flex-col gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-[var(--text-2)] hover:text-white hover:bg-white/[0.05] transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] mt-3 pt-3 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="btn-ghost justify-center">Dashboard</Link>
                    <button onClick={handleLogout} className="btn-ghost justify-center text-red-400">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-ghost justify-center">Sign In</Link>
                    <Link href="/products" onClick={() => setMobileOpen(false)} className="btn-primary justify-center">Browse Software</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
