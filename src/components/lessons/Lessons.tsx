'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, Clock, BookOpen, CheckCircle2 } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { translations } from '@/constants/translations'
import { defaultLessons } from '@/constants/lessons'
import { LessonModal } from './LessonModal'

export const Lessons = () => {
  const { lang, level } = useStore()
  const t = translations[lang]
  const [selectedLesson, setSelectedLesson] = React.useState<any>(null)

  const filteredLessons = level
    ? defaultLessons.filter(l => l.level === level)
    : defaultLessons

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl" />
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-4 uppercase">
          ▶️ {t.todayLessons}
        </span>
        <h2 className="text-3xl font-black mb-2">{level || 'All'} full lessons</h2>
        <p className="text-slate-500">{t.lessonIntro}</p>
      </div>

      <div className="grid gap-4">
        {filteredLessons.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[28px] hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                {i + 1}
              </div>
              <div>
                <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{lesson.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <BookOpen size={10} /> {lesson.level}
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <PlayCircle size={10} /> {lesson.type}
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Clock size={10} /> {lesson.time}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedLesson(lesson)}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-2xl font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg group-hover:shadow-blue-500/25"
            >
              {t.startLesson}
            </button>
          </motion.div>
        ))}
      </div>

      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  )
}
