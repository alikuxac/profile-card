'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/card';
import Button from '@/components/ui/button';
import { Plus, Trash2, Edit2, Save, X, Globe, Github } from 'lucide-react';

export default function ProjectManager() {
    const [projects, setProjects] = useState<any[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', url: '', githubUrl: '', coverImage: '' });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/projects');
        const data = await res.json() as any;
        if (!data.error) setProjects(data);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProject)
        });
        if (res.ok) {
            setIsAdding(false);
            setNewProject({ title: '', description: '', url: '', githubUrl: '', coverImage: '' });
            fetchProjects();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2>Manage Projects</h2>
                <Button onClick={() => setIsAdding(!isAdding)} variant={isAdding ? 'outline' : 'primary'}>
                    {isAdding ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Project</>}
                </Button>
            </div>

            {isAdding && (
                <Card hover={false} style={{ marginBottom: '2rem' }}>
                    <h4>Add New Project Entry</h4>
                    <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        <input
                            placeholder="Project Title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            required
                            className="glass"
                            style={{ padding: '0.75rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'transparent' }}
                        />
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {projects.map((project) => (
                    <Card key={project.id} hover={false}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <h4 style={{ margin: 0 }}>{project.title}</h4>
                            <Button variant="ghost" size="sm" style={{ color: '#ef4444' }}><Trash2 size={16} /></Button>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)', marginBottom: '1rem' }}>{project.description}</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {project.url && <Globe size={16} color="var(--primary)" />}
                            {project.githubUrl && <Github size={16} />}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
