"use client"

import * as React from "react"
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
  Bot,
  LayoutDashboard,
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
      title: "Talent Acquisition",
      url: "#",
      icon: Briefcase,
      items: [
        {
          title: "Create Job",
          url: "/dashboard/talent-acquisition/create-job",
        },
        {
          title: "Job Page",
          url: "/dashboard/talent-acquisition/job-page",
        },
        {
          title: "Applications",
          url: "/dashboard/talent-acquisition/applications",
        },
        {
          title: "AI Shortlisting",
          url: "/dashboard/talent-acquisition/ai-shortlisting",
        },
        {
          title: "Interview Confirmation",
          url: "/dashboard/talent-acquisition/interview-confirmation",
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
          url: "/dashboard/candidate-onboarding/offer-letter",
        },
        {
          title: "Document Collection",
          url: "/dashboard/candidate-onboarding/document-collection",
        },
        {
          title: "Joining Confirmation",
          url: "/dashboard/candidate-onboarding/joining-confirmation",
        },
        {
          title: "Employee Profile Creation",
          url: "/dashboard/candidate-onboarding/employee-profile-creation",
        },
        {
          title: "Account Activation",
          url: "/dashboard/candidate-onboarding/account-activation",
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
          url: "/dashboard/employee-management/employee-directory",
        },
        {
          title: "Employee Profile",
          url: "/dashboard/employee-management/employee-profile",
        },
        {
          title: "Attendance",
          url: "/dashboard/employee-management/attendance",
        },
        {
          title: "Leave Management",
          url: "/dashboard/employee-management/leave-management",
        },
        {
          title: "Documents",
          url: "/dashboard/employee-management/documents",
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
          url: "/dashboard/attendance-leave/attendance-logs",
        },
        {
          title: "Leave Requests",
          url: "/dashboard/attendance-leave/leave-requests",
        },
        {
          title: "Leave Approvals",
          url: "/dashboard/attendance-leave/leave-approvals",
        },
        {
          title: "Leave Policies",
          url: "/dashboard/attendance-leave/leave-policies",
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
          url: "/dashboard/performance-growth/kpi-setup",
        },
        {
          title: "Performance Review",
          url: "/dashboard/performance-growth/performance-review",
        },
        {
          title: "AI Performance Insights",
          url: "/dashboard/performance-growth/ai-performance-insights",
        },
        {
          title: "Feedback",
          url: "/dashboard/performance-growth/feedback",
        },
        {
          title: "Reports",
          url: "/dashboard/performance-growth/reports",
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
          url: "/dashboard/payroll-benefits/salary-structure",
        },
        {
          title: "Payroll Processing",
          url: "/dashboard/payroll-benefits/payroll-processing",
        },
        {
          title: "Payslips",
          url: "/dashboard/payroll-benefits/payslips",
        },
        {
          title: "Bonuses & Incentives",
          url: "/dashboard/payroll-benefits/bonuses-incentives",
        },
        {
          title: "Benefits",
          url: "/dashboard/payroll-benefits/benefits",
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
          url: "/dashboard/compliance-policies/hr-policies",
        },
        {
          title: "Audit Logs",
          url: "/dashboard/compliance-policies/audit-logs",
        },
        {
          title: "Approvals",
          url: "/dashboard/compliance-policies/approvals",
        },
        {
          title: "Incidents & Disputes",
          url: "/dashboard/compliance-policies/incidents-disputes",
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
          url: "/dashboard/ai-hr-brain/ai-hr-assistant",
        },
        {
          title: "Decision History",
          url: "/dashboard/ai-hr-brain/decision-history",
        },
        {
          title: "Rules & Automation",
          url: "/dashboard/ai-hr-brain/rules-automation",
        },
        {
          title: "Model Training",
          url: "/dashboard/ai-hr-brain/model-training",
        },
        {
          title: "Escalations",
          url: "/dashboard/ai-hr-brain/escalations",
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
          url: "/dashboard/offboarding/resignation",
        },
        {
          title: "Notice Period",
          url: "/dashboard/offboarding/notice-period",
        },
        {
          title: "Clearance",
          url: "/dashboard/offboarding/clearance",
        },
        {
          title: "Exit Interview",
          url: "/dashboard/offboarding/exit-interview",
        },
        {
          title: "Employee Deactivation",
          url: "/dashboard/offboarding/employee-deactivation",
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
          url: "/dashboard/organization-settings/company-profile",
        },
        {
          title: "Roles & Permissions",
          url: "/dashboard/organization-settings/roles-permissions",
        },
        {
          title: "Email Templates",
          url: "/dashboard/organization-settings/email-templates",
        },
        {
          title: "Integrations",
          url: "/dashboard/organization-settings/integrations",
        },
        {
          title: "Notifications",
          url: "/dashboard/organization-settings/notifications",
        },
      ],
    },
  ],
  navSecondary: [
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
              <SidebarMenuButton asChild tooltip="Humio" isActive={pathname === '/dashboard/master-agent'}>
                <Link href="/dashboard/master-agent">
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
