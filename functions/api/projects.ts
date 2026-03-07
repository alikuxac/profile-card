import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { desc } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allProjects = await db.select().from(schema.projects).orderBy(desc(schema.projects.order));
        return Response.json(allProjects);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
