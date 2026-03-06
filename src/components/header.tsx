import Link from 'next/link';
import ThemeToggle from './theme-toggle';

export default function Header() {
    return (
        <header style={{
            position: 'sticky',
            top: '0',
            zIndex: 100,
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '1rem',
        }} className="glass">
            <div style={{ padding: '0 2rem', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '800', textShadow: '0 2px 4px rgba(0,0,0,0.1)', color: 'var(--primary)' }}>
                    Alikuxac<span style={{ color: 'var(--foreground)' }}>.xyz</span>
                </Link>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link href="/links" style={{ fontWeight: '600' }}>Links</Link>
                    <Link href="/donate" style={{ fontWeight: '600' }}>Donate</Link>
                    <Link href="/projects" style={{ fontWeight: '600' }}>Projects</Link>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
