import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // if session is signed in and the current path is / redirect the session to /account
  if (session && req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  // if session is not signed in and the current path is not / redirect the session to /
  if (!session && req.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/home'],
}