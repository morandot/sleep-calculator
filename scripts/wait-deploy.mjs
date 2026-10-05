#!/usr/bin/env node
/**
 * Waits until the live site is serving the freshly generated sitemap before
 * notifying search engines, so IndexNow never submits a stale URL set.
 *
 * Env:
 *   DEPLOY_TIMEOUT   max wait in seconds (default 300)
 */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SITEMAP_URL = 'https://sleep.nopress.net/sitemap.xml'
const INTERVAL_MS = 5000
const TIMEOUT_MS = Number(process.env.DEPLOY_TIMEOUT ?? 300) * 1000

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function expectedLastmod() {
  const xml = await readFile(join(ROOT, 'public/sitemap.xml'), 'utf8')
  const match = xml.match(/<lastmod>([^<]+)<\/lastmod>/)
  if (!match) throw new Error('public/sitemap.xml has no <lastmod>')
  return match[1]
}

async function main() {
  const want = await expectedLastmod()
  const deadline = Date.now() + TIMEOUT_MS

  while (Date.now() < deadline) {
    try {
      const response = await fetch(SITEMAP_URL, { cache: 'no-store' })
      if (response.ok) {
        const body = await response.text()
        if (body.includes(`<lastmod>${want}</lastmod>`)) {
          console.log(`live sitemap matches build (lastmod: ${want})`)
          return
        }
      }
    } catch (error) {
      // Deployment not reachable yet; keep polling until the deadline.
    }
    await sleep(INTERVAL_MS)
  }

  throw new Error(`timed out waiting for live sitemap lastmod ${want}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
