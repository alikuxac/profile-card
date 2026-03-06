import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json<{ password: string }>();
        const env = process.env as any;
        const validPassword = env.ADMIN_PASSWORD;

        if (body.password === validPassword) {
            // Set simple cookie
            const response = NextResponse.json({ success: true });
            response.cookies.set('admin_token', 'authenticated', {
                path: '/',
                maxAge: 86400, // 1 day
                httpOnly: false, // Accessible by JS for middleware check in this simple setup
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });
            return response;
        }

        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
