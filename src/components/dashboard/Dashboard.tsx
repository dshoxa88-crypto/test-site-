'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/constants/translations'
import { Zap, Headphones, Brain, Trophy } from 'lucide-react'
import { PersonalDictionary } from './PersonalDictionary'

export const Dashboard = () => {
  const { lang, level, progress } = useStore()
  const t = translations[lang]

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 relative overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-6">
            <Zap size={14} fill="currentColor" />
            SMART ENGLISH PLATFORM
          </span>

          <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4">
            {t.heroTitle}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mb-8">
            {t.heroText}
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform">
              {t.startTest}
            </button>
            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              {t.viewCourses}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '6', label: 'A1–C1 + IELTS' },
              { val: '3', label: 'RU / UZ / EN' },
              { val: '24/7', label: 'Self-study access' },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <b className="text-2xl block">{stat.val}</b>
                <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center">
          <h3 className="text-xl font-bold mb-6">Your learning path</h3>

          <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-blue-500/40 mb-6">
            {level || '?'}
          </div>

          <p className="text-slate-500 mb-6">
            {level ? 'Continue where you left off.' : 'Take the test to unlock your recommended path.'}
          </p>

          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-500"
            />
          </div>

          <button className="w-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/25">
            Continue learning
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6">
        <div className="grid md:grid-cols-2 gap-6 content-start">
          {[
            { icon: Headphones, title: 'Real audio practice', tag: 'Listening', text: 'Each lesson can include listening, questions and transcript.' },
            { icon: Brain, title: 'Simple grammar', tag: 'Grammar', text: 'Rules are explained clearly with examples and practice.' },
            { icon: Trophy, title: 'IELTS preparation', tag: 'IELTS', text: 'Separate modules for Listening, Reading, Writing and Speaking.' },
            { icon: Zap, title: 'AI tutor', tag: 'NEW', text: 'Chat with our AI to practice your speaking and writing skills.' },
          ].map((card, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 shadow-lg shadow-slate-200/50 dark:shadow-none">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black mb-4 uppercase">
                <card.icon size={12} />
                {card.tag}
              </span>
              <h4 className="text-xl font-bold mb-2">{card.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        <PersonalDictionary />
      </div>
    </div>
  )
}
