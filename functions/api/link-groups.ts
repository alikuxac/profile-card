import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { asc } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allGroups = await db.select().from(schema.linkGroups).orderBy(asc(schema.linkGroups.order));
        return Response.json(allGroups);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const db = drizzle(context.env.profile_card_db, { schema });
        const result = await db.insert(schema.linkGroups).values({
            id: crypto.randomUUID(),
            name: body.name,
            order: body.order || 0
        }).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
