import React, { useEffect, useRef } from "react"

export function InputArea({
  handleSubmit,
  prompt,
  setPrompt,
  isLoading,
}: {
  handleSubmit: (e: React.FormEvent) => Promise<void>
  setPrompt: React.Dispatch<React.SetStateAction<string>>
  prompt: string
  isLoading: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [isLoading])

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="mt-4">
      <div className="flex items-center gap-4">
        <input
          ref={inputRef}
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
          className="rounded-lg bg-blue-900 p-4 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  )
}
