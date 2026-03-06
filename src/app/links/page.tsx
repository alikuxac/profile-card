import { getDb } from '@/db';
import { links, linkGroups } from '@/db/schema';
import LinkList from '@/components/link-list';
import { asc } from 'drizzle-orm';

export const runtime = 'edge';

export default async function LinksPage(props: any) {
    const env = props.context?.cloudflare?.env || process.env;
    let allLinks: any[] = [];
    let allGroups: any[] = [];

    try {
        const db = getDb(env);
        allLinks = await db.select().from(links).orderBy(asc(links.order));
        allGroups = await db.select().from(linkGroups).orderBy(asc(linkGroups.order));
    } catch (e) {
        console.error("DB fetch failed", e);
    }

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

            <LinkList links={allLinks} groups={allGroups} />
        </div>
    );
}
