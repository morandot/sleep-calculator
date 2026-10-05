#!/usr/bin/env node
/**
 * Generates public/sitemap.xml at build time so <lastmod> always reflects the
 * current build date instead of a value frozen at authoring time.
 *
 * Writes to public/ (not dist/) so Vite copies it into the build output.
 *
 * NOTE: intentionally duplicates the constants from src/sitemap.ts rather than
 * importing it, because a .mjs script cannot import .ts without an unstable
 * flag; src/__tests__/sitemap.test.ts asserts the two stay in sync.
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const SITE_ORIGIN = 'https://sleep.nopress.net'
const LANGUAGES = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es']

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function buildSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10)
  const loc = SITE_ORIGIN + '/'
  const alternates = LANGUAGES.map(
    (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${loc}"/>`,
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
${alternates}
  </url>
</urlset>
`
}

async function main() {
  const xml = buildSitemap()
  await writeFile(join(ROOT, 'public/sitemap.xml'), xml, 'utf8')
  const lastmod = xml.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]
  console.log(`sitemap.xml regenerated (lastmod: ${lastmod})`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
