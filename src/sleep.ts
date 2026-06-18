import type { SleepTime } from './types';

export const CYCLE_MINUTES = 90;
export const FALL_ASLEEP_MINUTES = 15;

const pad = (n: number): string => n.toString().padStart(2, '0');

export const to24Hour = (h: number, p: 'AM' | 'PM'): number => {
  if (p === 'AM') return h === 12 ? 0 : h;
  return h === 12 ? 12 : h + 12;
};

export const to12Hour = (h24: number): { hour: number; period: 'AM' | 'PM' } => ({
  hour: h24 % 12 || 12,
  period: h24 >= 12 ? 'PM' : 'AM',
});

/**
 * Calculate suggested bedtimes given a desired wake-up time.
 * Returns 4 options (6, 5, 4, 3 cycles) sorted by longest sleep first.
 */
export function getBedtimes(
  wakeHour: number,
  wakeMinute: number,
  wakePeriod: 'AM' | 'PM',
  now?: Date,
): SleepTime[] {
  const h24 = to24Hour(wakeHour, wakePeriod);
  const wakeDate = now ? new Date(now) : new Date();
  wakeDate.setHours(h24, wakeMinute, 0, 0);

  const results: SleepTime[] = [];
  for (let c = 6; c >= 3; c--) {
    const mins = c * CYCLE_MINUTES + FALL_ASLEEP_MINUTES;
    const bed = new Date(wakeDate.getTime() - mins * 60_000);
    const { hour, period } = to12Hour(bed.getHours());
    results.push({ hour, minute: bed.getMinutes(), period, cycles: c });
  }
  return results;
}

/**
 * Calculate suggested wake times if you go to sleep right now.
 * Returns 4 options (3, 4, 5, 6 cycles) sorted by shortest sleep first.
 */
export function getWakeTimes(now: Date): SleepTime[] {
  const start = new Date(now.getTime() + FALL_ASLEEP_MINUTES * 60_000);
  const results: SleepTime[] = [];
  for (let c = 3; c <= 6; c++) {
    const wake = new Date(start.getTime() + c * CYCLE_MINUTES * 60_000);
    const { hour, period } = to12Hour(wake.getHours());
    results.push({ hour, minute: wake.getMinutes(), period, cycles: c });
  }
  return results;
}

export const formatSleepTime = (st: SleepTime): string =>
  `${st.hour}:${pad(st.minute)} ${st.period}`;

/**
 * Generate hour options for 12-hour format (1-12).
 * Returns array of { value, label } for populating a select element.
 */
export function getHourOptions(): { value: number; label: string }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: String(i + 1),
  }));
}
