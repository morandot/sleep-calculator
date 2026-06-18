// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { Theme } from '../types';

// Mock localStorage (must be set before importing state.ts)
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock });

// Mock window.matchMedia (called by getInitialTheme)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock document.documentElement.classList
const classListMock = {
  contains: vi.fn().mockReturnValue(false),
  toggle: vi.fn(),
  add: vi.fn(),
  remove: vi.fn(),
};
Object.defineProperty(document.documentElement, 'classList', { value: classListMock });

// NOW import state.ts — safe because getInitialTheme is lazy
const {
  getView, setView, subscribe,
  getTheme, setTheme, toggleTheme, applyTheme,
  switchLanguage, getCurrentLanguage,
  getTimeFormat, setTimeFormat, toggleTimeFormat,
} = await import('../state');

describe('view state', () => {
  beforeEach(() => {
    setView('input');
  });

  it('getView returns input by default', () => {
    expect(getView()).toBe('input');
  });

  it('setView updates the return value of getView', () => {
    setView('result');
    expect(getView()).toBe('result');
  });

  it('setView with same value does not notify listeners', () => {
    const spy = vi.fn();
    subscribe(spy);
    setView('input'); // same as default
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('subscribe', () => {
  beforeEach(() => {
    setView('input');
  });

  it('returns an unsubscribe function', () => {
    const unsub = subscribe(() => {});
    expect(typeof unsub).toBe('function');
    unsub();
  });

  it('callback is called when setView fires', () => {
    const spy = vi.fn();
    subscribe(spy);
    setView('result');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('multiple subscribers are all notified', () => {
    const spy1 = vi.fn();
    const spy2 = vi.fn();
    subscribe(spy1);
    subscribe(spy2);
    setView('result');
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('unsubscribed callback is NOT called', () => {
    const spy = vi.fn();
    const unsub = subscribe(spy);
    unsub();
    setView('result');
    expect(spy).not.toHaveBeenCalled();
  });
});

describe('theme state', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.mocked(window.matchMedia).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  it('getTheme returns light by default when matchMedia says no dark preference', () => {
    const theme = getTheme();
    expect(theme).toBe('light');
  });

  it('toggleTheme flips light to dark', () => {
    setTheme('light');
    toggleTheme();
    expect(getTheme()).toBe('dark');
  });

  it('toggleTheme flips dark to light', () => {
    setTheme('dark');
    toggleTheme();
    expect(getTheme()).toBe('light');
  });

  it('setTheme persists to localStorage', () => {
    setTheme('dark');
    expect(localStorageMock.getItem('preferred-theme')).toBe('dark');
  });

  it('applyTheme toggles dark class on documentElement', () => {
    applyTheme('dark' as Theme);
    expect(classListMock.toggle).toHaveBeenCalledWith('dark', true);
  });

  it('applyTheme removes dark class when light', () => {
    applyTheme('light' as Theme);
    expect(classListMock.toggle).toHaveBeenCalledWith('dark', false);
  });
});

describe('language state', () => {
  it('getCurrentLanguage returns the current language', () => {
    const lang = getCurrentLanguage();
    expect(['en', 'zh', 'zh-TW', 'ja', 'ko', 'es']).toContain(lang);
  });

  it('switchLanguage notifies listeners', () => {
    const spy = vi.fn();
    subscribe(spy);
    switchLanguage('en');
    expect(spy).toHaveBeenCalled();
  });
});

describe('time format', () => {
  beforeEach(() => {
    localStorageMock.removeItem('preferred-time-format');
  });

  it('getTimeFormat returns "12h" by default when locale is not 24h', () => {
    expect(getTimeFormat()).toBe('12h');
  });

  it('setTimeFormat persists to localStorage', () => {
    setTimeFormat('24h');
    expect(localStorageMock.getItem('preferred-time-format')).toBe('24h');
    expect(getTimeFormat()).toBe('24h');
  });

  it('toggleTimeFormat flips between 12h and 24h', () => {
    setTimeFormat('12h');
    toggleTimeFormat();
    expect(getTimeFormat()).toBe('24h');
    toggleTimeFormat();
    expect(getTimeFormat()).toBe('12h');
  });

  it('setTimeFormat notifies subscribers', () => {
    const callback = vi.fn();
    subscribe(callback);
    setTimeFormat('24h');
    expect(callback).toHaveBeenCalled();
  });
});
