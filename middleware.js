import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get cookies from the request
  const token = request.cookies.get('token') || null;

  // Define protected routes
  const protectedRoutes = ['/home', '/profile', '/settings']; // Add as needed

  // Avoid redirect loop if user is already on login page
  if (protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Prevent redirects on login page to avoid loop
  if (request.nextUrl.pathname === '/login' && token) {
    // Redirect to home or another page if already logged in
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
