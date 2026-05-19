import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from './api'

interface User { id: string; email: string; username: string; first_name: string; last_name: string; phone?: string; company?: string; is_staff?: boolean }

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login:        (email: string, password: string) => Promise<void>
  logout:       () => Promise<void>
  fetchProfile: () => Promise<void>
  setUser:      (u: User) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        const { data } = await authAPI.login({ email, password })
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
        set({ user: data.user, isAuthenticated: true })
      },

      logout: async () => {
        try {
          const refresh = localStorage.getItem('refresh_token')
          if (refresh) await authAPI.logout({ refresh })
        } catch {}
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        set({ user: null, isAuthenticated: false })
      },

      fetchProfile: async () => {
        try {
          const { data } = await authAPI.profile()
          set({ user: data, isAuthenticated: true })
        } catch {
          set({ user: null, isAuthenticated: false })
        }
      },

      setUser: (u) => set({ user: u, isAuthenticated: true }),
    }),
    { name: 'vexenlabs-auth', partialize: s => ({ user: s.user, isAuthenticated: s.isAuthenticated }) }
  )
)
