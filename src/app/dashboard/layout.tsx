import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-[calc(100vh-1rem)]">
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border border-border/60 border-b bg-background/80 px-4 backdrop-blur-md md:rounded-t-xl">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DashboardBreadcrumb />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Notifications</span>
            </Button>
             <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 border border-t-0 border-border/60 p-4 pt-4 md:rounded-b-xl">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
