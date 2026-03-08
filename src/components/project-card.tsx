'use client';

import Card from './ui/card';
import { Github, ExternalLink } from 'lucide-react';
import Button from './ui/button';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: any }) {
    return (
        <Card style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
                width: '100%',
                height: '180px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Image
                    src={project.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--muted-foreground)',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {project.description}
                    </p>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
                    {project.url && (
                        <a href={`/p/${project.slug || project.id}`} target="_blank" rel="noopener noreferrer nofollow" title={`View live demo of ${project.title}`} aria-label={`View live demo of ${project.title}`} style={{ flex: 1 }}>
                            <Button size="sm" style={{ width: '100%' }}>
                                <ExternalLink size={16} /> Live Demo
                            </Button>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer nofollow" title={`View source code of ${project.title} on GitHub`} aria-label={`View source code of ${project.title} on GitHub`}>
                            <Button variant="outline" size="sm">
                                <Github size={16} />
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
}
