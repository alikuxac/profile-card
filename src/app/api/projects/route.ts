import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { projects } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function GET() {
    try {
        const db = getDb(process.env as any);
        const data = await db.select().from(projects);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const db = getDb(process.env as any);

        const newProject = {
            id: uuidv4(),
            title: body.title,
            description: body.description || null,
            url: body.url || null,
            githubUrl: body.githubUrl || null,
            coverImage: body.coverImage || null,
            order: body.order || 0,
        };

        await db.insert(projects).values(newProject);
        return NextResponse.json(newProject);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
