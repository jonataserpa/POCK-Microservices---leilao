import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  // Define paths that are always public
  const publicPaths = ["/login", "/favicon.ico"];
  const isPublicPath = publicPaths.includes(pathname);
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.match(/\.(css|js|png|jpg|jpeg|svg|ico|json)$/);

  // If trying to access a protected route without a token, redirect to login
  if (!token && !isPublicPath && !isStaticAsset && pathname !== "/") {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
