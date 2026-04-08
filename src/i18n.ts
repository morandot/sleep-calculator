export type TranslationKey = 
  | 'pageTitle' | 'metaDescription' | 'title' | 'whenToWake' | 'calculateBtn' | 'goingToBedNow' 
  | 'backBtn' | 'suggestedBedtimes' | 'suggestedWakeTimes' | 'cycles' | 'scienceLabel' 
  | 'scienceText' | 'or' | 'footer' | 'langLabel';

const translations: Record<'en' | 'zh', Record<TranslationKey, string>> = {
  en: {
    pageTitle: 'Sleep Calculator - Find Your Optimal Sleep Cycles',
    metaDescription: 'Calculate optimal bedtimes and wake times based on 90-minute sleep cycles.',
    title: 'Sleep Calculator',
    whenToWake: 'When to wake up?',
    calculateBtn: 'Calculate Bedtime',
    goingToBedNow: 'Going to bed now',
    backBtn: '← Back',
    suggestedBedtimes: 'Suggested Bedtimes',
    suggestedWakeTimes: 'Suggested Wake Times',
    cycles: 'cycles',
    scienceLabel: 'Science:',
    scienceText: 'Optimal rest is 5-6 cycles.',
    or: 'or',
    footer: '© NoPress',
    langLabel: 'Language'
  },
  zh: {
    pageTitle: '睡眠周期计算器 - 科学规划入睡与起床时间',
    metaDescription: '基于90分钟睡眠周期科学计算最佳入睡与起床时间。',
    title: '睡眠周期计算器',
    whenToWake: '什么时候起床？',
    calculateBtn: '计算最佳入睡时间',
    goingToBedNow: '现在就去睡觉',
    backBtn: '← 返回',
    suggestedBedtimes: '建议入睡时间',
    suggestedWakeTimes: '建议起床时间',
    cycles: '个周期',
    scienceLabel: '科学依据:',
    scienceText: '每个周期约90分钟，建议睡5-6个周期。',
    or: '或者',
    footer: '© NoPress',
    langLabel: '语言'
  }
};

export function getLanguage(): 'en' | 'zh' {
  const stored = localStorage.getItem('preferred-lang');
  if (stored === 'en' || stored === 'zh') return stored;
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('zh') ? 'zh' : 'en';
}

export function setLanguage(lang: 'en' | 'zh') {
  localStorage.setItem('preferred-lang', lang);
  updateDOMStrings();
}

export function t(key: TranslationKey): string {
  const lang = getLanguage();
  return translations[lang][key];
}

export function updateDOMStrings() {
  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.title = t('pageTitle');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'));

  const mapping: Record<string, TranslationKey> = {
    '#title-text': 'title',
    '#wake-label': 'whenToWake',
    '#calculateBtn': 'calculateBtn',
    '#nowSleepBtn-text': 'goingToBedNow',
    '#backBtn': 'backBtn',
    '#science-label': 'scienceLabel',
    '#science-text': 'scienceText',
    '#or-text': 'or',
    '#footer-link': 'footer',
    '#lang-label': 'langLabel'
  };

  Object.entries(mapping).forEach(([selector, key]) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = t(key);
  });

  document.querySelectorAll('[data-lang-check]').forEach(el => {
    const checkLang = (el as HTMLElement).dataset.langCheck;
    if (checkLang === lang) {
      el.classList.remove('opacity-0');
    } else {
      el.classList.add('opacity-0');
    }
  });
}
