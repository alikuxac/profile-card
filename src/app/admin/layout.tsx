'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Link as LinkIcon, Heart, FolderCode, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === '/admin/login';
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoginPage) {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('admin_token='))
                ?.split('=')[1];

            if (!token) {
                router.push('/admin/login');
            } else {
                setIsAuthorized(true);
            }
        } else {
            setIsAuthorized(true);
        }
    }, [pathname, isLoginPage, router]);

    if (!isAuthorized) return null;
    if (isLoginPage) return <div style={{ paddingTop: '2rem' }}>{children}</div>;

    const navItems = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
        { label: 'Manage Links', icon: <LinkIcon size={20} />, href: '/admin/links' },
        { label: 'Manage Donate', icon: <Heart size={20} />, href: '/admin/donate' },
        { label: 'Manage Projects', icon: <FolderCode size={20} />, href: '/admin/projects' },
    ];

    return (
        <div className="admin-container">
            <aside className="admin-sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: 'var(--radius)',
                                    color: isActive ? 'var(--primary)' : 'var(--foreground)',
                                    fontWeight: isActive ? '700' : '500',
                                    background: isActive ? 'var(--secondary)' : 'transparent',
                                }}
                                className={!isActive ? "glass" : ""}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <button
                    onClick={() => {
                        document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                        window.location.href = '/admin/login';
                    }}
                    style={{
                        marginTop: '2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        borderRadius: 'var(--radius)',
                        border: '1px solid #fee2e2',
                        background: 'rgba(239, 68, 68, 0.1)',
                        backdropFilter: 'blur(10px)',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontWeight: '700',
                        width: '100%',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    }}
                    className="logout-btn"
                >
                    <LogOut size={20} /> <span>Logout</span>
                </button>
            </aside>

            <main className="admin-main">
                {children}
            </main>
        </div>
    );
}
