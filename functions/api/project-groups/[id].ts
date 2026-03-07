import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function onRequestDelete(context: any) {
    try {
        const id = context.params.id;
        const db = drizzle(context.env.profile_card_db, { schema });

        // When deleting a group, we set the groupId of projects to null
        await db.update(schema.projects)
            .set({ groupId: null })
            .where(eq(schema.projects.groupId, id));

        await db.delete(schema.projectGroups).where(eq(schema.projectGroups.id, id));

        return Response.json({ success: true });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
