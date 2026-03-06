'use client';

import Card from './ui/card';
import Button from './ui/button';
import { Copy, Check, Landmark, Wallet, Coins, Coffee, CreditCard, Globe } from 'lucide-react';
import { useState } from 'react';

export default function DonateCard({ donate }: { donate: any }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(donate.accountNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const icons = {
        bank: <Landmark size={24} />,
        wallet: <Wallet size={24} />,
        crypto: <Coins size={24} />,
        coffee: <Coffee size={24} />,
        paypal: <CreditCard size={24} />,
        international: <Globe size={24} />
    };

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                    padding: '0.75rem',
                    borderRadius: '12px',
                    background: 'var(--secondary)',
                    color: 'var(--primary)'
                }}>
                    {icons[donate.type as keyof typeof icons] || <Landmark size={24} />}
                </div>
                <div>
                    <h3 style={{ fontSize: '1.125rem' }}>{donate.provider}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{donate.accountName}</p>
                </div>
            </div>

            <div style={{
                background: 'var(--background)',
                padding: '1rem',
                borderRadius: 'var(--radius)',
                border: '1px dashed var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '0.5rem'
            }}>
                <code style={{ fontSize: '1rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    {donate.accountNumber}
                </code>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    style={{ padding: '4px 8px' }}
                >
                    {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
                </Button>
            </div>
        </Card>
    );
}
