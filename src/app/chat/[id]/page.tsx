import { MultiModelChat } from '@/components/chat/multi-model-chat';

interface ChatPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;

  return (
    <div className="h-screen">
      <MultiModelChat conversationId={id} />
    </div>
  );
}
