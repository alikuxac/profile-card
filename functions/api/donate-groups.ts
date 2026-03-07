import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { asc, desc } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allGroups = await db.select().from(schema.donateGroups).orderBy(asc(schema.donateGroups.order));

        return new Response(JSON.stringify(allGroups), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600'
            }
        });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const db = drizzle(context.env.profile_card_db, { schema });

        const lastGroup = await db.select()
            .from(schema.donateGroups)
            .orderBy(desc(schema.donateGroups.order))
            .limit(1);

        const nextOrder = lastGroup.length > 0 ? lastGroup[0].order + 1 : 0;

        const result = await db.insert(schema.donateGroups).values({
            id: crypto.randomUUID(),
            name: body.name,
            order: nextOrder
        }).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
