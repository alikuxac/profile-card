import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donate - Alikuxac',
    description: 'Support development and infrastructure costs via bank transfer, MoMo, or crypto.',
    openGraph: {
        title: 'Donate - Alikuxac',
        description: 'Support development and infrastructure costs via bank transfer, MoMo, or crypto.',
        url: 'https://alikuxac.xyz/donate',
        type: 'website',
        images: [
            {
                url: 'https://cdn.alikuxac.xyz/profile/pic.png',
                width: 400,
                height: 400,
                alt: 'Alikuxac Profile Picture',
            },
        ],
    },
    twitter: {
        card: 'summary',
        title: 'Donate - Alikuxac',
        description: 'Support development and infrastructure costs via bank transfer, MoMo, or crypto.',
        images: ['https://cdn.alikuxac.xyz/profile/pic.png'],
    }
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <link rel="preconnect" href="https://img.vietqr.io" crossOrigin="anonymous" />
            {children}
        </>
    );
}
