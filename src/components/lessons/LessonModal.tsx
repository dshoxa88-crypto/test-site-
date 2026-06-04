'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Book, Headphones, CheckCircle2, ChevronRight } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { translations } from '@/constants/translations'

export const LessonModal = ({ lesson, onClose }: { lesson: any, onClose: () => void }) => {
  const [activeTab, setActiveTab] = React.useState('video')
  const { lang } = useStore()

  const tabs = [
    { id: 'video', label: 'Video', icon: Play },
    { id: 'words', label: 'Words', icon: Book },
    { id: 'listen', label: 'Listening', icon: Headphones },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle2 },
  ]

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
          <div>
            <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest block mb-1">{lesson.level} • {lesson.type}</span>
            <h2 className="text-xl font-bold">{lesson.title}</h2>
          </div>
          <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-black transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'video' && (
              <div className="space-y-8">
                <div className="aspect-video rounded-[32px] bg-slate-900 flex items-center justify-center text-white text-2xl font-black overflow-hidden border-8 border-slate-100 dark:border-slate-800 shadow-inner">
                  {lesson.video}
                </div>
                <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-[32px] p-8">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm">🎯</span>
                    Lesson Goal
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">{lesson.body}</p>
                </div>
              </div>
            )}

            {activeTab === 'words' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-4">
                  {lesson.vocab.map((v: any, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <b className="text-lg block mb-1">{v[0]}</b>
                      <span className="text-sm text-slate-500">{v[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-[32px] p-8 border border-slate-100 dark:border-slate-800">
                  <h3 className="text-lg font-black mb-4">🧠 Grammar</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{lesson.grammar}</p>
                </div>
              </div>
            )}

            {activeTab === 'listen' && (
              <div className="space-y-8">
                <div className="bg-cyan-50/50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-900/30 rounded-[32px] p-8">
                  <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                    <Headphones size={20} />
                    Audio Transcript
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{lesson.audio}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8">
                  <h3 className="text-lg font-black mb-4">📖 Reading</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{lesson.reading}</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-black">✍️ Practice Tasks</h3>
                  {lesson.tasks.map((t: string, i: number) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-blue-600 border border-slate-100 dark:border-slate-800">{i+1}</div>
                      <span className="text-sm font-bold">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2">Ready for the quiz?</h3>
                <p className="text-slate-500 mb-8">Test your knowledge of what you've just learned.</p>
                <button className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-green-500/25">Start Quiz</button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-800/50">
          <button onClick={onClose} className="px-6 py-3 rounded-2xl font-black text-sm text-slate-400 hover:text-slate-600 transition-colors">Close</button>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-blue-500/25">Complete Lesson</button>
        </div>
      </motion.div>
    </div>
  )
}
