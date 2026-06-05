'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import {
  LayoutDashboard,
  BookOpen,
  TestTube2,
  PlayCircle,
  CreditCard,
  ShieldCheck
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: { ru: 'Домой', uz: 'Asosiy', en: 'Home' } },
  { id: 'courses', icon: BookOpen, label: { ru: 'Курсы', uz: 'Kurslar', en: 'Courses' } },
  { id: 'leveltest', icon: TestTube2, label: { ru: 'Тест', uz: 'Test', en: 'Test' } },
  { id: 'lessons', icon: PlayCircle, label: { ru: 'Уроки', uz: 'Darslar', en: 'Lessons' } },
  { id: 'payment', icon: CreditCard, label: { ru: 'Оплата', uz: 'To‘lov', en: 'Payment' } },
  { id: 'admin', icon: ShieldCheck, label: { ru: 'Админ', uz: 'Admin', en: 'Admin' } },
]

export const Sidebar = ({ activeSection, onSectionChange }: any) => {
  const { lang, user, progress } = useStore()

  if (!user) return null

  return (
    <aside className="fixed left-0 top-0 h-screen w-[290px] p-6 bg-white/72 dark:bg-slate-900/78 backdrop-blur-lg border-r border-slate-200 dark:border-slate-800 z-10 hidden lg:flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-lg">
          LU
        </div>
        <div>
          <h1 className="text-lg font-bold">LevelUp English</h1>
          <p className="text-xs text-slate-500">From Beginner to IELTS</p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeSection === item.id
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <item.icon size={20} />
            {item.label[lang]}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="p-4 rounded-[20px] bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-slate-100 dark:border-slate-800">
          <b className="block text-sm">{user.isPaid ? 'Premium Student' : 'Student'}</b>
          <span className="text-xs text-slate-500">Level: {user.level || 'not tested'}</span>
          <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
