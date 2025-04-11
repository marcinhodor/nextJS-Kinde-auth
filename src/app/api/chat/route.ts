import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import OpenAI from "openai"
import { NextRequest, NextResponse } from "next/server"
import { OpenAIMessage } from "@/app/types/message"
import { messageSchema } from "@/app/schemas/message"
import { z } from "zod"
import { completionSchema } from "@/app/schemas/completion"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest, response: NextResponse) {
  // Check if the request is authenticated with Kinde
  const { isAuthenticated } = await getKindeServerSession()
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const messages = z.array(messageSchema).parse(body.messages || [])

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages.map((message: OpenAIMessage) => ({
        role: message.role,
        content: message.content,
      })),
    })

    // Validate the OpenAI response
    const validatedCompletion = completionSchema.parse(completion)

    return NextResponse.json(validatedCompletion)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request or response format", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "There was an error processing your request" },
      { status: 500 }
    )
  }
}
