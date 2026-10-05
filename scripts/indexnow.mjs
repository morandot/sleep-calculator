#!/usr/bin/env node
/**
 * Submit URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 * The key is discovered from public/<32-hex>.txt so the hosted verification
 * file and the submission key can never drift apart.
 *
 * Usage:
 *   npm run indexnow                 # submit every <loc> in public/sitemap.xml
 *   npm run indexnow -- <url> [...]  # submit specific URLs
 *   npm run indexnow -- --dry-run    # print the payload without sending
 */
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC_DIR = join(ROOT, 'public')
const HOST = 'sleep.nopress.net'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

/** IndexNow requires the key file to be named "<key>.txt" at the host root. */
async function findKey() {
  const entries = await readdir(PUBLIC_DIR)
  const match = entries.find((name) => /^[a-f0-9]{32}\.txt$/.test(name))
  if (!match) {
    throw new Error('No public/<32-hex>.txt IndexNow key file found in public/')
  }
  return match.replace(/\.txt$/, '')
}

/** Fall back to the sitemap so the submitted set always matches the declared set. */
async function urlsFromSitemap() {
  const xml = await readFile(join(PUBLIC_DIR, 'sitemap.xml'), 'utf8')
  return [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])
}

async function main() {
  const argv = process.argv.slice(2)
  const dryRun = argv.includes('--dry-run')
  const explicit = argv.filter((arg) => !arg.startsWith('--'))

  const key = await findKey()
  const urlList = explicit.length > 0 ? explicit : await urlsFromSitemap()
  if (urlList.length === 0) {
    throw new Error('No URLs to submit (sitemap is empty and no URLs were passed)')
  }

  const payload = {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList,
  }

  if (dryRun) {
    console.log('Dry run — payload not sent:')
    console.log(JSON.stringify(payload, null, 2))
    return
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  // IndexNow returns 200 (accepted) or 202 (accepted, key pending validation).
  console.log(`IndexNow: HTTP ${response.status} ${response.statusText} for ${urlList.length} URL(s)`)
  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`IndexNow submission failed: ${detail || 'no response body'}`)
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
