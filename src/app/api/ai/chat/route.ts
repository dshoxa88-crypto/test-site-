import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a helpful and friendly English tutor. Your goal is to chat with the student, correct their grammar if they make mistakes, and encourage them to speak more. Use simple and clear language. Avoid topics related to violence, drugs, or illegal activities. If the user mentions these, politely refuse to discuss them.`
        },
        ...messages
      ],
    })

    return NextResponse.json({
      content: response.choices[0].message.content
    })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}
