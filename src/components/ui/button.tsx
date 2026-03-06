'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    style,
    ...props
}: ButtonProps) {
    const getStyles = () => {
        const base: React.CSSProperties = {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius)',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            border: 'none',
            gap: '0.5rem',
            fontFamily: 'inherit'
        };

        const variants = {
            primary: {
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
            },
            secondary: {
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
            },
            outline: {
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
            },
            ghost: {
                backgroundColor: 'transparent',
                color: 'var(--foreground)',
            }
        };

        const sizes = {
            sm: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
            md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
            lg: { padding: '1rem 2rem', fontSize: '1.125rem' },
        };

        return { ...base, ...variants[variant], ...sizes[size], ...style };
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={getStyles()}
            {...props}
        >
            {children}
        </motion.button>
    );
}
