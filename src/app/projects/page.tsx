'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/project-card';

export default function ProjectsPage() {
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsRes, groupsRes] = await Promise.all([
                    fetch('/api/projects'),
                    fetch('/api/project-groups')
                ]);
                const projectsData = await projectsRes.json() as any;
                const groupsData = await groupsRes.json() as any;

                if (!projectsData.error) setAllProjects(projectsData);
                if (!groupsData.error) setGroups(groupsData);
            } catch (e) {
                console.error("Failed to fetch projects", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const others = allProjects.filter(p => !p.groupId);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Featured Projects</h1>
                <p style={{ color: 'var(--muted-foreground)', fontWeight: '600', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>A collection of things I&apos;ve built and worked on.</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading projects...</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    {groups.map(group => {
                        const groupProjects = allProjects.filter(p => p.groupId === group.id);
                        if (groupProjects.length === 0) return null;

                        return (
                            <section key={group.id}>
                                <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{group.name}</h3>
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '2rem'
                                }}>
                                    {groupProjects.map((project) => (
                                        <ProjectCard key={project.id} project={project} />
                                    ))}
                                </div>
                            </section>
                        );
                    })}

                    {others.length > 0 && (
                        <section>
                            {groups.length > 0 && <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Others</h3>}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '2rem'
                            }}>
                                {others.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            )}
        </div>
    );
}
