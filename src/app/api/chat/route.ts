import OpenAI from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log(body)
    const messages = body.messages || []

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
    })

    const reply = completion.choices[0].message.content

    return NextResponse.json({ message: reply })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json(
      { error: "There was an error processing your request" },
      { status: 500 }
    )
  }
}
