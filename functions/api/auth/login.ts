export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const { password } = body;
        const adminSecret = context.env.ADMIN_SECRET;

        if (adminSecret && password === adminSecret) {
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `admin_token=${password}; Path=/; SameSite=Lax; Max-Age=31536000`
                }
            });
        }

        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
