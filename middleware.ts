import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUserSession = request.cookies.get("PLAY_SESSION")?.value;

  if (
    currentUserSession &&
    !request.nextUrl.pathname.startsWith("/organizations")
  ) {
    return Response.redirect(new URL("/organizations", request.url));
  }

  if (!currentUserSession && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
