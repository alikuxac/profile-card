import { getDb } from '@/db';
import { donates } from '@/db/schema';
import DonateCard from '@/components/donate-card';
import { desc } from 'drizzle-orm';
import { Heart } from 'lucide-react';

export const runtime = 'edge';

export default async function DonatePage() {
    let allDonates = [];
    try {
        const db = getDb(process.env as any);
        allDonates = await db.select().from(donates).orderBy(desc(donates.order));
    } catch (e) {
        allDonates = [
            { id: '1', type: 'bank', provider: 'Vietcombank', accountName: 'NGUYEN VAN A', accountNumber: '1234567890' },
            { id: '2', type: 'wallet', provider: 'Momo', accountName: 'NGUYEN VAN A', accountNumber: '0987654321' },
            { id: '3', type: 'crypto', provider: 'Binance (USDT - BEP20)', accountName: 'Wallet', accountNumber: '0x123...abc' },
        ];
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Heart size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h1>Support My Work</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>If you like my content, feel free to buy me a coffee!</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {allDonates.map((item) => (
                    <DonateCard key={item.id} donate={item} />
                ))}
            </div>
        </div>
    );
}
