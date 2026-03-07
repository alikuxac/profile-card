import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { desc } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allDonates = await db.select().from(schema.donates).orderBy(desc(schema.donates.order));
        return Response.json(allDonates);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
