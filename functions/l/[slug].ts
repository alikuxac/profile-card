import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { eq, or, sql } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const urlParams = new URL(context.request.url);
        const slug = context.params.slug;

        const db = drizzle(context.env.profile_card_db, { schema });
        // Tìm link bằng slug hoặc fallback qua ID cũ (nếu có)
        const matchedLinks = await db.select().from(schema.links)
            .where(or(
                eq(schema.links.slug, slug),
                eq(schema.links.id, slug)
            ))
            .limit(1);

        if (matchedLinks.length === 0) {
            return new Response("Link not found", { status: 404 });
        }

        const link = matchedLinks[0];
        
        // Background track click
        context.waitUntil(
            db.update(schema.links)
              .set({ clicks: sql`${schema.links.clicks} + 1` })
              .where(eq(schema.links.id, link.id))
        );

        // Template trang chia sẻ trung gian chứa thẻ meta (Dynamic SEO)
        const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${link.title} - Alikuxac</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="${link.title} - Alikuxac">
    <meta name="description" content="View my link: ${link.title}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://alikuxac.xyz/l/${slug}">
    <meta property="og:title" content="${link.title} - Alikuxac">
    <meta property="og:description" content="Click to visit ${link.url}">
    <meta property="og:image" content="https://alikuxac.xyz/og-image.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://alikuxac.xyz/l/${slug}">
    <meta property="twitter:title" content="${link.title} - Alikuxac">
    <meta property="twitter:description" content="Click to visit ${link.url}">
    <meta property="twitter:image" content="https://alikuxac.xyz/og-image.png">

    <!-- Auto Redirect -->
    <meta http-equiv="refresh" content="0; url=${link.url}">
    
    <style>
        body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff; }
        .loader { border: 4px solid rgba(255,255,255,0.1); border-left-color: #fff; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin-bottom: 20px;}
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .container { text-align: center; }
        a { color: #aaa; text-decoration: none; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="loader"></div>
        <p>Redirecting to <strong>${link.title}</strong>...</p>
        <noscript>
            <a href="${link.url}">Click here if you are not redirected</a>
        </noscript>
    </div>
    <script>
        setTimeout(() => { window.location.replace("${link.url}"); }, 500);
    </script>
</body>
</html>
        `;

        return new Response(html, {
            headers: {
                'Content-Type': 'text/html;charset=UTF-8',
                'Cache-Control': 'no-store, no-cache, must-revalidate'
            }
        });
    } catch (e: any) {
        return new Response('Error: ' + e.message, { status: 500 });
    }
}
