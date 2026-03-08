import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { eq, or, sql } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const slug = context.params.slug;
        const db = drizzle(context.env.profile_card_db, { schema });

        const matchedProps = await db.select().from(schema.projects)
            .where(or(
                eq(schema.projects.slug, slug),
                eq(schema.projects.id, slug)
            ))
            .limit(1);

        if (matchedProps.length === 0) {
            return new Response("Project not found", { status: 404 });
        }

        const project = matchedProps[0];
        const redirectUrl = project.url || project.githubUrl || 'https://alikuxac.xyz';
        
        // Background track click
        context.waitUntil(
            db.update(schema.projects)
              .set({ clicks: sql`${schema.projects.clicks} + 1` })
              .where(eq(schema.projects.id, project.id))
        );

        const html = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title} - Alikuxac Project</title>
    
    <!-- Primary Meta Tags -->
    <meta name="title" content="${project.title} - Alikuxac Project">
    <meta name="description" content="${project.description || 'View details of my project.'}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://alikuxac.xyz/p/${slug}">
    <meta property="og:title" content="${project.title} - Alikuxac Project">
    <meta property="og:description" content="${project.description || 'View details of my project.'}">
    <meta property="og:image" content="${project.coverImage || 'https://alikuxac.xyz/og-image.png'}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://alikuxac.xyz/p/${slug}">
    <meta property="twitter:title" content="${project.title} - Alikuxac Project">
    <meta property="twitter:description" content="${project.description || 'View details of my project.'}">
    <meta property="twitter:image" content="${project.coverImage || 'https://alikuxac.xyz/og-image.png'}">

    <!-- Auto Redirect -->
    <meta http-equiv="refresh" content="0; url=${redirectUrl}">
    
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
        <p>Redirecting to <strong>${project.title}</strong>...</p>
        <noscript>
            <a href="${redirectUrl}">Click here if you are not redirected</a>
        </noscript>
    </div>
    <script>
        setTimeout(() => { window.location.replace("${redirectUrl}"); }, 500);
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
