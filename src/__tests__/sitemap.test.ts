import { describe, expect, it, vi, afterEach } from 'vitest';
import { buildSitemap, SITE_ORIGIN } from '../sitemap';

afterEach(() => {
  vi.useRealTimers();
});

describe('sitemap', () => {
  it('emits a valid urlset with the canonical origin', () => {
    const xml = buildSitemap({ lastmod: '2026-10-05' });
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('http://www.sitemaps.org/schemas/sitemap/0.9');
    expect(xml).toContain('<loc>https://sleep.nopress.net/</loc>');
  });

  it('tracks lastmod from the supplied build date, not a hardcoded string', () => {
    const xml = buildSitemap({ lastmod: '2026-12-25' });
    expect(xml).toContain('<lastmod>2026-12-25</lastmod>');
    expect(xml).not.toContain('2026-10-05');
  });

  it('defaults lastmod to today when no date is supplied', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2027-04-01T00:00:00Z'));
    const xml = buildSitemap();
    const expected = new Date().toISOString().slice(0, 10);
    expect(xml).toContain('<lastmod>' + expected + '</lastmod>');
  });

  it('includes every configured language variant', () => {
    const xml = buildSitemap({ lastmod: '2026-10-05' });
    for (const lang of ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'es']) {
      expect(xml).toContain('hreflang="' + lang + '"');
    }
  });

  it('never emits an empty urlset', () => {
    const xml = buildSitemap({ lastmod: '2026-10-05' });
    expect(xml.match(/<url>/g)?.length).toBeGreaterThan(0);
  });

  it('exposes SITE_ORIGIN as the canonical origin', () => {
    expect(SITE_ORIGIN).toBe('https://sleep.nopress.net');
  });
});
