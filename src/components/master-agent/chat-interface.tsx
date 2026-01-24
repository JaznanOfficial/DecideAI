import * as React from "react"
import { Send, Paperclip, Mic, Bot, User, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm Humio. How can I assist you with your HR tasks today?",
    timestamp: "10:00 AM",
  },
  {
    id: "2",
    role: "user",
    content: "Can you help me analyze the recent candidate applications for the Senior Developer role?",
    timestamp: "10:01 AM",
  },
  {
    id: "3",
    role: "assistant",
    content: "Certainly! I've analyzed the 15 new applications. Based on the requirements, 3 candidates stand out with strong experience in React and Node.js. Would you like to see their profiles or a summary comparison?",
    timestamp: "10:01 AM",
  },
]

export function ChatInterface() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [input, setInput] = React.useState("")
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages([...messages, newMessage])
    setInput("")
    
    // Mock response for interaction
    setTimeout(() => {
        const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "I'm analyzing that request for you right now...",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
        setMessages(prev => [...prev, responseMessage])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full w-full bg-background rounded-lg border shadow-sm overflow-hidden relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur z-10 sticky top-0 h-16">
        {/* LEFT SIDE */}
        <div className="flex items-center">
            {/* DESKTOP: New Session Button */}
            <Button variant="outline" size="sm" className="hidden xl:flex gap-2 h-8 text-xs font-medium">
                <Plus className="h-3.5 w-3.5" />
                Create New Session
            </Button>

            {/* MOBILE: Humio Branding */}
            <div className="flex items-center gap-2 xl:hidden">
                 <div className="relative">
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                        <Bot className="h-5 w-5" />
                    </div>
                    <span className="absolute -top-1 -left-1 flex h-2.5 w-2.5">
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-background p-[1.5px]">
                            <span className="inline-flex rounded-full h-full w-full bg-green-500"></span>
                        </span>
                    </span>
                 </div>
                 <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-sm">Humio</h3>
                </div>
            </div>
        </div>

        {/* CENTER (DESKTOP ONLY) */}
        <div className="hidden xl:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                <Bot className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1">
                <h3 className="font-semibold text-sm">Humio</h3>
            </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 h-8 text-xs font-medium xl:hidden">
            <Plus className="h-3.5 w-3.5" />
            New Session
          </Button>
          <Button variant="ghost" size="sm" className="hidden xl:flex text-xs text-muted-foreground pointer-events-none px-3">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
            Online
          </Button>
        </div>
      </div>

      {/* Messages Area - Using flex-1 and min-h-0 is crucial for scrolling within flex column */}
      <div className="flex-1 min-h-0 relative overflow-hidden"> 
         <ScrollArea className="h-full p-4">
            <div className="space-y-6 pb-4">
            {messages.map((message) => (
                <div
                key={message.id}
                className={cn(
                    "flex w-full gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
                >
                <Avatar className="h-8 w-8 border">
                    <AvatarFallback className={message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-muted"}>
                        {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                </Avatar>
                <div className={cn(
                    "flex flex-col max-w-[80%]",
                    message.role === "user" ? "items-end" : "items-start"
                )}>
                    <div
                    className={cn(
                        "rounded-2xl px-4 py-2 text-sm shadow-sm",
                        message.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-tr-sm" 
                        : "bg-muted/50 border rounded-tl-sm"
                    )}
                    >
                    {message.content}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                    {message.timestamp}
                    </span>
                </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background  z-10">
        <div className="relative rounded-xl border bg-muted/20 focus-within:ring-1 focus-within:ring-ring transition-all">
            <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Humio..."
                className="min-h-15 max-h-[35vh] w-full resize-none border-0 bg-transparent p-4 placeholder:text-muted-foreground focus-visible:ring-0 shadow-none"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                    }
                }}
            />
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <Mic className="h-4 w-4" />
                    </Button>
                </div>
                <Button 
                    size="sm" 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="gap-2 rounded-lg"
                >
                 <Send className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
        
      </div>
    </div>
  )
}
