import { auth } from "@/db/auth.config"; // Adjust import path if needed
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export const GET = handlers.GET;

export const POST = async (req: Request) => {
  try {
    const response = await handlers.POST(req);
    // If response is a server error, ensure we return a user-friendly message
    if (response.status >= 500) {
      console.error("Better-Auth returned 500", await response.clone().text());
      return NextResponse.json(
        { message: "Authentication service unavailable. Please try again later." },
        { status: 500 }
      );
    }
    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
