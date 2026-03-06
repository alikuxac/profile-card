import { NextResponse } from 'next/server';
import { getDb } from '@/db';
import { donates } from '@/db/schema';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'edge';

export async function GET() {
    try {
        const db = getDb(process.env as any);
        const data = await db.select().from(donates);
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const db = getDb(process.env as any);

        const newDonate = {
            id: uuidv4(),
            type: body.type,
            provider: body.provider,
            accountName: body.accountName,
            accountNumber: body.accountNumber,
            order: body.order || 0,
        };

        await db.insert(donates).values(newDonate);
        return NextResponse.json(newDonate);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
