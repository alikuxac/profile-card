'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import { Landmark, Wallet, Coins, Coffee, CreditCard, Globe, Copy, Check } from 'lucide-react';

export default function DonatePage() {
    const [donates, setDonates] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [donatesRes, groupsRes] = await Promise.all([
                    fetch('/api/donate'),
                    fetch('/api/donate-groups')
                ]);
                const donatesData = await donatesRes.json() as any;
                const groupsData = await groupsRes.json() as any;

                if (!donatesData.error) setDonates(donatesData);
                if (!groupsData.error) setGroups(groupsData);
            } catch (e) {
                console.error("Failed to fetch donate methods", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const icons = {
        bank: <Landmark size={24} />,
        wallet: <Wallet size={24} />,
        crypto: <Coins size={24} />,
        coffee: <Coffee size={24} />,
        paypal: <CreditCard size={24} />,
        international: <Globe size={24} />
    };

    const others = donates.filter(d => !d.groupId);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Support Me</h1>
                <p style={{ color: 'var(--muted-foreground)', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Your support is greatly appreciated!</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading donate methods...</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {groups.map(group => {
                        const groupDonates = donates.filter(d => d.groupId === group.id);
                        if (groupDonates.length === 0) return null;

                        return (
                            <section key={group.id}>
                                <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{group.name}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {groupDonates.map((item) => (
                                        <Card key={item.id} style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                                <div style={{ color: 'var(--primary)', padding: '12px', background: 'var(--secondary)', borderRadius: '12px' }}>
                                                    {icons[item.type as keyof typeof icons] || <Landmark size={24} />}
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.provider}</h3>
                                                    <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{item.accountName}</p>
                                                </div>
                                            </div>
                                            <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                                                <span style={{ fontWeight: '600', fontSize: '0.95rem', letterSpacing: '0.5px' }}>{item.accountNumber}</span>
                                                <button onClick={() => copyToClipboard(item.accountNumber, item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}>
                                                    {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {others.length > 0 && (
                        <section>
                            {groups.length > 0 && <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Others</h3>}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                {others.map((item) => (
                                    <Card key={item.id} style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ color: 'var(--primary)', padding: '12px', background: 'var(--secondary)', borderRadius: '12px' }}>
                                                {icons[item.type as keyof typeof icons] || <Landmark size={24} />}
                                            </div>
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.provider}</h3>
                                                <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{item.accountName}</p>
                                            </div>
                                        </div>
                                        <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                                            <span style={{ fontWeight: '600', fontSize: '0.95rem', letterSpacing: '0.5px' }}>{item.accountNumber}</span>
                                            <button onClick={() => copyToClipboard(item.accountNumber, item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px' }}>
                                                {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
