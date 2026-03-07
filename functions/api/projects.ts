import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { desc } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const db = drizzle(context.env.profile_card_db, { schema });
        const allProjects = await db.select().from(schema.projects).orderBy(desc(schema.projects.order));

        const adminSecret = context.env.ADMIN_SECRET;
        const reqSecret = context.request.headers.get('x-admin-secret');
        const isAuth = adminSecret && reqSecret === adminSecret;

        return new Response(JSON.stringify(allProjects), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': isAuth ? 'no-store, no-cache, must-revalidate' : 'public, s-maxage=60, stale-while-revalidate=86400'
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
            .from(schema.projects)
            .orderBy(desc(schema.projects.order))
            .limit(1);

        const nextOrder = lastItem.length > 0 ? lastItem[0].order + 1 : 0;

        const result = await db.insert(schema.projects).values({
            id: crypto.randomUUID(),
            title: body.title,
            description: body.description,
            url: body.url,
            githubUrl: body.githubUrl,
            coverImage: body.coverImage,
            groupId: body.groupId,
            order: nextOrder
        }).returning();
        return Response.json(result[0]);
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
