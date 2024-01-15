import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/api/user/:path*", "/api/admin/:path*"],
};

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const isAllowed =
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin";

    if (isAllowed) {
      return NextResponse.rewrite(new URL("/dashboard/user"));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
