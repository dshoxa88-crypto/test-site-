'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookMarked, Trash2, GraduationCap } from 'lucide-react'

export const PersonalDictionary = () => {
  const [words, setWords] = React.useState([
    { word: 'Betrayal', translation: 'Предательство', mistakes: 3 },
    { word: 'Consequence', translation: 'Последствие', mistakes: 2 },
    { word: 'Personalize', translation: 'Персонализировать', mistakes: 1 },
  ])

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-black mb-2 uppercase tracking-wider">
            🧠 Study List
          </span>
          <h3 className="text-2xl font-black">Personal Dictionary</h3>
          <p className="text-sm text-slate-500">Words you often get wrong in tests.</p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
          <BookMarked size={28} />
        </div>
      </div>

      <div className="space-y-3">
        {words.map((w, i) => (
          <motion.div
            key={i}
            whileHover={{ x: 10 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center font-black text-blue-600 shadow-sm border border-slate-100 dark:border-slate-800">
                {w.word[0]}
              </div>
              <div>
                <b className="block text-slate-800 dark:text-slate-100">{w.word}</b>
                <span className="text-xs text-slate-500">{w.translation}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase block">Mistakes</span>
                <span className="text-sm font-black text-orange-500">{w.mistakes}</span>
              </div>
              <button className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full mt-8 flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl font-black hover:scale-[1.02] transition-transform">
        <GraduationCap size={20} />
        Practice these words
      </button>
    </div>
  )
}
