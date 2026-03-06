import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { links } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const db = getDb(process.env as any);
    try {
        const data = await db.select().from(links).orderBy(links.order);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const db = getDb(process.env as any);
    try {
        const body = await request.json();

        const newLink = {
            id: uuidv4(),
            groupId: body.groupId || null,
            title: body.title,
            url: body.url,
            icon: body.icon || null,
            color: body.color || null,
            order: body.order || 0,
        };

        await db.insert(links).values(newLink);
        return NextResponse.json(newLink);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
