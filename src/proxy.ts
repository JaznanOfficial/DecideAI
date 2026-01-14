import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Check for both insecure (localhost) and secure (production) session cookies
  const sessionCookie = request.cookies.get("better-auth.session_token") || 
                       request.cookies.get("__Secure-better-auth.session_token");
  const isAuthenticated = !!sessionCookie;

  // Define protected routes (dashboard and its nested routes)
  const isProtectedRoute = path.startsWith("/dashboard");

  // Define auth routes (login, signup, etc.)
  const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email", // verify-email might be visited by authenticated users too? Usually fine to access if authenticated, but if it's strictly for verifying new account, maybe redirect? 
    // Plan said: "Authenticated users trying to access /login, /signup, /forgot-password, etc. -> Redirect to /dashboard"
    // Let's include verify-email for now as it's part of the auth flow, but often verification links are clicked from email in a fresh browser.
    // If they are already logged in, maybe they don't need to see verify email page unless it's a specific "please verify" prompt.
    // However, usually the link contains a token. If they are already logged in, better-auth might handle verification API call anyway.
    // Let's stick to the core auth/guest pages for redirect.
  ];
  
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  // Redirect unauthenticated users from protected routes to login
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect authenticated users from auth routes to dashboard home
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/humio-ai", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match dashboard and sub-paths
    "/dashboard/:path*",
    // Match auth routes
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    // You can add more matching patterns here if needed
  ],
};
