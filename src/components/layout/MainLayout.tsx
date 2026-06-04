'use client'

import React from 'react'
import { Sidebar } from './Sidebar'
import { Dashboard } from '../dashboard/Dashboard'
import { Courses } from '../courses/Courses'
import { AdminPanel } from '../admin/AdminPanel'
import { AIChat } from '../ai/AIChat'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Moon, Sun, Menu, LayoutDashboard, BookOpen, TestTube2, PlayCircle, CreditCard, ShieldCheck } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { useRouter, usePathname } from 'next/navigation'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { lang, setLang } = useStore()
  const [isDark, setIsDark] = React.useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const navItems = [
    { id: 'dashboard', path: '/', icon: LayoutDashboard, label: { ru: 'Домой', uz: 'Asosiy', en: 'Home' } },
    { id: 'courses', path: '/courses', icon: BookOpen, label: { ru: 'Курсы', uz: 'Kurslar', en: 'Courses' } },
    { id: 'leveltest', path: '/leveltest', icon: TestTube2, label: { ru: 'Тест', uz: 'Test', en: 'Test' } },
    { id: 'lessons', path: '/lessons', icon: PlayCircle, label: { ru: 'Уроки', uz: 'Darslar', en: 'Lessons' } },
    { id: 'payment', path: '/payment', icon: CreditCard, label: { ru: 'Оплата', uz: 'To‘lov', en: 'Payment' } },
    { id: 'admin', path: '/admin', icon: ShieldCheck, label: { ru: 'Админ', uz: 'Admin', en: 'Admin' } },
  ]

  const activeId = navItems.find(item => item.path === pathname)?.id || 'dashboard'

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 ${isDark ? 'dark' : ''}`}>
      <Sidebar activeSection={activeId} onSectionChange={(id: string) => router.push(navItems.find(n => n.id === id)?.path || '/')} />

      <main className="lg:ml-[290px] p-6 lg:p-8 pb-24 lg:pb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-3 shadow-sm">
            <Search className="text-slate-400" size={18} />
            <input
              placeholder="Search lessons, grammar, IELTS..."
              className="bg-transparent border-none outline-none w-full text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full p-1">
              {(['ru', 'uz', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                    lang === l ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => router.push('/leveltest')}
              className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-500/25"
            >
              Take level test
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <AIChat />

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 grid grid-cols-6 lg:hidden z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              activeId === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label[lang]}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
