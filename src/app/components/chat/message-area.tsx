import { OpenAIMessage } from "@/app/types/message"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

export function MessageArea({
  messages,
  isLoading,
}: {
  messages: OpenAIMessage[]
  isLoading: boolean
}) {
  return (
    <div className="h-[calc(100vh-200px)] overflow-y-auto rounded-lg shadow-md">
      {messages.length === 1 ? (
        <div className="text-center">
          Begin the conversation by typing your first message.
        </div>
      ) : null}
      {messages
        .filter((message) => message.role !== "system")
        .map((message, index) => (
          <div
            key={index}
            className={`mb-4 rounded-lg p-4 ${
              message.role === "user" ? "bg-blue-900" : "bg-gray-900"
            }`}
          >
            {/* <p className="">{message.content}</p> */}
            <Markdown
              remarkPlugins={[remarkGfm]}
              // className="prose prose-invert max-w-none"
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-2 last:mb-0">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-2 last:mb-0">{children}</ol>
                ),
              }}
            >
              {message.content}
            </Markdown>
          </div>
        ))}
      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}
