import { getBedtimes, getWakeTimes, formatSleepTime, getHourOptions } from './sleep';
import { t } from './i18n';
import {
  getView,
  setView,
  subscribe,
  toggleTheme,
  switchLanguage,
  getCurrentLanguage,
} from './state';
import type { Language, SleepTime } from './types';

let isAnimating = false;
let lastRenderedMode: 'wake' | 'bed' = 'wake';

/**
 * Initialize the application: bind events, set up state subscriptions.
 */
export function initApp(): void {
  populateHourSelect();
  bindEvents();
  subscribe(render);
  render();
}

function populateHourSelect(): void {
  const select = document.getElementById('wakeHour') as HTMLSelectElement | null;
  if (!select) return;
  for (const { value, label } of getHourOptions()) {
    const option = document.createElement('option');
    option.value = String(value);
    option.textContent = label;
    select.appendChild(option);
  }
}

function bindEvents(): void {
  // Calculate bedtime button
  on('calculateBtn', 'click', (e) => {
    e.preventDefault();
    const hour = selectValue('wakeHour');
    const minute = selectValue('wakeMinute');
    const period = selectPeriod('wakePeriod');
    lastRenderedMode = 'bed';
    renderResults(getBedtimes(hour, minute, period), false);
    setView('result');
  });

  // Going to bed now button
  on('nowSleepBtn', 'click', () => {
    lastRenderedMode = 'wake';
    renderResults(getWakeTimes(new Date()), true);
    setView('result');
  });

  // Back button
  on('backBtn', 'click', () => {
    setView('input');
  });

  // Theme toggle
  on('theme-toggle', 'click', () => {
    toggleTheme();
  });

  // Language buttons
  document.querySelectorAll<HTMLElement>('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang as Language;
      switchLanguage(lang);
      closeLangMenu();
      // Re-render results if in result view (dynamic content)
      if (getView() === 'result') {
        renderResultsForCurrentMode();
      }
    });
  });

  // Language menu toggle
  on('lang-trigger', 'click', (e) => {
    e.stopPropagation();
    toggleLangMenu();
  });

  // Close language menu on outside click
  document.addEventListener('click', () => {
    closeLangMenu();
  });
}

function render(): void {
  updateViewVisibility();
  updateLangMenuState();
  updateThemeToggleIcon();
}

function updateViewVisibility(): void {
  const view = getView();
  const inputView = document.getElementById('input-view');
  const resultView = document.getElementById('result-view');
  if (!inputView || !resultView || isAnimating) return;

  isAnimating = true;

  const [outgoing, incoming] = view === 'input' ? [resultView, inputView] : [inputView, resultView];

  outgoing.classList.remove('view-visible');
  outgoing.classList.add('view-hidden');
  incoming.classList.remove('view-hidden');
  incoming.classList.add('view-visible');

  setTimeout(() => {
    isAnimating = false;
  }, 250);
}

function updateLangMenuState(): void {
  const lang = getCurrentLanguage();
  document.querySelectorAll<HTMLElement>('[data-lang-check]').forEach((el) => {
    const isActive = el.dataset.langCheck === lang;
    el.classList.toggle('opacity-0', !isActive);
  });
}

function updateThemeToggleIcon(): void {
  const sun = document.getElementById('sun-icon');
  const moon = document.getElementById('moon-icon');
  if (!sun || !moon) return;

  const isDark = document.documentElement.classList.contains('dark');
  sun.classList.toggle('hidden', isDark);
  moon.classList.toggle('hidden', !isDark);
}

function renderResults(times: SleepTime[], isWakeTime: boolean): void {
  const resultTitle = document.getElementById('resultTitle');
  const resultList = document.getElementById('resultList');
  if (!resultTitle || !resultList) return;

  const titleKey = isWakeTime ? 'suggestedWakeTimes' : 'suggestedBedtimes';
  resultTitle.textContent = t(titleKey);

  const borderColor = isWakeTime ? 'border-l-emerald-500' : 'border-l-violet-500';
  const cycleText = t('cycles');

  resultList.innerHTML = times
    .map(
      (st, i) => `
      <div class="result-bubble border-l-4 ${borderColor} stagger-item"
           style="animation-delay: ${i * 70}ms">
        <div class="result-time text-2xl font-semibold tabular-nums"
             style="color: var(--color-fg)">
          ${formatSleepTime(st)}
        </div>
        <div class="text-xs font-medium uppercase tracking-wider mt-1"
             style="color: var(--color-fg-muted)">
          ${st.cycles} ${cycleText}
        </div>
      </div>`,
    )
    .join('');

  resultList.scrollTop = 0;
}

function renderResultsForCurrentMode(): void {
  if (lastRenderedMode === 'wake') {
    renderResults(getWakeTimes(new Date()), true);
  } else {
    const hour = selectValue('wakeHour');
    const minute = selectValue('wakeMinute');
    const period = selectPeriod('wakePeriod');
    renderResults(getBedtimes(hour, minute, period), false);
  }
}

function toggleLangMenu(): void {
  const menu = document.getElementById('lang-menu');
  const chevron = document.getElementById('lang-chevron');
  if (!menu || !chevron) return;

  const isOpen = !menu.classList.contains('hidden');
  menu.classList.toggle('hidden', isOpen);
  chevron.style.transform = isOpen ? '' : 'rotate(180deg)';
}

function closeLangMenu(): void {
  const menu = document.getElementById('lang-menu');
  const chevron = document.getElementById('lang-chevron');
  menu?.classList.add('hidden');
  if (chevron) chevron.style.transform = '';
}

// Helpers

function on(id: string, event: string, handler: EventListener): void {
  document.getElementById(id)?.addEventListener(event, handler);
}

function selectValue(id: string): number {
  const el = document.getElementById(id) as HTMLSelectElement | null;
  return el ? parseInt(el.value, 10) : 0;
}

function selectPeriod(id: string): 'AM' | 'PM' {
  const el = document.getElementById(id) as HTMLSelectElement | null;
  return (el?.value as 'AM' | 'PM') ?? 'AM';
}
