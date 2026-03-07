import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { desc } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allDonates = await db.select().from(schema.donates).orderBy(desc(schema.donates.order));

        const adminSecret = context.env.ADMIN_SECRET;
        const reqSecret = context.request.headers.get('x-admin-secret');
        const isAuth = adminSecret && reqSecret === adminSecret;

        return new Response(JSON.stringify(allDonates), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': isAuth ? 'no-store, no-cache, must-revalidate' : 'public, max-age=0, s-maxage=15'
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

        const lastItem = await db.select()
            .from(schema.donates)
            .orderBy(desc(schema.donates.order))
            .limit(1);

        const nextOrder = lastItem.length > 0 ? lastItem[0].order + 1 : 0;

        const result = await db.insert(schema.donates).values({
            id: crypto.randomUUID(),
            type: body.type,
            provider: body.provider,
            accountName: body.accountName,
            accountNumber: body.accountNumber,
            groupId: body.groupId,
            order: nextOrder
        }).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
