import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function onRequestPost(context: any) {
    try {
        const body = await context.request.json();
        const { items } = body; // items: { id: string, order: number }[]
        const db = drizzle(context.env.profile_card_db, { schema });

        const statements = items.map((item: any) =>
            db.update(schema.donates)
                .set({ order: item.order })
                .where(eq(schema.donates.id, item.id))
                .prepare()
        );

        if (statements.length > 0) {
            await context.env.profile_card_db.batch(statements);
        }

        return Response.json({ success: true });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
