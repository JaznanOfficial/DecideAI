"use client"

import * as React from "react"
import {
  Archive,
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  Command,
  Gauge,
  GitMerge,
  KeyRound,
  LayoutDashboard,
  LayoutGrid,
  LifeBuoy,
  RefreshCcw,
  Rocket,
  ShieldAlert,
  Send,
  Users,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { useSession } from "@/lib/auth-client"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navGroups: [
    {
      label: "People",
      items: [
        { title: "Overview", url: "/dashboard/operations/people/overview", icon: LayoutDashboard },
        { title: "Onboard", url: "/dashboard/operations/people/onboard", icon: ClipboardList },
        { title: "Team", url: "/dashboard/operations/people/team", icon: Users },
        { title: "Workload", url: "/dashboard/operations/people/workload", icon: Gauge },
        { title: "Performance", url: "/dashboard/operations/people/performance", icon: BarChart3 },
        { title: "Access", url: "/dashboard/operations/people/access", icon: KeyRound },
      ],
    },
    {
      label: "Projects",
      items: [
        { title: "Overview", url: "/dashboard/operations/projects/overview", icon: LayoutGrid },
        { title: "Projects", url: "/dashboard/operations/projects/projects", icon: Rocket },
        { title: "Updates", url: "/dashboard/operations/projects/updates", icon: RefreshCcw },
        { title: "Risks", url: "/dashboard/operations/projects/risks", icon: ShieldAlert },
        { title: "Decisions", url: "/dashboard/operations/projects/decisions", icon: GitMerge },
        { title: "Archive", url: "/dashboard/operations/projects/archive", icon: Archive },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Organization",
      url: "/dashboard/organization",
      icon: Building2,
    },
    {
      title: "Support",
      url: "/dashboard/support",
      icon: LifeBuoy,
      items: [
          {
              title: "Help Center",
              url: "/dashboard/support/help-center",
          },
          {
              title: "Contact Us",
              url: "/dashboard/support/contact-us",
          }
      ]
    },
    {
      title: "Feedback",
      url: "/dashboard/feedback",
      icon: Send,
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const { data: session, isPending } = useSession();
    const user = {
        name: session?.user?.name || "User",
        email: session?.user?.email || "user@example.com",
        avatar: session?.user?.image || "",
    }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Humio" isActive={pathname === '/dashboard/humio-ai'}>
                <Link href="/dashboard/humio-ai">
                  <Bot />
                  <span>Humio AI</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
          </SidebarMenu>
        </SidebarGroup>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isLoading={isPending} />
      </SidebarFooter>
    </Sidebar>
  )
}
