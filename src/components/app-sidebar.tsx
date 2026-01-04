"use client"

import {
  BadgeDollarSign,
  BrainCircuit,
  Briefcase,
  CalendarClock,
  Command,
  LifeBuoy,
  LogOut,
  Send,
  Settings2,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Talent Acquisition",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Create Job",
          url: "#",
        },
        {
          title: "Job Page",
          url: "#",
        },
        {
          title: "Applications",
          url: "#",
        },
        {
          title: "AI Shortlisting",
          url: "#",
        },
        {
          title: "Interview Confirmation",
          url: "#",
        },
      ],
    },
    {
      title: "Candidate Onboarding",
      url: "#",
      icon: UserPlus,
      items: [
        {
          title: "Offer Letter",
          url: "#",
        },
        {
          title: "Document Collection",
          url: "#",
        },
        {
          title: "Joining Confirmation",
          url: "#",
        },
        {
          title: "Employee Profile Creation",
          url: "#",
        },
        {
          title: "Account Activation",
          url: "#",
        },
      ],
    },
    {
      title: "Employee Management",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Employee Directory",
          url: "#",
        },
        {
          title: "Employee Profile",
          url: "#",
        },
        {
          title: "Attendance",
          url: "#",
        },
        {
          title: "Leave Management",
          url: "#",
        },
        {
          title: "Documents",
          url: "#",
        },
      ],
    },
    {
      title: "Attendance & Leave",
      url: "#",
      icon: CalendarClock,
      items: [
        {
          title: "Attendance Logs",
          url: "#",
        },
        {
          title: "Leave Requests",
          url: "#",
        },
        {
          title: "Leave Approvals",
          url: "#",
        },
        {
          title: "Leave Policies",
          url: "#",
        },
      ],
    },
    {
      title: "Performance & Growth",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "KPI Setup",
          url: "#",
        },
        {
          title: "Performance Review",
          url: "#",
        },
        {
          title: "AI Performance Insights",
          url: "#",
        },
        {
          title: "Feedback",
          url: "#",
        },
        {
          title: "Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Payroll & Benefits",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Salary Structure",
          url: "#",
        },
        {
          title: "Payroll Processing",
          url: "#",
        },
        {
          title: "Payslips",
          url: "#",
        },
        {
          title: "Bonuses & Incentives",
          url: "#",
        },
        {
          title: "Benefits",
          url: "#",
        },
      ],
    },
    {
      title: "Compliance & Policies",
      url: "#",
      icon: ShieldCheck,
      items: [
        {
          title: "HR Policies",
          url: "#",
        },
        {
          title: "Audit Logs",
          url: "#",
        },
        {
          title: "Approvals",
          url: "#",
        },
        {
          title: "Incidents & Disputes",
          url: "#",
        },
      ],
    },
    {
      title: "AI HR (Brain)",
      url: "#",
      icon: BrainCircuit,
      items: [
        {
          title: "AI HR Assistant",
          url: "#",
        },
        {
          title: "Decision History",
          url: "#",
        },
        {
          title: "Rules & Automation",
          url: "#",
        },
        {
          title: "Model Training",
          url: "#",
        },
        {
          title: "Escalations",
          url: "#",
        },
      ],
    },
    {
      title: "Offboarding",
      url: "#",
      icon: LogOut,
      items: [
        {
          title: "Resignation",
          url: "#",
        },
        {
          title: "Notice Period",
          url: "#",
        },
        {
          title: "Clearance",
          url: "#",
        },
        {
          title: "Exit Interview",
          url: "#",
        },
        {
          title: "Employee Deactivation",
          url: "#",
        },
      ],
    },
    {
      title: "Organization Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Company Profile",
          url: "#",
        },
        {
          title: "Roles & Permissions",
          url: "#",
        },
        {
          title: "Email Templates",
          url: "#",
        },
        {
          title: "Integrations",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
