import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth/jwt";

const SESSION_COOKIE = process.env.SESSION_COOKIE;

if (!SESSION_COOKIE) {
  throw new Error("SESSION_COOKIE is not defined in the environment variables.");
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get(SESSION_COOKIE!)?.value;

  const session = token ? verifyToken(token) : null;

  const isLoginPage = pathname === "/admin/login";
  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (isLoginPage) {
    if (session) {
      return NextResponse.redirect(
        new URL("/admin/dashboard", request.url),
      );
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};