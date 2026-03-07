'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/project-card';

export default function ProjectsPage() {
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                const data = await res.json() as any;
                if (!data.error) setAllProjects(data);
            } catch (e) {
                console.error("Failed to fetch projects", e);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Featured Projects</h1>
                <p style={{ color: 'var(--muted-foreground)', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>A collection of things I&apos;ve built and worked on.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading projects...</div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {allProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
}
