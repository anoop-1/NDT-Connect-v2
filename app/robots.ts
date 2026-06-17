import { MetadataRoute } from 'next';

// Private/app surfaces kept out of every crawler's index.
const DISALLOW = [
  '/admin/',
  '/dashboard/',
  '/api/',
  '/settings/',
  '/my-requests/',
  '/provider-dashboard/',
  '/provider-profile/',
  '/provider-requests/',
  '/track-request/',
];

// AEO/GEO: explicitly welcome AI answer engines so NDT Connect content is
// eligible for citation in ChatGPT, Claude, Perplexity, and Google AI Overviews.
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: 'https://ndt-connect.com/sitemap-index.xml',
    host: 'https://ndt-connect.com',
  };
}
