'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, style, className, hover = true }: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' } : {}}
            className={`glass ${className || ''}`}
            style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius)',
                backgroundColor: 'var(--card)',
                color: 'var(--card-foreground)',
                border: '1px solid var(--border)',
                ...style
            }}
        >
            {children}
        </motion.div>
    );
}
