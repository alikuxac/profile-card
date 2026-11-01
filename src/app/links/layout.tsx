import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Links - Alikuxac',
    description: 'Direct links to profiles, channels, and projects by Alikuxac.',
    openGraph: {
        title: 'Links - Alikuxac',
        description: 'Direct links to profiles, channels, and projects by Alikuxac.',
        url: 'https://alikuxac.xyz/links',
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
        title: 'Links - Alikuxac',
        description: 'Direct links to profiles, channels, and projects by Alikuxac.',
        images: ['https://cdn.alikuxac.xyz/profile/pic.png'],
    }
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
