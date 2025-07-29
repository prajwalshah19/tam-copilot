"use client"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { executeProcessQuery } from "@/services/query"
import { TypingIndicator } from "@/components/typing-indicator"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string 
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatView() {
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you with The Arbor Montessori today?",
      sender: "ai",
      timestamp: new Date(),
    }
  ])

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSendMessage = async (message: string) => {
    console.log("Sending message:", message)
    if (!message.trim()) return
    setIsLoading(true)
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    try {
      // Get AI response using executeProcessQuery
      let response = await executeProcessQuery(message)
      // Remove erroneous new lines (multiple consecutive newlines to single, trim)
      response = response.toString().replace(/\n{2,}/g, '\n').trim()
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "ai",
        timestamp: new Date(),
      }
      setIsLoading(false)
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      // Handle error with an error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error processing your request. Please try again.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsLoading(false)
      console.error('Error processing message:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <Card className="flex flex-col h-full max-h-[90vh] w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-primary">TAM Copilot Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full min-h-full justify-end">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "max-w-full sm:max-w-[70%] rounded-lg p-4 break-words",
                  message.sender === "user"
                    ? "self-end bg-primary text-primary-foreground text-right"
                    : "self-start bg-muted text-left"
                )}
              >
                <div className="whitespace-pre-wrap break-words overflow-hidden">
                  {message.content.split(/\r?\n/).map((line, idx) => (
                    <ReactMarkdown key={idx}>{line}</ReactMarkdown>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="max-w-full sm:max-w-[70%] self-start rounded-lg p-4 bg-muted">
                <TypingIndicator />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-center space-x-2">
            <Textarea
              placeholder="Type your message here..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(inputMessage)
                }
              }}
            />
            <Button
              size="icon"
              onClick={() => handleSendMessage(inputMessage)}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
