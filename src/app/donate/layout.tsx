import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donate - Alikuxac',
    description: 'Support my work through various donation channels including Momo, banking, and crypto.',
    openGraph: {
        title: 'Donate - Alikuxac',
        description: 'Support my work through various donation channels including Momo, banking, and crypto.',
        url: 'https://alikuxac.xyz/donate',
        type: 'website',
        images: [
            {
                url: '/pic.png',
                width: 400,
                height: 400,
                alt: 'Alikuxac Profile Picture',
            },
        ],
    },
    twitter: {
        card: 'summary',
        title: 'Donate - Alikuxac',
        description: 'Support my work through various donation channels including Momo, banking, and crypto.',
        images: ['/pic.png'],
    }
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
