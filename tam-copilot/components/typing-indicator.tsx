"use client"

import { cn } from "@/lib/utils"

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div className="animate-bounce h-2 w-2 bg-primary rounded-full" style={{ animationDelay: "0ms" }}></div>
      <div className="animate-bounce h-2 w-2 bg-primary rounded-full" style={{ animationDelay: "300ms" }}></div>
      <div className="animate-bounce h-2 w-2 bg-primary rounded-full" style={{ animationDelay: "600ms" }}></div>
    </div>
  )
}