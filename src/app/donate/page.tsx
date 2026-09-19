'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import { Landmark, Wallet, Coins, Coffee, CreditCard, Globe, Copy, Check, QrCode, X } from 'lucide-react';
import Image from 'next/image';

const VIETNAM_BANK_MAPPING: Record<string, string> = {
    'vietcombank': 'vcb', 'vcb': 'vcb',
    'techcombank': 'tcb', 'tcb': 'tcb',
    'mbbank': 'mb', 'mb': 'mb', 'mb bank': 'mb',
    'vietinbank': 'vtb', 'vtb': 'vtb',
    'bidv': 'bidv',
    'agribank': 'vrb',
    'vpbank': 'vpb', 'vpb': 'vpb',
    'tpbank': 'tpb', 'tpb': 'tpb',
    'acb': 'acb',
    'sacombank': 'stb', 'stb': 'stb',
    'hdbank': 'hdb', 'hdb': 'hdb',
    'shb': 'shb',
    'vibb': 'vib', 'vib': 'vib',
    'msb': 'msb',
    'ocb': 'ocb',
    'seabank': 'seab', 'seab': 'seab',
    'eximbank': 'eib', 'eib': 'eib',
    'cbbank': 'cbb',
    'scb': 'scb',
    'lienvietpostbank': 'lpb', 'lpbank': 'lpb', 'lpb': 'lpb',
    'bacabank': 'bab', 'bab': 'bab',
    'pvcombank': 'pvb', 'pvb': 'pvb',
    'ncb': 'ncb',
    'shinhan': 'shinhan', 'shinhan bank': 'shinhan',
    'woori': 'woori', 'woori bank': 'woori',
    'cake': 'cake', 'cake by vpbank': 'cake',
    'ubank': 'ubank',
    'timo': 'timo'
};

export default function DonatePage() {
    const [donates, setDonates] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [activeQrModal, setActiveQrModal] = useState<any | null>(null);

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

    const generateQrUrl = (item: any) => {
        const { type, provider, accountNumber, accountName } = item;
        const cleanProvider = (provider || '').trim().toLowerCase();
        const cleanNumber = (accountNumber || '').trim();

        // 1. VietQR ngân hàng Việt Nam
        if (type === 'bank') {
            const bankCode = VIETNAM_BANK_MAPPING[cleanProvider] || cleanProvider;
            const encodedName = encodeURIComponent(accountName || '');
            return `https://img.vietqr.io/image/${bankCode}-${cleanNumber}-compact2.png?accountName=${encodedName}`;
        }

        // 2. Ví MoMo
        if (type === 'wallet' && cleanProvider.includes('momo')) {
            const encodedName = encodeURIComponent(accountName || '');
            return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=2|99|${cleanNumber}|${encodedName}||0|0|0|`;
        }

        // 3. PayPal link hoặc email
        if (type === 'paypal') {
            const url = cleanNumber.startsWith('http') ? cleanNumber : `https://paypal.me/${cleanNumber}`;
            return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
        }

        // 4. Coffee platform (Buy Me a Coffee, Ko-fi)
        if (type === 'coffee') {
            const url = cleanNumber.startsWith('http') ? cleanNumber : `https://buymeacoffee.com/${cleanNumber}`;
            return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
        }

        // 5. Crypto / Blockchain / General URL hoặc Address
        return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(cleanNumber)}`;
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

    const renderCard = (item: any) => {
        const qrUrl = generateQrUrl(item);

        return (
            <Card key={item.id} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ color: 'var(--primary)', padding: '12px', background: 'var(--secondary)', borderRadius: '12px' }}>
                                {icons[item.type as keyof typeof icons] || <Landmark size={24} />}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{item.provider}</h3>
                                <p style={{ margin: 0, color: 'var(--muted-foreground)', fontSize: '0.9rem' }}>{item.accountName}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setActiveQrModal({ ...item, qrUrl })}
                            title="Show QR Code"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                background: 'var(--secondary)',
                                color: 'var(--primary)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px',
                                padding: '6px 12px',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}
                        >
                            <QrCode size={16} /> QR
                        </button>
                    </div>

                    <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border)' }}>
                        <span style={{ fontWeight: '600', fontSize: '0.95rem', letterSpacing: '0.5px', wordBreak: 'break-all' }}>{item.accountNumber}</span>
                        <button onClick={() => copyToClipboard(item.accountNumber, item.id)} style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
                            {copiedId === item.id ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>
            </Card>
        );
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
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
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                    {groupDonates.map(renderCard)}
                                </div>
                            </section>
                        );
                    })}

                    {others.length > 0 && (
                        <section>
                            {groups.length > 0 && <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Others</h3>}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                                {others.map(renderCard)}
                            </div>
                        </section>
                    )}
                </div>
            )}

            {/* QR CODE MODAL */}
            {activeQrModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <Card style={{
                        maxWidth: '400px',
                        width: '100%',
                        padding: '2rem',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        background: 'var(--background)',
                        border: '2px solid var(--primary)'
                    }}>
                        <button
                            onClick={() => setActiveQrModal(null)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--muted-foreground)'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <h3 style={{ marginBottom: '0.25rem' }}>{activeQrModal.provider}</h3>
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{activeQrModal.accountName}</p>

                        <div style={{
                            background: '#ffffff',
                            padding: '12px',
                            borderRadius: '16px',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                            marginBottom: '1.5rem'
                        }}>
                            <img
                                src={activeQrModal.qrUrl}
                                alt={`QR Code ${activeQrModal.provider}`}
                                width={240}
                                height={240}
                                style={{ borderRadius: '8px', objectFit: 'contain', display: 'block' }}
                            />
                        </div>

                        <div style={{
                            background: 'var(--secondary)',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            width: '100%',
                            justifyContent: 'space-between',
                            border: '1px solid var(--border)'
                        }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', wordBreak: 'break-all' }}>{activeQrModal.accountNumber}</span>
                            <button
                                onClick={() => copyToClipboard(activeQrModal.accountNumber, `modal-${activeQrModal.id}`)}
                                style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', flexShrink: 0 }}
                            >
                                {copiedId === `modal-${activeQrModal.id}` ? <Check size={18} /> : <Copy size={18} />}
                            </button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
