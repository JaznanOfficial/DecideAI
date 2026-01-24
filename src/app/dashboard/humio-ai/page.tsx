"use client"

import { ChatInterface } from "@/components/master-agent/chat-interface"

export default function MasterAgentPage() {
  return (
    <div className="flex h-full w-full flex-1 min-h-0 overflow-hidden rounded-xl border bg-background shadow-sm">
      <ChatInterface />
    </div>
  )
}
