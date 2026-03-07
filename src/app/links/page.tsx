'use client';

import { useState, useEffect } from 'react';
import LinkList from '@/components/link-list';

export default function LinksPage() {
    const [allLinks, setAllLinks] = useState<any[]>([]);
    const [allGroups, setAllGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [linksRes, groupsRes] = await Promise.all([
                    fetch('/api/links'),
                    fetch('/api/link-groups')
                ]);
                const linksData = await linksRes.json() as any;
                const groupsData = await groupsRes.json() as any;

                if (!linksData.error) setAllLinks(linksData);
                if (!groupsData.error) setAllGroups(groupsData);
            } catch (e) {
                console.error("Fetch failed", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '35px',
                    padding: '6px',
                    background: 'var(--secondary)',
                    margin: '0 auto 1.5rem',
                    border: '1px solid var(--border)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}>
                    <img
                        src="/pic.png"
                        alt="Profile"
                        style={{ width: '100%', height: '100%', borderRadius: '30px', objectFit: 'cover' }}
                    />
                </div>
                <h1 style={{ fontSize: '2.25rem', fontWeight: '900', marginBottom: '0.5rem' }}>Alikuxac<span style={{ color: 'var(--primary)' }}>.</span></h1>
                <p style={{ color: 'var(--muted-foreground)', fontWeight: '500' }}>Find me on other platforms & connectivity</p>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--muted-foreground)' }}>Loading links...</div>
            ) : (
                <LinkList links={allLinks} groups={allGroups} />
            )}
        </div>
    );
}
