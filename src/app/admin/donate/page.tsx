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
    const [editingDonateId, setEditingDonateId] = useState<string | null>(null);
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null);

    const [newDonate, setNewDonate] = useState({ type: 'bank', provider: '', accountName: '', accountNumber: '', groupId: '' });
    const [editDonate, setEditDonate] = useState({ id: '', type: 'bank', provider: '', accountName: '', accountNumber: '', groupId: '' });
    const [newGroup, setNewGroup] = useState({ name: '' });
    const [editGroup, setEditGroup] = useState({ id: '', name: '' });

    const donateTimerRef = useRef<NodeJS.Timeout | null>(null);
    const groupTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const secret = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || '';
        const headers = { 'x-admin-secret': secret };
        const t = Date.now();

        const [donatesRes, groupsRes] = await Promise.all([
            fetch(`/api/donate?t=${t}`, { headers }),
            fetch(`/api/donate-groups?t=${t}`, { headers })
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
        const payload = preparePayload(newDonate);
        const res = await fetch('/api/donate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            setIsAdding(false);
            setNewDonate({ type: 'bank', provider: '', accountName: '', accountNumber: '', groupId: '' });
            fetchData();
        }
    };

    const handleStartEditDonate = (item: any) => {
        setEditingDonateId(item.id);
        setEditDonate({
            id: item.id,
            type: item.type || 'bank',
            provider: item.provider || '',
            accountName: item.accountName || '',
            accountNumber: item.accountNumber || '',
            groupId: item.groupId || ''
        });
    };

    const handleUpdateDonate = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = preparePayload(editDonate);
        const res = await fetch(`/api/donate/${editDonate.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            setEditingDonateId(null);
            fetchData();
        }
    };

    const preparePayload = (donateState: typeof newDonate) => {
        const { type, provider, accountName, accountNumber, groupId } = donateState;
        switch (type) {
            case 'paypal':
                return { type, provider: 'PayPal', accountName: accountName || 'PayPal', accountNumber, groupId };
            case 'coffee':
                return { type, provider: provider || 'Buy Me a Coffee', accountName: accountName || 'Support', accountNumber, groupId };
            case 'crypto':
                return { type, provider, accountName: accountName || 'Crypto Wallet', accountNumber, groupId };
            default:
                return { type, provider, accountName, accountNumber, groupId };
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

    const handleStartEditGroup = (group: any) => {
        setEditingGroupId(group.id);
        setEditGroup({ id: group.id, name: group.name || '' });
    };

    const handleUpdateGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch(`/api/donate-groups/${editGroup.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editGroup)
        });
        if (res.ok) {
            setEditingGroupId(null);
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

    const renderDynamicFields = (
        state: typeof newDonate,
        setState: React.Dispatch<React.SetStateAction<any>>
    ) => {
        switch (state.type) {
            case 'bank':
                return (
                    <>
                        <input
                            placeholder="Bank Name (e.g. Vietcombank, Techcombank)"
                            value={state.provider}
                            onChange={(e) => setState({ ...state, provider: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Holder Name (e.g. NGUYEN VAN A)"
                            value={state.accountName}
                            onChange={(e) => setState({ ...state, accountName: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Number (STK)"
                            value={state.accountNumber}
                            onChange={(e) => setState({ ...state, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                    </>
                );
            case 'wallet':
                return (
                    <>
                        <input
                            placeholder="Wallet Provider (e.g. MoMo, ZaloPay, Viettel Money)"
                            value={state.provider}
                            onChange={(e) => setState({ ...state, provider: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Name (Tên chủ ví)"
                            value={state.accountName}
                            onChange={(e) => setState({ ...state, accountName: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Phone Number / Wallet ID"
                            value={state.accountNumber}
                            onChange={(e) => setState({ ...state, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                    </>
                );
            case 'crypto':
                return (
                    <>
                        <input
                            placeholder="Coin / Network (e.g. USDT - TRC20, BTC, ETH)"
                            value={state.provider}
                            onChange={(e) => setState({ ...state, provider: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account / Wallet Label (Optional, e.g. Personal Wallet)"
                            value={state.accountName}
                            onChange={(e) => setState({ ...state, accountName: e.target.value })}
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Wallet Address (Địa chỉ ví)"
                            value={state.accountNumber}
                            onChange={(e) => setState({ ...state, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                    </>
                );
            case 'paypal':
                return (
                    <>
                        <input
                            placeholder="PayPal Display Name / Note (e.g. Personal PayPal)"
                            value={state.accountName}
                            onChange={(e) => setState({ ...state, accountName: e.target.value })}
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="PayPal Email or me Link (e.g. paypal.me/username)"
                            value={state.accountNumber}
                            onChange={(e) => setState({ ...state, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                    </>
                );
            case 'coffee':
                return (
                    <>
                        <input
                            placeholder="Platform Name (e.g. Buy Me a Coffee, Ko-fi)"
                            value={state.provider}
                            onChange={(e) => setState({ ...state, provider: e.target.value })}
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Profile URL / Username"
                            value={state.accountNumber}
                            onChange={(e) => setState({ ...state, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                    </>
                );
            case 'international':
            default:
                return (
                    <>
                        <input
                            placeholder="Service / Platform Name (e.g. Wise, Stripe, Patreon)"
                            value={state.provider}
                            onChange={(e) => setState({ ...state, provider: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Holder / Display Name"
                            value={state.accountName}
                            onChange={(e) => setState({ ...state, accountName: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                        <input
                            placeholder="Account Number / Link / Address"
                            value={state.accountNumber}
                            onChange={(e) => setState({ ...state, accountNumber: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
                    </>
                );
        }
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
                            {editingGroupId === group.id ? (
                                <Card hover={false} style={{ border: '2px solid var(--primary)', padding: '1rem' }}>
                                    <form onSubmit={handleUpdateGroup} style={{ display: 'flex', gap: '1rem', width: '100%' }}>
                                        <input
                                            placeholder="Group Name"
                                            value={editGroup.name}
                                            onChange={(e) => setEditGroup({ ...editGroup, name: e.target.value })}
                                            required
                                            className="glass"
                                            style={{ flex: 1, padding: '0.5rem 0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                                        />
                                        <Button type="button" variant="outline" size="sm" onClick={() => setEditingGroupId(null)}>Cancel</Button>
                                        <Button type="submit" size="sm"><Save size={16} /> Save</Button>
                                    </form>
                                </Card>
                            ) : (
                                <Card hover={false} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <GripVertical size={20} style={{ color: 'var(--muted-foreground)', cursor: 'grab' }} />
                                        <span style={{ fontWeight: 'bold' }}>{group.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <Button onClick={() => handleStartEditGroup(group)} variant="ghost" size="sm"><Edit2 size={16} /></Button>
                                        <Button onClick={() => handleDeleteGroup(group.id)} variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                                    </div>
                                </Card>
                            )}
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
                                <option value="bank">Bank Account</option>
                                <option value="wallet">E-Wallet (Momo, ZaloPay...)</option>
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

                            {renderDynamicFields(newDonate, setNewDonate)}

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
                            {editingDonateId === item.id ? (
                                <Card hover={false} style={{ border: '2px solid var(--primary)', padding: '1.5rem' }}>
                                    <h4 style={{ marginBottom: '1rem' }}>Edit Donate Method</h4>
                                    <form onSubmit={handleUpdateDonate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                                        <select
                                            value={editDonate.type}
                                            onChange={(e) => setEditDonate({ ...editDonate, type: e.target.value })}
                                            className="glass"
                                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                                        >
                                            <option value="bank">Bank Account</option>
                                            <option value="wallet">E-Wallet (Momo, ZaloPay...)</option>
                                            <option value="crypto">Blockchain / Crypto</option>
                                            <option value="paypal">PayPal</option>
                                            <option value="coffee">Buy Me a Coffee / Ko-fi</option>
                                            <option value="international">Global / Other</option>
                                        </select>

                                        <select
                                            value={editDonate.groupId}
                                            onChange={(e) => setEditDonate({ ...editDonate, groupId: e.target.value })}
                                            className="glass"
                                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                                        >
                                            <option value="">No Group</option>
                                            {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                        </select>

                                        {renderDynamicFields(editDonate, setEditDonate)}

                                        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <Button type="button" variant="outline" onClick={() => setEditingDonateId(null)}>Cancel</Button>
                                            <Button type="submit"><Save size={16} /> Save Changes</Button>
                                        </div>
                                    </form>
                                </Card>
                            ) : (
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
                                        <Button onClick={() => handleStartEditDonate(item)} variant="ghost" size="sm"><Edit2 size={16} /></Button>
                                        <Button onClick={() => handleDeleteDonate(item.id)} variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                                    </div>
                                </Card>
                            )}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </section>
        </div>
    );
}
