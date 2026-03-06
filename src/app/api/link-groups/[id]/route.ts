import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { linkGroups, links } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const db = getDb(process.env as any);
    const { id } = params;

    try {
        // First, check if there are links in this group. 
        // We could either prevent deletion or set groupId to null.
        // For now, let's set groupId to null for those links.
        await db.update(links).set({ groupId: null }).where(eq(links.groupId, id));

        await db.delete(linkGroups).where(eq(linkGroups.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete link group' }, { status: 500 });
    }
}
