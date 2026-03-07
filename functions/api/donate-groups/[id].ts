import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function onRequestDelete(context: any) {
    try {
        const id = context.params.id;
        const db = drizzle(context.env.profile_card_db, { schema });

        await db.update(schema.donates)
            .set({ groupId: null })
            .where(eq(schema.donates.groupId, id));

        await db.delete(schema.donateGroups).where(eq(schema.donateGroups.id, id));

        return Response.json({ success: true });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
