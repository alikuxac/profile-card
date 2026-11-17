import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin', '/admin/'],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: ['/admin', '/admin/'],
            },
            {
                userAgent: 'GoogleOther',
                allow: '/',
                disallow: ['/admin', '/admin/'],
            },
        ],
        sitemap: 'https://alikuxac.xyz/sitemap.xml',
    };
}
