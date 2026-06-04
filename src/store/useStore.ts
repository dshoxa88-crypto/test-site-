import { create } from 'zustand'

interface UserState {
  lang: 'ru' | 'uz' | 'en'
  level: string
  progress: number
  isPaid: boolean
  isAdmin: boolean
  setLang: (lang: 'ru' | 'uz' | 'en') => void
  setLevel: (level: string) => void
  setProgress: (progress: number) => void
  setPaid: (isPaid: boolean) => void
}

export const useStore = create<UserState>((set) => ({
  lang: 'ru',
  level: '',
  progress: 18,
  isPaid: false,
  isAdmin: false,
  setLang: (lang) => set({ lang }),
  setLevel: (level) => set({ level }),
  setProgress: (progress) => set({ progress }),
  setPaid: (isPaid) => set({ isPaid }),
}))
