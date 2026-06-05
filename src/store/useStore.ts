import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  level: string
  isPaid: boolean
}

interface UserState {
  lang: 'ru' | 'uz' | 'en'
  user: User | null
  progress: number
  isAdmin: boolean
  setLang: (lang: 'ru' | 'uz' | 'en') => void
  setUser: (user: User | null) => void
  setProgress: (progress: number) => void
  setAdmin: (isAdmin: boolean) => void
  logout: () => void
}

export const useStore = create<UserState>()(
  persist(
    (set) => ({
      lang: 'ru',
      user: null,
      progress: 18,
      isAdmin: false,
      setLang: (lang) => set({ lang }),
      setUser: (user) => set({ user }),
      setProgress: (progress) => set({ progress }),
      setAdmin: (isAdmin) => set({ isAdmin }),
      logout: () => set({ user: null, isAdmin: false, progress: 0 }),
    }),
    {
      name: 'levelup-storage',
    }
  )
)
