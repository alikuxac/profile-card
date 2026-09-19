import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Links - Alikuxac',
    description: 'Find all my social media links and connectivity platforms.',
    openGraph: {
        title: 'Links - Alikuxac',
        description: 'Find all my social media links and connectivity platforms.',
        url: 'https://alikuxac.xyz/links',
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
        title: 'Links - Alikuxac',
        description: 'Find all my social media links and connectivity platforms.',
        images: ['/pic.png'],
    }
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
