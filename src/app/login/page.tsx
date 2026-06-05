'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { Lock, GraduationCap, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const { setUser, setAdmin } = useStore()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Admin login
    if (username === 'admin' && password === 'admin123') {
      setAdmin(true)
      setUser({
        id: 'admin',
        name: 'Administrator',
        level: 'C1/IELTS',
        isPaid: true
      })
      router.push('/')
      return
    }

    // Mock student login (we'll make this dynamic later)
    if (username === 'student' && password === 'student123') {
      setUser({
        id: 'student-1',
        name: 'Demo Student',
        level: 'A1',
        isPaid: false
      })
      router.push('/')
      return
    }

    setError('Invalid username or password')
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 mx-auto flex items-center justify-center text-white font-black text-2xl shadow-xl mb-4">
            LU
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">LevelUp English</h1>
          <p className="text-slate-500 mt-2 font-medium">Welcome back, student!</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="username" className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Username</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <GraduationCap size={18} />
                </div>
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold text-center italic">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl font-black mt-4 flex items-center justify-center gap-2 group transition-all hover:bg-blue-600 active:scale-95"
            >
              Sign In
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs font-medium">
          Forgot your credentials? Contact your teacher for access.
        </p>
      </motion.div>
    </div>
  )
}
