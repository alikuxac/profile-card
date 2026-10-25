'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ViewsResponse {
    totalViews?: number;
}

export default function Footer() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // Defer non-critical analytics/views fetching to avoid blocking FCP/LCP
        const timer = setTimeout(() => {
            fetch('/api/views', { method: 'POST' }).catch(() => { });

            fetch('/api/views')
                .then(res => res.ok ? (res.json() as Promise<ViewsResponse>) : null)
                .then(data => {
                    if (data && typeof data.totalViews === 'number') {
                        setViews(data.totalViews);
                    }
                })
                .catch(() => { });
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <footer style={{
            padding: '1.25rem 1.5rem',
            textAlign: 'center',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
            color: 'var(--muted-foreground)',
            fontSize: '0.875rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <p>&copy; {new Date().getFullYear()} Alikuxac. Built with Next.js &amp; Cloudflare.</p>
                <div style={{
                    marginTop: '0.75rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <Link href="/terms" style={{ color: 'inherit', transition: 'color 0.2s' }}>
                        Terms of Service
                    </Link>
                    <span>•</span>
                    <Link href="/privacy" style={{ color: 'inherit', transition: 'color 0.2s' }}>
                        Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link href="/links" style={{ color: 'inherit', transition: 'color 0.2s' }}>
                        Links
                    </Link>
                    <span>•</span>
                    <a
                        href="https://github.com/alikuxac"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        aria-label="Visit Alikuxac on GitHub"
                        title="GitHub Profile"
                        style={{ color: 'inherit', transition: 'color 0.2s' }}
                    >
                        GitHub
                    </a>
                </div>
                {views !== null && (
                    <p style={{ marginTop: '0.75rem', opacity: 0.7, fontSize: '0.75rem' }}>
                        Total Visitors: <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{views.toLocaleString()}</span>
                    </p>
                )}
            </div>
        </footer>
    );
}

