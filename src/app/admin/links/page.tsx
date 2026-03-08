'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Plus, Trash2, Edit2, Save, X, Layers, Link as LinkIcon, ExternalLink, GripVertical } from 'lucide-react';
import { Reorder } from 'framer-motion';

const FAMOUS_ICONS = [
    'facebook', 'twitter', 'x', 'github', 'instagram', 'linkedin',
    'youtube', 'discord', 'telegram', 'momo', 'bank', 'website',
    'link', 'shopee', 'tiktok'
];

export default function LinkManager() {
    const [links, setLinks] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [isAddingLink, setIsAddingLink] = useState(false);
    const [isAddingGroup, setIsAddingGroup] = useState(false);

    const [newLink, setNewLink] = useState({ title: '', url: '', icon: '', color: '', groupId: '', slug: '' });
    const [newGroup, setNewGroup] = useState({ name: '' });

    const linksTimerRef = useRef<NodeJS.Timeout | null>(null);
    const groupsTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const secret = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || '';
        const headers = { 'x-admin-secret': secret };
        const t = Date.now();

        const [linksRes, groupsRes] = await Promise.all([
            fetch(`/api/links?t=${t}`, { headers }),
            fetch(`/api/link-groups?t=${t}`, { headers })
        ]);
        const linksData = await linksRes.json() as any;
        const groupsData = await groupsRes.json() as any;

        if (!linksData.error) {
            setLinks(linksData.sort((a: any, b: any) => a.order - b.order));
        }
        if (!groupsData.error) {
            setGroups(groupsData.sort((a: any, b: any) => a.order - b.order));
        }
    };

    const saveGroupsOrder = (newOrder: any[]) => {
        if (groupsTimerRef.current) clearTimeout(groupsTimerRef.current);
        groupsTimerRef.current = setTimeout(async () => {
            const items = newOrder.map((g, idx) => ({ id: g.id, order: idx }));
            await fetch('/api/link-groups/reorder', {
                method: 'POST',
                body: JSON.stringify({ items }),
                headers: { 'Content-Type': 'application/json' }
            });
        }, 1000);
    };

    const saveLinksOrder = (newOrder: any[]) => {
        if (linksTimerRef.current) clearTimeout(linksTimerRef.current);
        linksTimerRef.current = setTimeout(async () => {
            const items = newOrder.map((l, idx) => ({ id: l.id, order: idx }));
            await fetch('/api/links/reorder', {
                method: 'POST',
                body: JSON.stringify({ items }),
                headers: { 'Content-Type': 'application/json' }
            });
        }, 1000);
    };

    const handleAddLink = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newLink)
        });
        if (res.ok) {
            setIsAddingLink(false);
            setNewLink({ title: '', url: '', icon: '', color: '', groupId: '', slug: '' });
            fetchData();
        }
    };

    const handleAddGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/link-groups', {
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

    const handleDeleteLink = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/links/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handleDeleteGroup = async (id: string) => {
        if (!confirm('Deleting a group will move its links to "Others". Proceed?')) return;
        await fetch(`/api/link-groups/${id}`, { method: 'DELETE' });
        fetchData();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* GROUP MANAGEMENT */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Layers size={24} /> Link Groups</h2>
                    <Button onClick={() => setIsAddingGroup(!isAddingGroup)} variant={isAddingGroup ? 'outline' : 'primary'}>
                        {isAddingGroup ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Group</>}
                    </Button>
                </div>

                {isAddingGroup && (
                    <Card hover={false} style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Create New Group</h4>
                        <form onSubmit={handleAddGroup} style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                placeholder="Group Name (e.g. Work, Social)"
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
                    saveGroupsOrder(newOrder);
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

            {/* LINK MANAGEMENT */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><LinkIcon size={24} /> All Links</h2>
                    <Button onClick={() => setIsAddingLink(!isAddingLink)} variant={isAddingLink ? 'outline' : 'primary'}>
                        {isAddingLink ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Link</>}
                    </Button>
                </div>

                {isAddingLink && (
                    <Card hover={false} style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Add New Social Link</h4>
                        <form onSubmit={handleAddLink} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                            <input
                                placeholder="Title (e.g. GitHub)"
                                value={newLink.title}
                                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                required
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />
                            <input
                                placeholder="URL"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                required
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />
                            <input
                                placeholder="Custom Slug (optional, e.g. github)"
                                value={newLink.slug}
                                onChange={(e) => setNewLink({ ...newLink, slug: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />

                            <select
                                value={newLink.groupId}
                                onChange={(e) => setNewLink({ ...newLink, groupId: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                            >
                                <option value="">No Group (Others)</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>

                            <select
                                value={newLink.icon}
                                onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                            >
                                <option value="">Select Icon (Optional)</option>
                                {FAMOUS_ICONS.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>

                            <input
                                placeholder="HEX Color (e.g. #1877F2)"
                                value={newLink.color}
                                onChange={(e) => setNewLink({ ...newLink, color: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />

                            <Button type="submit" style={{ gridColumn: '1 / -1' }}>Save Link</Button>
                        </form>
                    </Card>
                )}

                <Reorder.Group axis="y" values={links} onReorder={(newOrder) => {
                    setLinks(newOrder);
                    saveLinksOrder(newOrder);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {links.map((link) => (
                        <Reorder.Item key={link.id} value={link}>
                            <Card hover={false} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <GripVertical size={20} style={{ color: 'var(--muted-foreground)', cursor: 'grab' }} />
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: link.color || 'var(--secondary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: link.color ? 'white' : 'var(--primary)'
                                    }}>
                                        <ExternalLink size={16} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{link.title}</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '10px', background: 'var(--secondary)', color: 'var(--primary)' }}>
                                                {groups.find(g => g.id === link.groupId)?.name || 'No Group'}
                                            </span>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)' }}>{link.url}</p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteLink(link.id)} style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                                </div>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </section>
        </div>
    );
}
