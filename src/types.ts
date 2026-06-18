export type SleepTime = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
  cycles: number;
};

export type ViewMode = 'input' | 'result';
export type Language = 'en' | 'zh' | 'zh-TW' | 'ja' | 'ko' | 'es';
export type Theme = 'light' | 'dark';
export type TimeFormat = '12h' | '24h';
