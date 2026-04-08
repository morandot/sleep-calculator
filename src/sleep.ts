export type SleepTime = {
  hour: number;
  minute: number;
  period: 'AM' | 'PM';
  cycles: number;
};

export const CYCLE_MINUTES = 90;
export const FALL_ASLEEP_MINUTES = 15;

const pad = (n: number) => n.toString().padStart(2, '0');

export const to24Hour = (h: number, p: 'AM' | 'PM'): number => {
  if (p === 'AM') return h === 12 ? 0 : h;
  return h === 12 ? 12 : h + 12;
};

export const to12Hour = (h24: number): { hour: number; period: 'AM' | 'PM' } => ({
  hour: h24 % 12 || 12,
  period: h24 >= 12 ? 'PM' : 'AM'
});

export function getBedtimes(wakeHour: number, wakeMinute: number, wakePeriod: 'AM' | 'PM'): SleepTime[] {
  const h24 = to24Hour(wakeHour, wakePeriod);
  const wakeDate = new Date();
  wakeDate.setHours(h24, wakeMinute, 0, 0);

  const results: SleepTime[] = [];
  for (let c = 6; c >= 3; c--) {
    const mins = c * CYCLE_MINUTES + FALL_ASLEEP_MINUTES;
    const bed = new Date(wakeDate.getTime() - mins * 60000);
    const { hour, period } = to12Hour(bed.getHours());
    results.push({ hour, minute: bed.getMinutes(), period, cycles: c });
  }
  return results;
}

export function getWakeTimes(now: Date): SleepTime[] {
  const start = new Date(now.getTime() + FALL_ASLEEP_MINUTES * 60000);
  const results: SleepTime[] = [];
  for (let c = 3; c <= 6; c++) {
    const wake = new Date(start.getTime() + c * CYCLE_MINUTES * 60000);
    const { hour, period } = to12Hour(wake.getHours());
    results.push({ hour, minute: wake.getMinutes(), period, cycles: c });
  }
  return results;
}

export const formatSleepTime = (st: SleepTime): string => {
  return `${st.hour}:${pad(st.minute)} ${st.period}`;
};
