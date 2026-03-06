'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import React from 'react';

const ICON_MAP: Record<string, keyof typeof LucideIcons> = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    x: 'Twitter',
    github: 'Github',
    instagram: 'Instagram',
    linkedin: 'Linkedin',
    youtube: 'Youtube',
    discord: 'MessageSquare',
    telegram: 'Send',
    momo: 'Wallet',
    bank: 'Landmark',
    website: 'Globe',
    link: 'Link',
    shopee: 'ShoppingBag',
    tiktok: 'Video'
};

interface LinkItem {
    id: string;
    groupId: string | null;
    title: string;
    url: string;
    icon?: string;
    color?: string;
}

interface LinkGroup {
    id: string;
    name: string;
}

export default function LinkList({ links, groups }: { links: LinkItem[], groups: LinkGroup[] }) {
    // Separate links by groups
    const groupedLinks = groups.map(group => ({
        ...group,
        items: links.filter(link => link.groupId === group.id)
    })).filter(group => group.items.length > 0);

    const ungroupedLinks = links.filter(link => !link.groupId);

    const renderLink = (link: LinkItem, index: number) => {
        const iconName = link.icon ? link.icon.toLowerCase() : '';
        const lucideName = ICON_MAP[iconName] || (link.icon && (LucideIcons as any)[link.icon] ? link.icon : 'ExternalLink');
        const IconComponent = (LucideIcons as any)[lucideName] || LucideIcons.ExternalLink;

        return (
            <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1.25rem 2rem',
                    borderRadius: '20px',
                    color: 'var(--foreground)',
                    fontWeight: '600',
                    border: '1px solid var(--glass-border)',
                    textDecoration: 'none',
                    width: '100%',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}
            >
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'var(--secondary)',
                    color: link.color || 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.25rem'
                }}>
                    <IconComponent size={22} />
                </div>
                <span style={{ flex: 1, fontSize: '1.1rem' }}>{link.title}</span>
                <LucideIcons.ChevronRight size={18} opacity={0.3} />
            </motion.a>
        );
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
            {groupedLinks.map((group) => (
                <div key={group.id}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1.5rem',
                        opacity: 0.8
                    }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                            {group.name}
                        </h3>
                        <div style={{ flex: 1, height: '1px', background: 'var(--primary)', opacity: 0.2 }} />
                    </div>
                    {group.items.map((link, idx) => renderLink(link, idx))}
                </div>
            ))}

            {ungroupedLinks.length > 0 && (
                <div>
                    {groupedLinks.length > 0 && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem',
                            opacity: 0.8
                        }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: '800', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                Others
                            </h3>
                            <div style={{ flex: 1, height: '1px', background: 'currentColor', opacity: 0.2 }} />
                        </div>
                    )}
                    {ungroupedLinks.map((link, idx) => renderLink(link, idx))}
                </div>
            )}
        </div>
    );
}
