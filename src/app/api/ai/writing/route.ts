import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { text, level, task } = await req.json()

    // Mock check for credits (in real app, check DB here)
    // const credits = await checkUserCredits()
    // if (credits <= 0) return NextResponse.json({ error: 'No credits' }, { status: 403 })

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert English teacher. Analyze the user's text for level ${level}. Task: ${task}.
          Provide:
          1. Corrected version.
          2. Explanation of mistakes in a friendly way.
          3. Score out of 10 based on grammar, vocabulary, and coherence.
          Keep the tone encouraging. Format as JSON.`
        },
        { role: 'user', content: text }
      ],
      response_format: { type: 'json_object' }
    })

    // Deduct credit here
    // await deductCredit()

    return NextResponse.json(JSON.parse(response.choices[0].message.content || '{}'))
  } catch (error) {
    console.error('AI Writing Error:', error)
    return NextResponse.json({ error: 'Failed to analyze text' }, { status: 500 })
  }
}
