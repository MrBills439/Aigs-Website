import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.adiswigsandbeauty.com';
  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/policies/shipping`, lastModified: new Date() },
    { url: `${baseUrl}/policies/returns`, lastModified: new Date() },
    { url: `${baseUrl}/policies/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/policies/terms`, lastModified: new Date() }
  ];
}
