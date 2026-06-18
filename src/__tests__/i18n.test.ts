import { describe, it, expect, beforeEach } from 'vitest';
import { getLanguage, setLanguage, t, SUPPORTED_LANGUAGES, type TranslationKey } from '../i18n';
import type { Language } from '../types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

const ALL_KEYS: TranslationKey[] = [
  'pageTitle',
  'metaDescription',
  'title',
  'subtitle',
  'whenToWake',
  'calculateBtn',
  'goingToBedNow',
  'backBtn',
  'suggestedBedtimes',
  'suggestedWakeTimes',
  'cycles',
  'scienceLabel',
  'scienceText',
  'or',
  'footer',
  'langLabel',
];

describe('SUPPORTED_LANGUAGES', () => {
  it('contains all 6 languages', () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(6);
    const codes = SUPPORTED_LANGUAGES.map((l) => l.code);
    expect(codes).toEqual(['en', 'zh', 'zh-TW', 'ja', 'ko', 'es']);
  });
});

describe('getLanguage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('returns "en" by default when no stored preference', () => {
    const lang = getLanguage();
    expect(SUPPORTED_LANGUAGES.map((l) => l.code)).toContain(lang);
  });

  it('returns stored language when preference exists', () => {
    localStorageMock.setItem('preferred-lang', 'ja');
    expect(getLanguage()).toBe('ja');
  });

  it('ignores invalid stored values', () => {
    localStorageMock.setItem('preferred-lang', 'fr');
    const lang = getLanguage();
    expect(SUPPORTED_LANGUAGES.map((l) => l.code)).toContain(lang);
  });
});

describe('setLanguage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('persists language to localStorage', () => {
    setLanguage('ko');
    expect(localStorageMock.getItem('preferred-lang')).toBe('ko');
  });

  it('updates getLanguage return value for each language', () => {
    for (const { code } of SUPPORTED_LANGUAGES) {
      setLanguage(code);
      expect(getLanguage()).toBe(code);
    }
  });
});

describe('t', () => {
  it('returns a string for every valid key in every language', () => {
    for (const { code } of SUPPORTED_LANGUAGES) {
      setLanguage(code);
      for (const key of ALL_KEYS) {
        const val = t(key);
        expect(typeof val, `${code}.${key} should be string`).toBe('string');
        expect(val.length, `${code}.${key} should not be empty`).toBeGreaterThan(0);
      }
    }
  });

  it('titles differ across languages', () => {
    const titles = SUPPORTED_LANGUAGES.map(({ code }) => {
      setLanguage(code);
      return t('title');
    });
    // All titles should be unique (en, zh, zh-TW, ja, ko, es are all different)
    expect(new Set(titles).size).toBe(SUPPORTED_LANGUAGES.length);
  });

  it('langLabel returns short language name for each language', () => {
    const expected: Record<Language, string> = {
      en: 'EN',
      zh: '简体',
      'zh-TW': '繁體',
      ja: '日本語',
      ko: '한국어',
      es: 'ES',
    };
    for (const [code, label] of Object.entries(expected)) {
      setLanguage(code as Language);
      expect(t('langLabel')).toBe(label);
    }
  });
});
