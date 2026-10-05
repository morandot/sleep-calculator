import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { LANGUAGES, SITE_ORIGIN } from '../sitemap';

const GENERATOR_PATH = fileURLToPath(
  new URL('../../scripts/generate-sitemap.mjs', import.meta.url),
);

const SQ = String.fromCharCode(39);

describe('sitemap generator parity', () => {
  const gen = readFileSync(GENERATOR_PATH, 'utf8');

  it('uses the same origin as src/sitemap.ts', () => {
    expect(gen).toContain(`const SITE_ORIGIN = ${SQ}${SITE_ORIGIN}${SQ}`);
  });

  it('uses the same language list as src/sitemap.ts', () => {
    const list = LANGUAGES.map((lang) => `${SQ}${lang}${SQ}`).join(', ');
    expect(gen).toContain(`const LANGUAGES = [${list}]`);
  });
});
