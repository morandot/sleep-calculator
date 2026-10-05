/**
 * Sitemap generation for the sleep calculator.
 *
 * Kept as a pure module so the output is unit testable and reusable by both
 * the build-time generator and any future runtime route.
 */

export const SITE_ORIGIN = 'https://sleep.nopress.net';

/** Languages the UI actually ships, mirroring src/i18n.ts. */
export const LANGUAGES = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es'] as const;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const todayIsoDate = (): string => new Date().toISOString().slice(0, 10);

/** Builds the full sitemap XML document. */
export function buildSitemap(options: { lastmod?: string } = {}): string {
  const lastmod = options.lastmod ?? todayIsoDate();
  const loc = SITE_ORIGIN + '/';

  const alternates = LANGUAGES.map(
    (lang) =>
      '    <xhtml:link rel="alternate" hreflang="' + lang + '" href="' + escapeXml(loc) + '"/>',
  ).join('\n');

  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${alternates}
  </url>
</urlset>
`;
}
