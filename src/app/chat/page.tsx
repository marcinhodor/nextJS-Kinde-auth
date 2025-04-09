"use client"

import { useState } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return

    setIsLoading(true)
    const newMessage: Message = { role: "user", content: prompt }
    setMessages((prev) => [...prev, newMessage])

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

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ])
    } catch (error) {
      setError("An error occurred while fetching the data.")
    } finally {
      setIsLoading(false)
      setPrompt("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] flex-col">
      <main className="flex-1 overflow-hidden p-4">
        <div className="mx-auto max-w-4xl">
          {/* Messages Area */}
          <div className="h-[calc(100vh-200px)] overflow-y-auto rounded-lg p-4 shadow-md">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 rounded-lg p-4 ${
                  message.role === "user" ? "bg-blue-900" : "bg-gray-900"
                }`}
              >
                <p className="text-sm font-semibold">
                  {message.role === "user" ? "You" : "Assistant"}:
                </p>
                <p className="mt-1">{message.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 rounded-lg border border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg bg-blue-500 p-4 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
