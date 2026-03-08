import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { sql } from 'drizzle-orm';

export async function onRequestPost(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const today = new Date().toISOString().split('T')[0];

        await db.insert(schema.pageViews)
            .values({ date: today, views: 1 })
            .onConflictDoUpdate({
                target: schema.pageViews.date,
                set: { views: sql`${schema.pageViews.views} + 1` }
            });

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });

        const [totalViews] = await db.select({ total: sql`sum(views)` }).from(schema.pageViews);

        return new Response(JSON.stringify({
            totalViews: Number(totalViews?.total) || 0
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
