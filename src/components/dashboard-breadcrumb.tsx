"use client"

import { useMemo } from "react"
import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Clock4, MessageSquare } from "lucide-react"

const chatSessions = [
  {
    id: "session-001",
    title: "Candidate insights · Product",
    detail: "Today · 10:01 AM",
  },
  {
    id: "session-002",
    title: "Headcount planning recap",
    detail: "Yesterday · 4:15 PM",
  },
  {
    id: "session-003",
    title: "Offer approvals · EMEA",
    detail: "Tuesday · 2:47 PM",
  },
] as const

function ChatHistoryDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 rounded-full border-border/70 text-sm font-medium"
        >
          <MessageSquare className="size-4" />
          Chat history
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="start">
        <DropdownMenuLabel className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <Clock4 className="size-3.5" />
          Recent sessions
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {chatSessions.map((session) => (
          <DropdownMenuItem
            key={session.id}
            className="flex flex-col items-start gap-1 py-3 text-left"
          >
            <span className="text-sm font-medium leading-none text-foreground">
              {session.title}
            </span>
            <span className="text-xs text-muted-foreground">{session.detail}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-primary">
          View all conversations
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function DashboardBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter((segment) => segment !== "")
  const isHumioPage = pathname === "/dashboard/humio-ai"

  const lastSegment = segments.length > 0 ? segments[segments.length - 1] : "Dashboard"

  const formattedSegment = useMemo(() => {
    return lastSegment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }, [lastSegment])

  if (isHumioPage) {
    return <ChatHistoryDropdown />
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
