'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { translations } from '@/constants/translations'
import { CreditCard, QrCode, ShieldCheck, Send } from 'lucide-react'

export const Payment = () => {
  const { lang, setPaid } = useStore()
  const t = translations[lang]

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black mb-4 uppercase">
          💳 Payment
        </span>
        <h2 className="text-3xl font-black mb-2">Upgrade to Premium</h2>
        <p className="text-slate-500">Unlock all courses, AI Tutor, and get certificates.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {[
          { id: 'payme', title: t.paymeTitle, icon: 'P', color: 'bg-[#00BAFC]' },
          { id: 'click', title: t.clickTitle, icon: 'C', color: 'bg-[#0067FF]' },
        ].map((method) => (
          <div key={method.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl ${method.color} text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-blue-500/20`}>
                {method.icon}
              </div>
              <h3 className="text-xl font-black">{method.title}</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="relative group">
                <div className="w-48 h-48 rounded-[32px] bg-slate-100 dark:bg-slate-800 border-8 border-white dark:border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
                   <QrCode size={100} className="text-slate-300 group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <b className="text-xs font-black uppercase tracking-widest">Scan Me</b>
                   </div>
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <p className="text-sm text-slate-500 leading-relaxed">{t.payText}</p>
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                    <ShieldCheck size={14} /> Activation
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{t.activationText}</p>
                </div>
                <button
                  onClick={() => { setPaid(true); alert('Demo: Paid mode activated!'); }}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform"
                >
                  <Send size={18} />
                  {t.sendReceipt}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-black mb-4">Support 24/7</h3>
            <p className="text-slate-400 max-w-md">Having trouble with payment? Contact our support team on Telegram for manual activation.</p>
          </div>
          <button className="bg-blue-600 px-10 py-5 rounded-[24px] font-black text-lg shadow-2xl shadow-blue-500/40 hover:scale-105 transition-transform active:scale-95">
            Message Support
          </button>
        </div>
      </div>
    </div>
  )
}
