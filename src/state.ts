import type { ViewMode, Theme, TimeFormat } from './types';
import { getLanguage, setLanguage, updateDOMStrings } from './i18n';
import type { Language } from './types';

type Listener = () => void;

const listeners: Set<Listener> = new Set();

let currentView: ViewMode = 'input';
let currentTheme: Theme | null = null;
let currentTimeFormat: TimeFormat | null = null;

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('preferred-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTimeFormat(): TimeFormat {
  const stored = localStorage.getItem('preferred-time-format');
  if (stored === '12h' || stored === '24h') return stored;
  // Auto-detect from locale
  try {
    const hourCycle = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions()
      .hourCycle;
    if (hourCycle === 'h23' || hourCycle === 'h24') return '24h';
  } catch {
    // Intl not available — fall back to 12h
  }
  return '12h';
}

function ensureTheme(): Theme {
  if (currentTheme === null) {
    currentTheme = getInitialTheme();
  }
  return currentTheme;
}

function ensureTimeFormat(): TimeFormat {
  if (currentTimeFormat === null) {
    currentTimeFormat = getInitialTimeFormat();
  }
  return currentTimeFormat;
}

function notify(): void {
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getView(): ViewMode {
  return currentView;
}

export function setView(view: ViewMode): void {
  if (currentView === view) return;
  currentView = view;
  notify();
}

export function getTheme(): Theme {
  return ensureTheme();
}

export function setTheme(theme: Theme): void {
  currentTheme = theme;
  localStorage.setItem('preferred-theme', theme);
  applyTheme(theme);
  notify();
}

export function toggleTheme(): void {
  setTheme(ensureTheme() === 'dark' ? 'light' : 'dark');
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

export function switchLanguage(lang: Language): void {
  setLanguage(lang);
  updateDOMStrings();
  notify();
}

export function getCurrentLanguage(): Language {
  return getLanguage();
}

/**
 * Initialize theme on page load (call before DOM visible).
 */
export function initTheme(): void {
  applyTheme(ensureTheme());
}

export function getTimeFormat(): TimeFormat {
  return ensureTimeFormat();
}

export function setTimeFormat(format: TimeFormat): void {
  currentTimeFormat = format;
  localStorage.setItem('preferred-time-format', format);
  notify();
}

export function toggleTimeFormat(): void {
  setTimeFormat(ensureTimeFormat() === '12h' ? '24h' : '12h');
}
