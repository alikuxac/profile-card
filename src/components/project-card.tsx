'use client';

import React, { useEffect, useState } from 'react';
import Card from './ui/card';
import { GitCommit, ExternalLink, Star, GitFork, Tag, Clock, FileText } from 'lucide-react';
import Button from './ui/button';
import Image from 'next/image';

export interface ProjectData {
    id: string;
    slug?: string;
    title: string;
    description?: string;
    url?: string;
    githubUrl?: string;
    coverImage?: string;
    badges?: string[];
    techStack?: string[];
}

interface RepoStats {
    stars: number;
    forks: number;
    version: string | null;
    releaseUrl: string | null;
    updatedAt: string | null;
}

function formatRelativeTime(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays}d ago`;
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}mo ago`;
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears}y ago`;
}

function extractRepoName(githubUrl?: string): string | null {
    if (!githubUrl) return null;
    try {
        const parsed = new URL(githubUrl);
        const parts = parsed.pathname.split('/').filter(Boolean);
        if (parts.length >= 2) {
            return parts[1]; // owner/repo -> repo
        }
    } catch {
        return null;
    }
    return null;
}

export default function ProjectCard({ project }: { project: ProjectData }) {
    const [stats, setStats] = useState<RepoStats | null>(null);

    const repoName = extractRepoName(project.githubUrl);

    useEffect(() => {
        if (!repoName) return;

        let isMounted = true;
        fetch(`/api/repo-stats/${repoName}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch stats');
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setStats(data as RepoStats);
                }
            })
            .catch(() => {
                // Gracefully ignore fetch errors
            });

        return () => {
            isMounted = false;
        };
    }, [repoName]);

    // Parse lifecycle badges and tech stack if passed, or default gracefully
    const badges = project.badges || ['Open Source'];
    const techStack = project.techStack || [];

    return (
        <Card style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Project Image */}
            <div style={{
                width: '100%',
                height: '180px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <Image
                    src={project.coverImage || '/cover.svg'}
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

            {/* Content Body */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Header & Lifecycle Badges */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{project.title}</h3>
                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                            {badges.map((badge, idx) => (
                                <span key={idx} style={{
                                    fontSize: '0.7rem',
                                    padding: '0.15rem 0.5rem',
                                    borderRadius: '9999px',
                                    backgroundColor: 'var(--accent, #f3f4f6)',
                                    color: 'var(--accent-foreground, #374151)',
                                    fontWeight: 500,
                                    border: '1px solid var(--border, #e5e7eb)'
                                }}>
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p style={{
                        fontSize: '0.875rem',
                        color: 'var(--muted-foreground, #6b7280)',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        margin: 0
                    }}>
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack Tags */}
                {techStack.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {techStack.map((tech, idx) => (
                            <span key={idx} style={{
                                fontSize: '0.75rem',
                                padding: '0.125rem 0.5rem',
                                borderRadius: '0.375rem',
                                backgroundColor: 'var(--secondary, #e5e7eb)',
                                color: 'var(--secondary-foreground, #1f2937)'
                            }}>
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                {/* Stats Row (Always Visible - Engineering "Show, Don't Tell") */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    fontSize: '0.75rem',
                    color: 'var(--muted-foreground, #6b7280)',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid var(--border, #e5e7eb)',
                    marginTop: 'auto'
                }}>
                    {/* Version Tag */}
                    {stats?.version ? (
                        <a
                            href={stats.releaseUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                fontWeight: 600
                            }}
                            title="View Release Notes"
                        >
                            <Tag size={12} /> {stats.version}
                        </a>
                    ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', opacity: 0.8 }}>
                            🏗️ In Development
                        </span>
                    )}

                    {/* Stars */}
                    {project.githubUrl ? (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: 'inherit', textDecoration: 'none' }}
                        >
                            <Star size={12} /> {stats ? stats.stars : 0}
                        </a>
                    ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                            <Star size={12} /> {stats ? stats.stars : 0}
                        </span>
                    )}

                    {/* Forks */}
                    {project.githubUrl ? (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: 'inherit', textDecoration: 'none' }}
                        >
                            <GitFork size={12} /> {stats ? stats.forks : 0}
                        </a>
                    ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                            <GitFork size={12} /> {stats ? stats.forks : 0}
                        </span>
                    )}

                    {/* Freshness */}
                    {stats?.updatedAt && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginLeft: 'auto' }}>
                            <Clock size={12} /> Pushed {formatRelativeTime(stats.updatedAt)}
                        </span>
                    )}
                </div>

                {/* Footer Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            title={`View source code of ${project.title} on GitHub`}
                            aria-label={`View source code of ${project.title} on GitHub`}
                            style={{ flex: 1 }}
                        >
                            <Button variant="outline" size="sm" style={{ width: '100%' }}>
                                <GitCommit size={14} /> Source Code
                            </Button>
                        </a>
                    )}

                    {stats?.releaseUrl && (
                        <a
                            href={stats.releaseUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            title={`View release notes for ${project.title}`}
                            aria-label={`View release notes for ${project.title}`}
                            style={{ flex: 1 }}
                        >
                            <Button variant="outline" size="sm" style={{ width: '100%' }}>
                                <FileText size={14} /> Release Notes
                            </Button>
                        </a>
                    )}

                    {project.url && (
                        <a
                            href={`/p/${project.slug || project.id}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            title={`View live demo of ${project.title}`}
                            aria-label={`View live demo of ${project.title}`}
                            style={{ flex: 1 }}
                        >
                            <Button size="sm" style={{ width: '100%' }}>
                                <ExternalLink size={14} /> Live Demo
                            </Button>
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
}
