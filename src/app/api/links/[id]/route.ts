import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { links } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const db = getDb(process.env as any);
    const { id } = params;

    try {
        await db.delete(links).where(eq(links.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const db = getDb(process.env as any);
    const { id } = params;

    try {
        const body = await request.json();
        await db.update(links).set(body).where(eq(links.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
    }
}
