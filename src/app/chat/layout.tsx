import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { ChatHistorySidebar } from '@/components/chat/chat-history-sidebar';

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with actual user ID from auth
  const userId = 'demo-user';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <aside className="w-64 border-r bg-background">
          <ChatHistorySidebar userId={userId} />
        </aside>
        <SidebarInset className="flex-1">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
