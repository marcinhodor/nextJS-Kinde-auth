import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  // Check if the request is authenticated with Kinde
  const { isAuthenticated } = await getKindeServerSession()
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { messages } = await req.json()

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
  })

  return result.toDataStreamResponse()
}
