export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const { username, password } = body;

        // Simple hardcoded auth for demo/production (bạn có thể đổi sau)
        if (username === 'admin' && password === 'admin') {
            return Response.json({ success: true, token: 'fake-jwt-token' });
        }

        return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
