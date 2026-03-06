'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Plus, Trash2, Edit2, Save, X, Landmark, Wallet, Coins, Coffee, CreditCard, Globe } from 'lucide-react';

export default function DonateManager() {
    const [donates, setDonates] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newDonate, setNewDonate] = useState({ type: 'bank', provider: '', accountName: '', accountNumber: '' });

    useEffect(() => {
        fetchDonates();
    }, []);

    const fetchDonates = async () => {
        const res = await fetch('/api/donate');
        const data: any = await res.json();
        if (data && !data.error) setDonates(data);
    };

    const handleAdd = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const res = await fetch('/api/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDonate)
        });
        if (res.ok) {
            setIsAdding(false);
            setNewDonate({ type: 'bank', provider: '', accountName: '', accountNumber: '' });
            fetchDonates();
        }
    };

    const icons = {
        bank: <Landmark size={20} />,
        wallet: <Wallet size={20} />,
        crypto: <Coins size={20} />,
        coffee: <Coffee size={20} />,
        paypal: <CreditCard size={20} />,
        international: <Globe size={20} />
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Manage Donate Methods</h2>
                <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'primary'}>
                    {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Method</>}
                </Button>
            </div>

            {isAdding && (
                <Card hover={false} style={{ marginBottom: '2rem' }}>
                    <h4>Add New Donate Method</h4>
                    <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        <select
                            value={newDonate.type}
                            onChange={(e) => setNewDonate({ ...newDonate, type: e.target.value })}
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                        >
                            <option value="bank">Bank</option>
                            <option value="wallet">E-Wallet (Momo, etc.)</option>
                            <option value="crypto">Blockchain / Crypto</option>
                            <option value="paypal">PayPal</option>
                            <option value="coffee">Buy Me a Coffee / Ko-fi</option>
                            <option value="international">Global / Other</option>
                        </select>
                        <input
                            placeholder="Provider (e.g. Vietcombank)"
                            value={newDonate.provider}
                            onChange={(e) => setNewDonate({ ...newDonate, provider: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Name"
                            value={newDonate.accountName}
                            onChange={(e) => setNewDonate({ ...newDonate, accountName: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Number / Wallet Address"
                            value={newDonate.accountNumber}
                            onChange={(e) => setNewDonate({ ...newDonate, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <Button type="submit" style={{ gridColumn: '1 / -1' }}>Save Method</Button>
                    </form>
                </Card>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {donates.map((item) => (
                    <Card key={item.id} hover={false} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ color: 'var(--primary)' }}>{icons[item.type as keyof typeof icons]}</div>
                            <div>
                                <p style={{ fontWeight: 'bold' }}>{item.provider} - {item.accountName}</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{item.accountNumber}</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
