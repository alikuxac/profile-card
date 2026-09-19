import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects - Alikuxac',
    description: 'Explore my portfolio projects, open source contributions, and web development works.',
    openGraph: {
        title: 'Projects - Alikuxac',
        description: 'Explore my portfolio projects, open source contributions, and web development works.',
        url: 'https://alikuxac.xyz/projects',
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
        title: 'Projects - Alikuxac',
        description: 'Explore my portfolio projects, open source contributions, and web development works.',
        images: ['/pic.png'],
    }
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
