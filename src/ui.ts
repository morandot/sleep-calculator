import { getBedtimes, getWakeTimes, formatSleepTime, SleepTime } from './sleep';
import { t, setLanguage } from './i18n';

export function initUI() {
  const hourSelect = document.getElementById('wakeHour') as HTMLSelectElement;
  const minuteSelect = document.getElementById('wakeMinute') as HTMLSelectElement;
  const periodSelect = document.getElementById('wakePeriod') as HTMLSelectElement;
  const calculateBtn = document.getElementById('calculateBtn') as HTMLButtonElement;
  const nowSleepBtn = document.getElementById('nowSleepBtn') as HTMLButtonElement;
  const backBtn = document.getElementById('backBtn') as HTMLButtonElement;
  const inputView = document.getElementById('input-view') as HTMLDivElement;
  const resultView = document.getElementById('result-view') as HTMLDivElement;
  const resultList = document.getElementById('resultList') as HTMLDivElement;
  const resultTitle = document.getElementById('resultTitle') as HTMLDivElement;

  const langTrigger = document.getElementById('lang-trigger') as HTMLButtonElement;
  const langMenu = document.getElementById('lang-menu') as HTMLDivElement;
  const langChevron = document.getElementById('lang-chevron') as unknown as SVGSVGElement;
  const langOptions = document.querySelectorAll('[data-lang-opt]');

  let isAnimating = false;

  langTrigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = langMenu.classList.toggle('hidden');
    if (!isHidden) {
      langChevron.classList.add('rotate-180');
    } else {
      langChevron.classList.remove('rotate-180');
    }
  });

  window.addEventListener('click', () => {
    langMenu?.classList.add('hidden');
    langChevron?.classList.remove('rotate-180');
  });

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const val = (e.currentTarget as HTMLElement).dataset.langOpt as 'en' | 'zh';
      setLanguage(val);
      langMenu.classList.add('hidden');
      langChevron.classList.remove('rotate-180');
      if (resultView.classList.contains('view-visible')) {
        const isWake = resultTitle.dataset.mode === 'wake';
        updateResultTitle(isWake);
      }
    });
  });

  if (hourSelect) {
    for (let i = 1; i <= 12; i++) {
      const opt = document.createElement('option');
      opt.value = i.toString();
      opt.textContent = i.toString().padStart(2, '0');
      if (i === 7) opt.selected = true;
      hourSelect.appendChild(opt);
    }
  }

  function switchView(toView: 'input' | 'result') {
    if (isAnimating) return;
    isAnimating = true;
    const outgoing = toView === 'input' ? resultView : inputView;
    const incoming = toView === 'input' ? inputView : resultView;
    outgoing.classList.remove('view-visible');
    outgoing.classList.add('view-hidden');
    incoming.classList.remove('view-hidden');
    incoming.classList.add('view-visible');
    setTimeout(() => { isAnimating = false; }, 300);
  }

  function updateResultTitle(isWakeTime: boolean) {
    const titleKey = isWakeTime ? 'suggestedWakeTimes' : 'suggestedBedtimes';
    resultTitle.dataset.mode = isWakeTime ? 'wake' : 'bed';
    resultTitle.innerHTML = `<span class="text-slate-100 uppercase tracking-widest text-xl font-black text-center w-full block">${t(titleKey)}</span>`;
  }

  function renderResults(times: SleepTime[], isWakeTime: boolean) {
    updateResultTitle(isWakeTime);
    const borderColor = isWakeTime ? 'border-l-emerald-500' : 'border-l-indigo-500';
    const cycleText = t('cycles');
    resultList.innerHTML = times.map((t, index) => `
      <div class="glass-bubble border-l-4 ${borderColor} rounded-2xl p-4 stagger-item" style="animation-delay: ${index * 80}ms">
        <div class="text-2xl font-black text-slate-100 tabular-nums">${formatSleepTime(t)}</div>
        <div class="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mt-1">${t.cycles} ${cycleText}</div>
      </div>
    `).join('');
    resultList.scrollTop = 0;
    switchView('result');
  }

  calculateBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const h = parseInt(hourSelect.value);
    const m = parseInt(minuteSelect.value);
    const p = periodSelect.value as 'AM' | 'PM';
    renderResults(getBedtimes(h, m, p), false);
  });

  nowSleepBtn?.addEventListener('click', () => {
    renderResults(getWakeTimes(new Date()), true);
  });

  backBtn?.addEventListener('click', () => {
    switchView('input');
  });
}
