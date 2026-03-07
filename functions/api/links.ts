import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { asc, eq } from 'drizzle-orm';

// GET highlights
export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allLinks = await db.select().from(schema.links).orderBy(asc(schema.links.order));
        return Response.json(allLinks);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

// POST create
export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const db = drizzle(context.env.profile_card_db, { schema });
        const result = await db.insert(schema.links).values({
            id: crypto.randomUUID(), // Dùng Cloudflare built-in crypto
            title: body.title,
            url: body.url,
            icon: body.icon,
            groupId: body.groupId,
            order: body.order || 0
        }).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
