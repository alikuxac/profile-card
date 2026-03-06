import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Redirect index.html to /
    if (pathname === '/index.html') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Protect /admin routes
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;

        // Simple check: for now, we just check if token exists
        // In production, this should be a verified JWT or matching an ENV secret
        const expectedSecret = process.env.ADMIN_SECRET;
        if (!token || token !== expectedSecret) {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/index.html', '/admin/:path*'],
};
