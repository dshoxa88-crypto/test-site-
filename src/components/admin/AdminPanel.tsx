'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Plus, Users, BarChart3, Lock, CheckCircle } from 'lucide-react'

export const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-black">Admin Access</h2>
        </div>
        <p className="text-slate-500 mb-8 text-sm">Please login with your owner credentials to manage the platform.</p>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Login</label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm" placeholder="admin" />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Password</label>
            <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm" type="password" placeholder="••••••••" />
          </div>
          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl font-black mt-4 transition-transform active:scale-95"
          >
            Enter Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-black mb-2 uppercase tracking-wider">
            ⚙️ Admin Panel
          </span>
          <h2 className="text-3xl font-black">Owner Dashboard</h2>
          <p className="text-slate-500">Manage lessons, files, and student access.</p>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-2xl font-black text-sm">Logout</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Students', val: '128', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Active Subscriptions', val: '42', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Revenue (Monthly)', val: '$1,250', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">{stat.label}</span>
            <b className="text-3xl font-black tracking-tight">{stat.val}</b>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Add New Lesson</h3>
            <button className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center"><Plus size={20} /></button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Level</label>
                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none">
                  <option>A1</option><option>A2</option><option>B1</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Time (min)</label>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm" placeholder="25" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Lesson Title</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm" placeholder="Daily routine: I wake up at 7" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Video URL / File ID</label>
              <input className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm" placeholder="youtube.com/..." />
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black mt-4 shadow-lg shadow-blue-500/20">Create Lesson</button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8">
          <h3 className="text-xl font-bold mb-8">Pending Activations</h3>
          <div className="space-y-4">
            {[
              { name: 'Aziz M.', plan: 'IELTS Premium', date: '2 mins ago' },
              { name: 'Elena S.', plan: 'B2 Course', date: '15 mins ago' },
              { name: 'Oleg D.', plan: 'Full Bundle', date: '1 hour ago' },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <b className="block text-sm">{p.name}</b>
                  <span className="text-[10px] text-blue-600 font-bold uppercase">{p.plan} • {p.date}</span>
                </div>
                <button className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-black">Activate</button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">View all students →</button>
        </div>
      </div>
    </div>
  )
}
