import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

// Middleware to create protected routes and deal with authentication
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /home
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// Refers to all the protected routes inside the application
export const config = {
  matcher: ["/", "/home", "/create-activity"],
};
