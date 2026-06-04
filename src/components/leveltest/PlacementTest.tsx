'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ChevronRight, Trophy } from 'lucide-react'

const testQuestions = [
  {q:'Choose the correct sentence:',options:['She go to school','She goes to school','She going school','She gone school'],a:1},
  {q:'What is the past form of “buy”?',options:['buyed','bought','buying','buys'],a:1},
  {q:'Choose the best answer: I have lived here ___ 2020.',options:['for','since','during','from'],a:1},
  {q:'Which sentence is more natural?',options:['I very like English','I really like English','I like very English','I much like English'],a:1},
  {q:'IELTS style: “Despite the rain, the match continued.” means:',options:['The rain stopped the match','The match continued although it rained','There was no rain','The match was cancelled'],a:1},
  {q:'Present Perfect vs Past Simple: Choose the best answer:',options:['I have seen that movie yesterday.','I saw that movie yesterday.','I see that movie yesterday.','I have saw that movie yesterday.'],a:1},
  {q:'Conditionals: Complete the sentence: If I had more time, I ___ more books.',options:['read','will read','would read','would have read'],a:2},
  {q:'Passive voice: Choose the correct sentence:',options:['The email sent yesterday.','The email was sent yesterday.','The email has sent yesterday.','The email did sent yesterday.'],a:1},
  {q:'Relative clauses: Choose the best sentence:',options:['The person which called you is my teacher.','The person who called you is my teacher.','The person where called you is my teacher.','The person what called you is my teacher.'],a:1},
  {q:'Advanced vocabulary: What does “to mitigate a problem” mean?',options:['to make a problem less serious','to completely ignore a problem','to create a new problem','to describe a problem emotionally'],a:0}
]

export const PlacementTest = () => {
  const [currentQ, setCurrentQ] = React.useState(0)
  const [score, setScore] = React.useState(0)
  const [selected, setSelected] = React.useState<number | null>(null)
  const [finished, setFinished] = React.useState(false)
  const { setLevel, setProgress } = useStore()
  const router = useRouter()

  const handleNext = () => {
    if (selected === null) return
    if (selected === testQuestions[currentQ].a) setScore(score + 1)

    if (currentQ < testQuestions.length - 1) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
    } else {
      const lv = score <= 2 ? 'A1' : score <= 4 ? 'A2' : score <= 6 ? 'B1' : score <= 8 ? 'B2' : 'IELTS'
      setLevel(lv)
      setProgress(10)
      setFinished(true)
    }
  }

  if (finished) {
    const lv = score <= 2 ? 'A1' : score <= 4 ? 'A2' : score <= 6 ? 'B1' : score <= 8 ? 'B2' : 'IELTS'
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] p-12 shadow-2xl shadow-blue-500/10"
      >
        <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/40">
          <Trophy size={48} />
        </div>
        <h2 className="text-3xl font-black mb-2">Your level is {lv}!</h2>
        <p className="text-slate-500 mb-8 italic">We've tailored your learning path based on your results.</p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push('/lessons')}
            className="bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-500/25 transition-transform active:scale-95"
          >
            Start Learning {lv}
          </button>
          <button
            onClick={() => { setFinished(false); setCurrentQ(0); setScore(0); setSelected(null); }}
            className="text-slate-400 font-bold hover:text-slate-600"
          >
            Retake Test
          </button>
        </div>
      </motion.div>
    )
  }

  const q = testQuestions[currentQ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex items-center justify-between mb-8">
          <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">Question {currentQ + 1} of {testQuestions.length}</span>
          <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQ + 1) / testQuestions.length) * 100}%` }}
              className="h-full bg-blue-600"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-8 leading-tight">{q.q}</h3>

        <div className="space-y-3 mb-10">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full text-left p-5 rounded-2xl font-bold transition-all border ${
                selected === i
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-blue-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {selected === i && <CheckCircle2 size={20} />}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null}
          className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all ${
            selected !== null
              ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xl'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentQ === testQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
