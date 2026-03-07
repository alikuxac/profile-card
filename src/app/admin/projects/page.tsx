'use client';

import { useState, useEffect, useRef } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Plus, Trash2, Edit2, Save, X, Globe, Github, GripVertical, Layers } from 'lucide-react';
import { Reorder } from 'framer-motion';

export default function ProjectManager() {
    const [projects, setProjects] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isAddingGroup, setIsAddingGroup] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', url: '', githubUrl: '', coverImage: '', groupId: '' });
    const [newGroup, setNewGroup] = useState({ name: '' });

    const projectTimerRef = useRef<NodeJS.Timeout | null>(null);
    const groupTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const secret = document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || '';
        const headers = { 'x-admin-secret': secret };
        const t = Date.now();

        const [projectsRes, groupsRes] = await Promise.all([
            fetch(`/api/projects?t=${t}`, { headers }),
            fetch(`/api/project-groups?t=${t}`, { headers })
        ]);
        const projectsData = await projectsRes.json() as any;
        const groupsData = await groupsRes.json() as any;

        if (!projectsData.error) {
            setProjects(projectsData.sort((a: any, b: any) => a.order - b.order));
        }
        if (!groupsData.error) {
            setGroups(groupsData.sort((a: any, b: any) => a.order - b.order));
        }
    };

    const saveProjectOrder = (newOrder: any[]) => {
        if (projectTimerRef.current) clearTimeout(projectTimerRef.current);
        projectTimerRef.current = setTimeout(async () => {
            const items = newOrder.map((p, idx) => ({ id: p.id, order: idx }));
            await fetch('/api/projects/reorder', {
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
            await fetch('/api/project-groups/reorder', {
                method: 'POST',
                body: JSON.stringify({ items }),
                headers: { 'Content-Type': 'application/json' }
            });
        }, 1000);
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });
        if (res.ok) {
            setIsAdding(false);
            setNewProject({ title: '', description: '', url: '', githubUrl: '', coverImage: '', groupId: '' });
            fetchData();
        }
    };

    const handleAddGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/project-groups', {
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

    // Note: Delete APIs for dynamic routes might need implementation if not exists
    const handleDeleteProject = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
        fetchData();
    };

    const handleDeleteGroup = async (id: string) => {
        if (!confirm('Deleting this group will move all its projects to "No Group". Proceed?')) return;
        await fetch(`/api/project-groups/${id}`, { method: 'DELETE' });
        fetchData();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {/* GROUPS */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Layers size={24} /> Project Groups</h2>
                    <Button onClick={() => setIsAddingGroup(!isAddingGroup)} variant={isAddingGroup ? 'outline' : 'primary'}>
                        {isAddingGroup ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Group</>}
                    </Button>
                </div>

                {isAddingGroup && (
                    <Card hover={false} style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Create New Group</h4>
                        <form onSubmit={handleAddGroup} style={{ display: 'flex', gap: '1rem' }}>
                            <input
                                placeholder="Group Name (e.g. Professional, Personal)"
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

            {/* PROJECTS */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2>Manage Projects</h2>
                    <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'primary'}>
                        {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Project</>}
                    </Button>
                </div>

                {isAdding && (
                    <Card hover={false} style={{ marginBottom: '2rem', border: '2px solid var(--primary)' }}>
                        <h4 style={{ marginBottom: '1rem' }}>Add New Project Entry</h4>
                        <form onSubmit={handleAddProject} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                            <input
                                placeholder="Project Title"
                                value={newProject.title}
                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                required
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />

                            <select
                                value={newProject.groupId}
                                onChange={(e) => setNewProject({ ...newProject, groupId: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)' }}
                            >
                                <option value="">No Group</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>

                            <input
                                placeholder="Cover Image URL"
                                value={newProject.coverImage}
                                onChange={(e) => setNewProject({ ...newProject, coverImage: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />
                            <textarea
                                placeholder="Project Description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className="glass"
                                style={{ gridColumn: '1 / -1', padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent', minHeight: '80px' }}
                            />
                            <input
                                placeholder="Live Demo URL"
                                value={newProject.url}
                                onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />
                            <input
                                placeholder="GitHub URL"
                                value={newProject.githubUrl}
                                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                                className="glass"
                                style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                            />
                            <Button type="submit" style={{ gridColumn: '1 / -1' }}>Save Project</Button>
                        </form>
                    </Card>
                )}

                <Reorder.Group axis="y" values={projects} onReorder={(newOrder) => {
                    setProjects(newOrder);
                    saveProjectOrder(newOrder);
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {projects.map((project) => (
                        <Reorder.Item key={project.id} value={project}>
                            <Card hover={false} style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <GripVertical size={20} style={{ color: 'var(--muted-foreground)', cursor: 'grab' }} />
                                        <div>
                                            <h4 style={{ margin: 0 }}>{project.title}</h4>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                                                {groups.find(g => g.id === project.groupId)?.name || 'No Group'}
                                            </span>
                                        </div>
                                    </div>
                                    <Button onClick={() => handleDeleteProject(project.id)} variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '1rem', marginLeft: '2.25rem' }}>{project.description}</p>
                                <div style={{ display: 'flex', gap: '1rem', marginLeft: '2.25rem' }}>
                                    {project.url && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}><Globe size={14} color="var(--primary)" /> Demo</div>}
                                    {project.githubUrl && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}><Github size={14} /> Repository</div>}
                                </div>
                            </Card>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </section>
        </div>
    );
}
