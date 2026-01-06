"use client"

import { ChatInterface } from "@/components/master-agent/chat-interface"
import { PreviewPanel } from "@/components/master-agent/preview-panel"

export default function MasterAgentPage() {
  return (
    <div className="flex flex-1 h-[calc(100vh-4rem)] -mt-4 overflow-hidden rounded-xl border bg-background shadow-sm md:h-[calc(100vh-2rem)]">
        {/* Chat Area - Takes available space */}
        <div className="flex-1 min-w-0">
            <ChatInterface />
        </div>

        {/* Preview Area - Fixed width on desktop, hidden on mobile */}
        <div className="hidden lg:block w-[400px] xl:w-[450px]">
            <PreviewPanel />
        </div>
    </div>
  )
}
