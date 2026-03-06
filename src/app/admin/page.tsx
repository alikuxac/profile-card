'use client';

import Card from '@/components/ui/card';
import { Link as LinkIcon, Heart, FolderCode, MousePointerClick } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Links', value: '0', icon: <LinkIcon size={24} />, color: '#6366f1' },
        { label: 'Donate Methods', value: '0', icon: <Heart size={24} />, color: '#ec4899' },
        { label: 'Active Projects', value: '0', icon: <FolderCode size={24} />, color: '#10b981' },
        { label: 'Link Clicks', value: 'Soon', icon: <MousePointerClick size={24} />, color: '#f59e0b' },
    ];

    return (
        <div style={{ width: '100%' }}>
            <h2 style={{
                marginBottom: '2.5rem',
                borderBottom: '2px solid var(--primary)',
                paddingBottom: '0.75rem',
                display: 'inline-block',
                fontSize: '1.75rem'
            }}>
                Dashboard Overview
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                width: '100%'
            }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} hover={true} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        padding: '2rem',
                        height: '100%'
                    }}>
                        <div style={{
                            padding: '1.25rem',
                            borderRadius: '20px',
                            background: 'var(--secondary)',
                            color: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 24px 32px -12px rgba(0, 0, 0, 0.1)'
                        }}>
                            {stat.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--muted-foreground)', fontWeight: '600', marginBottom: '0.25rem' }}>{stat.label}</p>
                            <p style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1 }}>{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <Card style={{
                marginTop: '4rem',
                padding: '3rem',
                border: '1px solid var(--glass-border)'
            }} hover={false} className="glass">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--primary)' }}>Quick Tips</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {[
                        { title: 'Emojis', text: 'Use emojis in project descriptions for better engagement.' },
                        { title: 'Branding', text: 'Set link colors to match platform branding (e.g., Blue for Facebook).' },
                        { title: 'Accuracy', text: 'Ensure crypto wallet addresses are correctly copied.' }
                    ].map((tip, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                                <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{tip.title}</span>
                            </div>
                            <p style={{ color: 'var(--muted-foreground)', fontWeight: '500', lineHeight: '1.6' }}>{tip.text}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
