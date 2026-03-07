'use client';

import { useState, useEffect } from 'react';
import DonateCard from '@/components/donate-card';
import { Heart } from 'lucide-react';

export default function DonatePage() {
    const [allDonates, setAllDonates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDonates = async () => {
            try {
                const res = await fetch('/api/donate');
                const data = await res.json() as any;
                if (!data.error) setAllDonates(data);
                else throw new Error();
            } catch (e) {
                setAllDonates([
                    { id: '1', type: 'bank', provider: 'Vietcombank', accountName: 'NGUYEN VAN A', accountNumber: '1234567890' },
                    { id: '2', type: 'wallet', provider: 'Momo', accountName: 'NGUYEN VAN A', accountNumber: '0987654321' },
                    { id: '3', type: 'crypto', provider: 'Binance (USDT - BEP20)', accountName: 'Wallet', accountNumber: '0x123...abc' },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchDonates();
    }, []);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <Heart size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                <h1>Support My Work</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>If you like my content, feel free to buy me a coffee!</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading...</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {allDonates.map((item) => (
                        <DonateCard key={item.id} donate={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
