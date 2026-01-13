"use client"

import * as React from "react"
import {
  Briefcase,
  ClipboardList,
  Command,
  LifeBuoy,
  Send,
  Users,
  Bot,
  LayoutDashboard,
  Building2,
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
  navMain: [
    {
      title: "Human Resource (HR)",
      url: "/dashboard/operations/human-resource",
      icon: Users,
      items: [
        { title: "Overview", url: "/dashboard/operations/human-resource/overview" },
        { title: "Onboarding", url: "/dashboard/operations/human-resource/onboarding" },
        { title: "Employees", url: "/dashboard/operations/human-resource/employees" },
        { title: "Roles & skills", url: "/dashboard/operations/human-resource/roles-skills" },
        { title: "Teams", url: "/dashboard/operations/human-resource/teams" },
        { title: "Availabilities & leaves", url: "/dashboard/operations/human-resource/availabilities-leaves" },
        { title: "Employee health", url: "/dashboard/operations/human-resource/employee-health" },
        { title: "Requests", url: "/dashboard/operations/human-resource/requests" },
        { title: "Policies", url: "/dashboard/operations/human-resource/policies" },
        { title: "Activities & decisions logs", url: "/dashboard/operations/human-resource/activities-decisions-logs" },
        { title: "Settings & guardrails", url: "/dashboard/operations/human-resource/settings-guardrails" },
      ],
    },
    {
      title: "Project Management (PM)",
      url: "/dashboard/operations/project-management",
      icon: Briefcase,
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
              <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === '/dashboard'}>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Project" isActive={pathname === '/dashboard/project'}>
                <Link href="/dashboard/project">
                  <ClipboardList />
                  <span>Projects</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} isLoading={isPending} />
      </SidebarFooter>
    </Sidebar>
  )
}
