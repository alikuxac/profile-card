import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function onRequestDelete(context: any) {
    try {
        const id = context.params.id;
        const db = drizzle(context.env.profile_card_db, { schema });
        await db.delete(schema.links).where(eq(schema.links.id, id));
        return Response.json({ success: true });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}

export async function onRequestPatch(context: any) {
    try {
        const id = context.params.id;
        const body = await context.request.json();
        const db = drizzle(context.env.profile_card_db, { schema });
        const result = await db.update(schema.links).set({
            title: body.title,
            url: body.url,
            icon: body.icon,
            groupId: body.groupId,
            order: body.order
        }).where(eq(schema.links.id, id)).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
