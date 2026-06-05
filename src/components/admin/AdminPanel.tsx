'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Users, BarChart3, CheckCircle, Trash2, UserPlus, Key } from 'lucide-react'
import { useStore } from '@/store/useStore'

export const AdminPanel = () => {
  const { isAdmin } = useStore()
  const [students, setStudents] = React.useState([
    { id: '1', name: 'Aziz M.', username: 'aziz', level: 'B1', isPaid: true },
    { id: '2', name: 'Elena S.', username: 'elena', level: 'A2', isPaid: false },
  ])

  const [newStudent, setNewStudent] = React.useState({ name: '', username: '', password: '', level: 'A1' })

  const addStudent = () => {
    if (!newStudent.name || !newStudent.username || !newStudent.password) return
    const s = {
      id: Date.now().toString(),
      name: newStudent.name,
      username: newStudent.username,
      level: newStudent.level,
      isPaid: false
    }
    setStudents([...students, s])
    setNewStudent({ name: '', username: '', password: '', level: 'A1' })
    alert(`Account created!\nLogin: ${s.username}\nPassword: ${newStudent.password}`)
  }

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
  }

  const togglePremium = (id: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, isPaid: !s.isPaid } : s))
  }

  if (!isAdmin) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-black text-red-500">Access Denied</h2>
        <p className="text-slate-500 mt-2">Only administrators can access this section.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[10px] font-black mb-2 uppercase tracking-wider">
            ⚙️ Admin Panel
          </span>
          <h2 className="text-3xl font-black">Owner Dashboard</h2>
          <p className="text-slate-500">Manage student accounts and platform content.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {[
          { label: 'Total Students', val: students.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Active Subscriptions', val: students.filter(s => s.isPaid).length.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Revenue (Monthly)', val: `$${students.filter(s => s.isPaid).length * 50}`, icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">{stat.label}</span>
            <b className="text-3xl font-black tracking-tight">{stat.val}</b>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
              <UserPlus size={20} />
            </div>
            <h3 className="text-xl font-bold">Issue New Account</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Student Full Name</label>
              <input
                value={newStudent.name}
                onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm"
                placeholder="Ivan Ivanov"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Login / Username</label>
                <input
                  value={newStudent.username}
                  onChange={e => setNewStudent({...newStudent, username: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm"
                  placeholder="ivan2024"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Password</label>
                <input
                  type="password"
                  value={newStudent.password}
                  onChange={e => setNewStudent({...newStudent, password: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-1.5 block">Starting Level</label>
              <select
                value={newStudent.level}
                onChange={e => setNewStudent({...newStudent, level: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option><option>IELTS</option>
              </select>
            </div>
            <button
              onClick={addStudent}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black mt-4 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
            >
              Generate Account
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm">
          <h3 className="text-xl font-bold mb-8">Registered Students</h3>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {students.map((s) => (
              <div key={s.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <b className="block text-sm">{s.name}</b>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-blue-600 font-bold uppercase">{s.level}</span>
                    <span className={`text-[10px] font-bold uppercase ${s.isPaid ? 'text-green-500' : 'text-slate-400'}`}>
                      {s.isPaid ? 'Premium' : 'Free'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => togglePremium(s.id)}
                    className={`p-2 rounded-xl transition-colors ${s.isPaid ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-500'}`}
                    title="Toggle Premium Access"
                  >
                    <Key size={16} />
                  </button>
                  <button
                    onClick={() => deleteStudent(s.id)}
                    className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {students.length === 0 && (
              <p className="text-center text-slate-400 py-12 text-sm italic">No students registered yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
