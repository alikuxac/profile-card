import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { linkGroups } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
    const db = getDb(process.env as any);
    try {
        const groups = await db.select().from(linkGroups).orderBy(linkGroups.order);
        return NextResponse.json(groups);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch link groups' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const db = getDb(process.env as any);
    try {
        const body = await request.json();
        const { name, order } = body;

        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        const newGroup = {
            id: uuidv4(),
            name,
            order: order || 0
        };

        await db.insert(linkGroups).values(newGroup);
        return NextResponse.json(newGroup);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create link group' }, { status: 500 });
    }
}
