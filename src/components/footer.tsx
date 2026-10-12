'use client';

import { useEffect, useState } from 'react';

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
            padding: '1rem 1.5rem',
            textAlign: 'center',
            borderTop: '1px solid var(--border)',
            marginTop: 'auto',
            color: 'var(--muted-foreground)',
            fontSize: '0.875rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <p>&copy; {new Date().getFullYear()} Alikuxac. All rights reserved.</p>
                <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <a href="https://github.com/alikuxac" target="_blank" rel="noopener noreferrer nofollow" aria-label="Visit Alikuxac on GitHub" title="GitHub Profile">GitHub</a>
                    <a href="/links">Links</a>
                </div>
                {views !== null && (
                    <p style={{ marginTop: '0.5rem', opacity: 0.7, fontSize: '0.75rem' }}>
                        Total Visitors: <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{views.toLocaleString()}</span>
                    </p>
                )}
            </div>
        </footer>
    );
}
