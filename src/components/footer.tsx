import { useEffect, useState } from 'react';

export default function Footer() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // Track this view
        fetch('/api/views', { method: 'POST' }).catch(() => { });

        // Fetch total views
        const fetchViews = async () => {
            try {
                const res = await fetch('/api/views');
                if (res.ok) {
                    const data = await res.json() as any;
                    setViews(data.totalViews);
                }
            } catch (e) { }
        };
        fetchViews();
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
