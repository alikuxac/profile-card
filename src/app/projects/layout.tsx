import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects - Alikuxac',
    description: 'Selected projects, open-source work, and system architecture by Alikuxac.',
    openGraph: {
        title: 'Projects - Alikuxac',
        description: 'Selected projects, open-source work, and system architecture by Alikuxac.',
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
        description: 'Selected projects, open-source work, and system architecture by Alikuxac.',
        images: ['/pic.png'],
    }
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
