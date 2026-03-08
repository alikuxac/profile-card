import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects | Alikuxac',
    description: 'Explore my portfolio projects, open source contributions, and web development works.',
    openGraph: {
        title: 'Projects | Alikuxac',
        description: 'Explore my portfolio projects, open source contributions, and web development works.',
        url: 'https://alikuxac.xyz/projects',
        type: 'website',
    },
    twitter: {
        title: 'Projects | Alikuxac',
        description: 'Explore my portfolio projects, open source contributions, and web development works.',
    }
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
