'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, X, Mic } from 'lucide-react'
import { useStore } from '@/store/useStore'

export const AIChat = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<{role: "user" | "assistant" | "system", content: string}[]>([
    { role: 'assistant', content: 'Hello! I am your AI English tutor. We can chat about anything! How are you today?' }
  ])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { lang } = useStore()

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user' as const, content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })

      const data = await response.json()

      if (data.content) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.content
        }])
      }
    } catch (err) {
      console.error('Chat error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 lg:bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <MessageSquare size={28} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 lg:bottom-28 right-8 w-[380px] h-[550px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI Tutor</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-3 rounded-[20px] text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-[20px] rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything in English..."
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl pl-4 pr-24 py-3 text-sm outline-none focus:ring-2 ring-blue-500/20"
                />
                <div className="absolute right-2 top-1.5 flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600"><Mic size={18} /></button>
                  <button
                    onClick={handleSend}
                    disabled={loading}
                    className="p-1.5 bg-blue-600 text-white rounded-xl hover:scale-105 transition-transform disabled:bg-slate-400"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-wider">
                Credits: {messages.filter(m => m.role === 'user').length}/3 free used
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
