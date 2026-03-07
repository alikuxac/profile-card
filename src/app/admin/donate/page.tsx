'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Plus, Trash2, Edit2, Save, X, Landmark, Wallet, Coins, Coffee, CreditCard, Globe, GripVertical, Layers } from 'lucide-react';
import { Reorder } from 'framer-motion';

export default function DonateManager() {
    const [donates, setDonates] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [newDonate, setNewDonate] = useState({ type: 'bank', provider: '', accountName: '', accountNumber: '', groupId: '' });
    const [newGroup, setNewGroup] = useState({ name: '' });

    const donateTimerRef = useRef<NodeJS.Timeout | null>(null);
    const groupTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const secret = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || '';
        const headers = { 'x-admin-secret': secret };

        const [donatesRes, groupsRes] = await Promise.all([
            fetch('/api/donate', { headers }),
            fetch('/api/donate-groups', { headers })
        ]);
        const donatesData = await donatesRes.json() as any;
        const groupsData = await groupsRes.json() as any;

        if (!donatesData.error) {
            setDonates(donatesData.sort((a: any, b: any) => a.order - b.order));
        }
        if (!groupsData.error) {
            setGroups(groupsData.sort((a: any, b: any) => a.order - b.order));
        }
    };

    const saveDonateOrder = (newOrder: any[]) => {
        if (donateTimerRef.current) clearTimeout(donateTimerRef.current);
        donateTimerRef.current = setTimeout(async () => {
            const items = newOrder.map((d, idx) => ({ id: d.id, order: idx }));
            await fetch('/api/donate/reorder', {
                method: 'POST',
                body: JSON.stringify({ items }),
                headers: { 'Content-Type': 'application/json' }
            });
        }, 1000);
    };

    const saveGroupOrder = (newOrder: any[]) => {
        if (groupTimerRef.current) clearTimeout(groupTimerRef.current);
        groupTimerRef.current = setTimeout(async () => {
            const items = newOrder.map((g, idx) => ({ id: g.id, order: idx }));
            await fetch('/api/donate-groups/reorder', {
                method: 'POST',
                body: JSON.stringify({ items }),
                headers: { 'Content-Type': 'application/json' }
            });
        }, 1000);
    };

    const handleAddDonate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newDonate)
        });
        if (res.ok) {
            setIsAdding(false);
            setNewDonate({ type: 'bank', provider: '', accountName: '', accountNumber: '', groupId: '' });
            fetchData();
        }
    };

    const handleAddGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/donate-groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGroup)
        });
        if (res.ok) {
            setIsAddingGroup(false);
            setNewGroup({ name: '' });
            fetchData();
        }
    };

    const handleDeleteDonate = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/donate/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handleDeleteGroup = async (id: string) => {
        if (!confirm('Deleting this group will move all its methods to "No Group". Proceed?')) return;
        await fetch(`/api/donate-groups/${id}`, { method: 'DELETE' });
        fetchData();
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* GROUPS */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Layers size={24} /> Donate Groups</h2>
                    <Button onClick={() => setIsAddingGroup(!isAddingGroup)} variant={isAddingGroup ? 'outline' : 'primary'}>
                        {isAddingGroup ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Group</>}
                    </Button>
                </div>

                {isAddingGroup && (
                    <Card hover={false} style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Create New Group</h4>
                        <form onSubmit={handleAddGroup} style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                placeholder="Group Name (e.g. Bank Accounts, Wallets)"
                                value={newGroup.name}
                                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                                required
                                className="glass"
                                style={{ flex: 1, padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />
                            <Button type="submit">Create</Button>
                        </form>
                    </Card>
                )}

                <Reorder.Group axis="y" values={groups} onReorder={(newOrder) => {
                    setGroups(newOrder);
                    saveGroupOrder(newOrder);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {groups.map(group => (
                        <Reorder.Item key={group.id} value={group}>
                            <Card hover={false} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <GripVertical size={20} style={{ color: 'var(--muted-foreground)', cursor: 'grab' }} />
                                    <span style={{ fontWeight: 'bold' }}>{group.name}</span>
                                </div>
                                <Button onClick={() => handleDeleteGroup(group.id)} variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </section>

            {/* DONATES */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2>Manage Donate Methods</h2>
                    <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'primary'}>
                        {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Method</>}
                    </Button>
                </div>

                {isAdding && (
                    <Card hover={false} style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Add New Donate Method</h4>
                        <form onSubmit={handleAddDonate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
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

                            <select
                                value={newDonate.groupId}
                                onChange={(e) => setNewDonate({ ...newDonate, groupId: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                            >
                                <option value="">No Group</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
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

                <Reorder.Group axis="y" values={donates} onReorder={(newOrder) => {
                    setDonates(newOrder);
                    saveDonateOrder(newOrder);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {donates.map((item) => (
                        <Reorder.Item key={item.id} value={item}>
                            <Card hover={false} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <GripVertical size={20} style={{ color: 'var(--muted-foreground)', cursor: 'grab' }} />
                                    <div style={{ color: 'var(--primary)' }}>{icons[item.type as keyof typeof icons]}</div>
                                    <div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <p style={{ fontWeight: 'bold', margin: 0 }}>{item.provider} - {item.accountName}</p>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold', background: 'var(--secondary)', padding: '2px 6px', borderRadius: '4px' }}>
                                                {groups.find(g => g.id === item.groupId)?.name || 'No Group'}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0 }}>{item.accountNumber}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button onClick={() => handleDeleteDonate(item.id)} variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                                </div>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </section>
        </div>
    );
}
