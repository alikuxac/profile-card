import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../db/schema';
import { sql } from 'drizzle-orm';

export async function onRequestGet(context: any) {
    try {
        const adminSecret = context.env.ADMIN_SECRET;
        const reqSecret = context.request.headers.get('x-admin-secret');
        if (!adminSecret || reqSecret !== adminSecret) {
            return new Response('Unauthorized', { status: 401 });
        }

        const db = drizzle(context.env.profile_card_db, { schema });

        const [linksCount] = await db.select({ count: sql`count(*)` }).from(schema.links);
        const [projectsCount] = await db.select({ count: sql`count(*)` }).from(schema.projects);
        const [donatesCount] = await db.select({ count: sql`count(*)` }).from(schema.donates);

        const [linkClicks] = await db.select({ total: sql`sum(clicks)` }).from(schema.links);
        const [projectClicks] = await db.select({ total: sql`sum(clicks)` }).from(schema.projects);

        const totalClicks = (Number(linkClicks?.total) || 0) + (Number(projectClicks?.total) || 0);

        return new Response(JSON.stringify({
            totalLinks: Number(linksCount?.count) || 0,
            activeProjects: Number(projectsCount?.count) || 0,
            donateMethods: Number(donatesCount?.count) || 0,
            totalClicks: totalClicks
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e: any) {
        return Response.json({ error: e.message }, { status: 500 });
    }
}
