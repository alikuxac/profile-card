import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Donate | Alikuxac',
    description: 'Support my work through various donation channels including Momo, banking, and crypto.',
    openGraph: {
        title: 'Donate | Alikuxac',
        description: 'Support my work through various donation channels including Momo, banking, and crypto.',
        url: 'https://alikuxac.xyz/donate',
        type: 'website',
    },
    twitter: {
        title: 'Donate | Alikuxac',
        description: 'Support my work through various donation channels including Momo, banking, and crypto.',
    }
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
