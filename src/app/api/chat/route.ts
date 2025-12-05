import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (!(messages && Array.isArray(messages))) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Check if AI Gateway is configured
    if (!process.env.AI_GATEWAY_API_KEY) {
      return Response.json(
        {
          error: "AI Gateway not configured",
          details: "Please add AI_GATEWAY_API_KEY to your .env.local file",
        },
        { status: 503 }
      );
    }

    // Convert UI messages to model messages and stream
    const result = streamText({
      model: "openai/gpt-4o-mini",
      messages: convertToModelMessages(messages),
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
