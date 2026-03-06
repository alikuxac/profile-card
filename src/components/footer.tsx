export default function Footer() {
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
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="/links">Links</a>
                </div>
            </div>
        </footer>
    );
}
