'use client';

import Image from 'next/image';

export default function Background() {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -10,
            backgroundColor: '#000',
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            <Image
                src="/bg.jpg"
                alt="Background"
                fill
                priority
                quality={75}
                style={{
                    objectFit: 'cover',
                    opacity: 0.6
                }}
                sizes="100vw"
            />
            {/* Overlay to ensure readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4))'
            }} />
        </div>
    );
}
