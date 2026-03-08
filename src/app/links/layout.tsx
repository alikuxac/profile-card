import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Links | Alikuxac',
    description: 'Find all my social media links and connectivity platforms.',
    openGraph: {
        title: 'Links | Alikuxac',
        description: 'Find all my social media links and connectivity platforms.',
        url: 'https://alikuxac.xyz/links',
        type: 'website',
    },
    twitter: {
        title: 'Links | Alikuxac',
        description: 'Find all my social media links and connectivity platforms.',
    }
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
