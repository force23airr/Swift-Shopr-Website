import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://swiftshopr.shop';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/for-shoppers',
    '/for-retailers',
    '/for-affiliates',
    '/ai-demo',
    '/support',
    '/privacy',
    '/terms',
  ];
  const now = new Date();
  return routes.map((route) => ({
    url: `${SITE}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));
}
