import type { Language } from './types';

export type TranslationKey =
  | 'pageTitle'
  | 'metaDescription'
  | 'title'
  | 'subtitle'
  | 'whenToWake'
  | 'calculateBtn'
  | 'goingToBedNow'
  | 'backBtn'
  | 'suggestedBedtimes'
  | 'suggestedWakeTimes'
  | 'cycles'
  | 'scienceLabel'
  | 'scienceText'
  | 'or'
  | 'footer'
  | 'langLabel';

export const SUPPORTED_LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'es', label: 'Español' },
];

const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    pageTitle: 'Sleep Calculator - Find Your Optimal Sleep Cycles',
    metaDescription: 'Calculate optimal bedtimes and wake times based on 90-minute sleep cycles.',
    title: 'Sleep Calculator',
    subtitle: 'Wake up refreshed by aligning with your natural sleep cycles',
    whenToWake: 'When do you want to wake up?',
    calculateBtn: 'Calculate Bedtime',
    goingToBedNow: 'Going to Bed Now',
    backBtn: 'Back',
    suggestedBedtimes: 'Suggested Bedtimes',
    suggestedWakeTimes: 'Suggested Wake Times',
    cycles: 'cycles',
    scienceLabel: 'Science',
    scienceText:
      'Each sleep cycle lasts about 90 minutes. Waking at the end of a cycle helps you feel more refreshed. Most adults need 5-6 cycles (7.5-9 hours).',
    or: 'or',
    footer: 'NoPress',
    langLabel: 'EN',
  },
  zh: {
    pageTitle: '睡眠周期计算器 - 科学规划入睡与起床时间',
    metaDescription: '基于90分钟睡眠周期科学计算最佳入睡与起床时间。',
    title: '睡眠周期计算器',
    subtitle: '通过匹配自然睡眠周期，在最佳时刻醒来',
    whenToWake: '你想几点起床？',
    calculateBtn: '计算入睡时间',
    goingToBedNow: '现在去睡觉',
    backBtn: '返回',
    suggestedBedtimes: '建议入睡时间',
    suggestedWakeTimes: '建议起床时间',
    cycles: '个周期',
    scienceLabel: '科学依据',
    scienceText:
      '每个睡眠周期约90分钟。在周期结束时醒来感觉更清醒。大多数成年人需要5-6个周期（7.5-9小时）。',
    or: '或',
    footer: 'NoPress',
    langLabel: '简体',
  },
  'zh-TW': {
    pageTitle: '睡眠週期計算器 - 科學規劃入睡與起床時間',
    metaDescription: '基於90分鐘睡眠週期科學計算最佳入睡與起床時間。',
    title: '睡眠週期計算器',
    subtitle: '透過匹配自然睡眠週期，在最佳時刻醒來',
    whenToWake: '你想幾點起床？',
    calculateBtn: '計算入睡時間',
    goingToBedNow: '現在去睡覺',
    backBtn: '返回',
    suggestedBedtimes: '建議入睡時間',
    suggestedWakeTimes: '建議起床時間',
    cycles: '個週期',
    scienceLabel: '科學依據',
    scienceText:
      '每個睡眠週期約90分鐘。在週期結束時醒來感覺更清醒。大多數成年人需要5-6個週期（7.5-9小時）。',
    or: '或',
    footer: 'NoPress',
    langLabel: '繁體',
  },
  ja: {
    pageTitle: '睡眠サイクル計算機 - 最適な睡眠時間を科学的に計算',
    metaDescription: '90分の睡眠サイクルに基づいて、最適な就寝・起床時間を計算します。',
    title: '睡眠サイクル計算機',
    subtitle: '自然な睡眠サイクルに合わせて、すっきり目覚めましょう',
    whenToWake: '何時に起きますか？',
    calculateBtn: '就寝時間を計算',
    goingToBedNow: 'もうすぐ寝る',
    backBtn: '戻る',
    suggestedBedtimes: 'おすすめの就寝時間',
    suggestedWakeTimes: 'おすすめの起床時間',
    cycles: 'サイクル',
    scienceLabel: '科学的根拠',
    scienceText:
      '睡眠サイクルは約90分です。サイクルの終わりに目覚めるとよりすっきりします。成人の大半は5-6サイクル（7.5-9時間）が必要です。',
    or: 'または',
    footer: 'NoPress',
    langLabel: '日本語',
  },
  ko: {
    pageTitle: '수면 사이클 계산기 - 최적의 수면 시간을 과학적으로 계산',
    metaDescription: '90분 수면 사이클을 기반으로 최적의 취침 및 기상 시간을 계산합니다.',
    title: '수면 사이클 계산기',
    subtitle: '자연스러운 수면 사이클에 맞춰 상쾌하게 일어나세요',
    whenToWake: '몇 시에 일어나시나요?',
    calculateBtn: '취침 시간 계산',
    goingToBedNow: '지금 잘 준비',
    backBtn: '뒤로',
    suggestedBedtimes: '추천 취침 시간',
    suggestedWakeTimes: '추천 기상 시간',
    cycles: '사이클',
    scienceLabel: '과학적 근거',
    scienceText:
      '수면 사이클은 약 90분입니다. 사이클이 끝날 때 깨면 더 상쾌합니다. 대부분의 성인은 5-6 사이클(7.5-9시간)이 필요합니다.',
    or: '또는',
    footer: 'NoPress',
    langLabel: '한국어',
  },
  es: {
    pageTitle: 'Calculadora de Sueño - Encuentra tus Ciclos de Sueño Óptimos',
    metaDescription:
      'Calcula los mejores horarios para dormir y despertar basados en ciclos de sueño de 90 minutos.',
    title: 'Calculadora de Sueño',
    subtitle: 'Despierta renovado alineándote con tus ciclos naturales de sueño',
    whenToWake: '¿A qué hora quieres despertar?',
    calculateBtn: 'Calcular hora de dormir',
    goingToBedNow: 'Voy a dormir ahora',
    backBtn: 'Volver',
    suggestedBedtimes: 'Horarios sugeridos para dormir',
    suggestedWakeTimes: 'Horarios sugeridos para despertar',
    cycles: 'ciclos',
    scienceLabel: 'Ciencia',
    scienceText:
      'Cada ciclo de sueño dura unos 90 minutos. Despertar al final de un ciclo te ayuda a sentirte más renovado. La mayoría de adultos necesitan 5-6 ciclos (7.5-9 horas).',
    or: 'o',
    footer: 'NoPress',
    langLabel: 'ES',
  },
};

export function getLanguage(): Language {
  const stored = localStorage.getItem('preferred-lang');
  if (stored && isSupportedLanguage(stored)) return stored;
  return detectLanguage();
}

function isSupportedLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.some((l) => l.code === value);
}

function detectLanguage(): Language {
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('zh-tw') || lang.startsWith('zh-hant')) return 'zh-TW';
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ja')) return 'ja';
  if (lang.startsWith('ko')) return 'ko';
  if (lang.startsWith('es')) return 'es';
  return 'en';
}

export function setLanguage(lang: Language): void {
  localStorage.setItem('preferred-lang', lang);
}

export function t(key: TranslationKey): string {
  return translations[getLanguage()][key];
}

/**
 * Update all static DOM strings marked with data-i18n attribute.
 */
export function updateDOMStrings(): void {
  const lang = getLanguage();
  document.documentElement.lang = lang;
  document.title = t('pageTitle');

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'));

  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n as TranslationKey;
    if (key && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}
