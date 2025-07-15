import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    const isPublicPath = path === "/login" || path === "/register";

    // Always redirect '/' to '/login'
    if (path === "/") {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    // If logged in and tries to access public routes, redirect to profile
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl));
    }

    // If NOT logged in and tries to access protected routes, redirect to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/register', '/profile'],
};
