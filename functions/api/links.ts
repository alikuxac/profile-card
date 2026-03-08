import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { asc, desc, eq } from 'drizzle-orm';

// GET highlights
export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allLinks = await db.select().from(schema.links).orderBy(asc(schema.links.order));

        const adminSecret = context.env.ADMIN_SECRET;
        const reqSecret = context.request.headers.get('x-admin-secret');
        const isAuth = adminSecret && reqSecret === adminSecret;

        return new Response(JSON.stringify(allLinks), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': isAuth ? 'no-store, no-cache, must-revalidate' : 'public, max-age=0, s-maxage=15'
            }
        });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

// POST create
export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const db = drizzle(context.env.profile_card_db, { schema });

        const lastItem = await db.select()
            .from(schema.links)
            .orderBy(desc(schema.links.order))
            .limit(1);

        const nextOrder = lastItem.length > 0 ? lastItem[0].order + 1 : 0;

        const result = await db.insert(schema.links).values({
            id: crypto.randomUUID(), // Dùng Cloudflare built-in crypto
            slug: body.slug || crypto.randomUUID().split('-')[0],
            title: body.title,
            url: body.url,
            icon: body.icon,
            groupId: body.groupId,
            order: nextOrder
        }).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
