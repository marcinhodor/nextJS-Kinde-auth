"use client"

import { useState } from "react"

import { InputArea } from "../components/chat/input-area"
import { MessageArea } from "../components/chat/message-area"
import { OpenAIMessage } from "../types/message"
import { completionSchema } from "../schemas/completion"

const DEFAULT_SYSTEM_PROMPT = "You are a helpful assistant. Resond in markdown"

export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<OpenAIMessage[]>([
    {
      role: "system",
      content: DEFAULT_SYSTEM_PROMPT,
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    const newMessage: OpenAIMessage = { role: "user", content: prompt }
    setMessages((prev) => [...prev, newMessage])
    setPrompt("")

    try {
      const updatedMessages = [...messages, newMessage]
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const rawData = await response.json()
      const data = completionSchema.safeParse(rawData)

      if (!data.success) {
        throw new Error("Invalid response format from OpenAI API")
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.data.choices[0].message.content },
      ])
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("An error occurred while fetching the data.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col">
      <main className="flex-1 overflow-hidden p-4">
        <div className="mx-auto max-w-4xl">
          {/* Messages Area */}
          <MessageArea messages={messages} isLoading={isLoading} />

          {/* Error message */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-100 p-4 text-red-700">
              {error}
            </div>
          )}

          {/* Input Area */}
          <InputArea
            handleSubmit={handleSubmit}
            prompt={prompt}
            setPrompt={setPrompt}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}
