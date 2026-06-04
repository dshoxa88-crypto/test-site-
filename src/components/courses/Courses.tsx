'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'

export const Courses = () => {
  const courses = [
    { id: 'A1', name: 'Beginner', goal: 'Alphabet, basic words, simple sentences, daily phrases.', weeks: 8, lessons: 32, color: '🔰' },
    { id: 'A2', name: 'Elementary', goal: 'Simple conversations, routine, travel, shopping, basic grammar.', weeks: 10, lessons: 40, color: '🌱' },
    { id: 'B1', name: 'Intermediate', goal: 'Confident everyday speech, stories, opinions, common listening.', weeks: 12, lessons: 48, color: '🚀' },
    { id: 'B2', name: 'Upper-Intermediate', goal: 'Fluent discussions, movies, podcasts, complex grammar.', weeks: 14, lessons: 56, color: '⚡' },
    { id: 'C1', name: 'Advanced', goal: 'Debates, academic vocabulary, professional communication.', weeks: 16, lessons: 64, color: '💎' },
    { id: 'IELTS', name: 'IELTS Preparation', goal: 'Listening, Reading, Writing Task 1/2, Speaking mock practice.', weeks: 12, lessons: 52, color: '🏆' }
  ]

  const { setLevel } = useStore()

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-4 uppercase">
          📚 All Courses
        </span>
        <h2 className="text-3xl font-black mb-2">Choose your English level</h2>
        <p className="text-slate-500">The platform recommends a course after the test, but you can preview all levels.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-4">
              {course.color} {course.id}
            </span>
            <h3 className="text-2xl font-black mb-2">{course.name}</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">{course.goal}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-500">{course.weeks} weeks</span>
              <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-500">{course.lessons} lessons</span>
              <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase text-slate-500">Video + Audio</span>
            </div>

            <button
              onClick={() => setLevel(course.id)}
              className="w-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white py-3 rounded-2xl font-black shadow-lg shadow-blue-500/20"
            >
              Open {course.id}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
