import { describe, it, expect } from 'vitest';
import {
  to24Hour,
  to12Hour,
  getBedtimes,
  getWakeTimes,
  formatSleepTime,
  getHourOptions,
  CYCLE_MINUTES,
  FALL_ASLEEP_MINUTES,
} from '../sleep';

describe('to24Hour', () => {
  it('converts 12 AM to 0', () => {
    expect(to24Hour(12, 'AM')).toBe(0);
  });

  it('converts 1 AM to 1', () => {
    expect(to24Hour(1, 'AM')).toBe(1);
  });

  it('converts 12 PM to 12', () => {
    expect(to24Hour(12, 'PM')).toBe(12);
  });

  it('converts 1 PM to 13', () => {
    expect(to24Hour(1, 'PM')).toBe(13);
  });

  it('converts 11 PM to 23', () => {
    expect(to24Hour(11, 'PM')).toBe(23);
  });
});

describe('to12Hour', () => {
  it('converts 0 to 12 AM', () => {
    expect(to12Hour(0)).toEqual({ hour: 12, period: 'AM' });
  });

  it('converts 1 to 1 AM', () => {
    expect(to12Hour(1)).toEqual({ hour: 1, period: 'AM' });
  });

  it('converts 12 to 12 PM', () => {
    expect(to12Hour(12)).toEqual({ hour: 12, period: 'PM' });
  });

  it('converts 13 to 1 PM', () => {
    expect(to12Hour(13)).toEqual({ hour: 1, period: 'PM' });
  });

  it('converts 23 to 11 PM', () => {
    expect(to12Hour(23)).toEqual({ hour: 11, period: 'PM' });
  });

  it('roundtrips with to24Hour for all hours', () => {
    for (let h = 0; h < 24; h++) {
      const { hour, period } = to12Hour(h);
      expect(to24Hour(hour, period)).toBe(h);
    }
  });
});

describe('getBedtimes', () => {
  it('returns 4 results (3-6 cycles)', () => {
    const results = getBedtimes(7, 0, 'AM');
    expect(results).toHaveLength(4);
  });

  it('results are sorted by cycles descending (6, 5, 4, 3)', () => {
    const results = getBedtimes(7, 0, 'AM');
    expect(results[0].cycles).toBe(6);
    expect(results[1].cycles).toBe(5);
    expect(results[2].cycles).toBe(4);
    expect(results[3].cycles).toBe(3);
  });

  it('calculates correct bedtime for 6 cycles from 7:00 AM', () => {
    // 6 * 90 + 15 = 555 minutes = 9h15m before 7:00 AM = 9:45 PM previous day
    const results = getBedtimes(7, 0, 'AM');
    const six = results[0];
    expect(six.hour).toBe(9);
    expect(six.minute).toBe(45);
    expect(six.period).toBe('PM');
  });

  it('calculates correct bedtime for 3 cycles from 7:00 AM', () => {
    // 3 * 90 + 15 = 285 minutes = 4h45m before 7:00 AM = 2:15 AM
    const results = getBedtimes(7, 0, 'AM');
    const three = results[3];
    expect(three.hour).toBe(2);
    expect(three.minute).toBe(15);
    expect(three.period).toBe('AM');
  });

  it('handles midnight crossing for PM wake time', () => {
    // 11:30 PM wake, 3 cycles: 3*90+15 = 285 min before = 6:45 PM
    const results = getBedtimes(11, 30, 'PM');
    const three = results[3];
    expect(three.hour).toBe(6);
    expect(three.minute).toBe(45);
    expect(three.period).toBe('PM');
  });

  it('each result has valid SleepTime shape', () => {
    const results = getBedtimes(8, 15, 'AM');
    for (const r of results) {
      expect(r.hour).toBeGreaterThanOrEqual(1);
      expect(r.hour).toBeLessThanOrEqual(12);
      expect(r.minute).toBeGreaterThanOrEqual(0);
      expect(r.minute).toBeLessThan(60);
      expect(['AM', 'PM']).toContain(r.period);
      expect(r.cycles).toBeGreaterThanOrEqual(3);
      expect(r.cycles).toBeLessThanOrEqual(6);
    }
  });
});

describe('getBedtimes determinism', () => {
  it('produces the same results regardless of system clock', () => {
    const fixedNow = new Date(2024, 0, 15, 10, 0); // Jan 15, 2024, 10:00 AM
    const results1 = getBedtimes(7, 0, 'AM', fixedNow);
    const results2 = getBedtimes(7, 0, 'AM', fixedNow);
    expect(results1).toEqual(results2);
  });

  it('uses current date when now is not provided', () => {
    const results = getBedtimes(7, 0, 'AM');
    expect(results).toHaveLength(4);
    expect(results[0].cycles).toBe(6);
  });

  it('produces correct results for a known fixed date', () => {
    const fixedNow = new Date(2024, 0, 15, 10, 0); // Jan 15, 2024, 10:00 AM
    const results = getBedtimes(7, 0, 'AM', fixedNow);
    const six = results[0];
    // 6 * 90 + 15 = 555 min before 7:00 AM = 9:45 PM
    expect(six.hour).toBe(9);
    expect(six.minute).toBe(45);
    expect(six.period).toBe('PM');
  });
});

describe('getWakeTimes', () => {
  it('returns 4 results (3-6 cycles)', () => {
    const now = new Date(2024, 0, 1, 23, 0); // 11:00 PM
    const results = getWakeTimes(now);
    expect(results).toHaveLength(4);
  });

  it('results are sorted by cycles ascending (3, 4, 5, 6)', () => {
    const now = new Date(2024, 0, 1, 23, 0);
    const results = getWakeTimes(now);
    expect(results[0].cycles).toBe(3);
    expect(results[1].cycles).toBe(4);
    expect(results[2].cycles).toBe(5);
    expect(results[3].cycles).toBe(6);
  });

  it('calculates correct wake time for 3 cycles from 11:00 PM', () => {
    // 15 min fall asleep + 3*90 = 285 min = 4h45m after 11:00 PM = 3:45 AM
    const now = new Date(2024, 0, 1, 23, 0);
    const results = getWakeTimes(now);
    const three = results[0];
    expect(three.hour).toBe(3);
    expect(three.minute).toBe(45);
    expect(three.period).toBe('AM');
  });

  it('calculates correct wake time for 6 cycles from 11:00 PM', () => {
    // 15 + 6*90 = 555 min = 9h15m after 11:00 PM = 8:15 AM
    const now = new Date(2024, 0, 1, 23, 0);
    const results = getWakeTimes(now);
    const six = results[3];
    expect(six.hour).toBe(8);
    expect(six.minute).toBe(15);
    expect(six.period).toBe('AM');
  });

  it('handles minutes correctly', () => {
    // 11:37 PM + 15 min fall asleep = 11:52 PM; 3 cycles (270 min) later = 4:22 AM
    const now = new Date(2024, 0, 1, 23, 37);
    const results = getWakeTimes(now);
    const three = results[0];
    expect(three.hour).toBe(4);
    expect(three.minute).toBe(22);
    expect(three.period).toBe('AM');
  });

  it('each result has valid SleepTime shape', () => {
    const now = new Date(2024, 0, 1, 22, 30);
    const results = getWakeTimes(now);
    for (const r of results) {
      expect(r.hour).toBeGreaterThanOrEqual(1);
      expect(r.hour).toBeLessThanOrEqual(12);
      expect(r.minute).toBeGreaterThanOrEqual(0);
      expect(r.minute).toBeLessThan(60);
      expect(['AM', 'PM']).toContain(r.period);
    }
  });
});

describe('formatSleepTime', () => {
  it('formats time with padded minutes', () => {
    expect(formatSleepTime({ hour: 7, minute: 0, period: 'AM', cycles: 5 })).toBe('7:00 AM');
  });

  it('formats time with non-zero minutes', () => {
    expect(formatSleepTime({ hour: 11, minute: 45, period: 'PM', cycles: 6 })).toBe('11:45 PM');
  });

  it('pads single-digit minutes', () => {
    expect(formatSleepTime({ hour: 3, minute: 5, period: 'AM', cycles: 3 })).toBe('3:05 AM');
  });
});

describe('constants', () => {
  it('CYCLE_MINUTES is 90', () => {
    expect(CYCLE_MINUTES).toBe(90);
  });

  it('FALL_ASLEEP_MINUTES is 15', () => {
    expect(FALL_ASLEEP_MINUTES).toBe(15);
  });
});

describe('getHourOptions', () => {
  it('returns 12 options (1-12)', () => {
    const options = getHourOptions();
    expect(options).toHaveLength(12);
  });

  it('first option is 1, last is 12', () => {
    const options = getHourOptions();
    expect(options[0]).toEqual({ value: 1, label: '1' });
    expect(options[11]).toEqual({ value: 12, label: '12' });
  });

  it('all values are sequential 1-12', () => {
    const options = getHourOptions();
    const values = options.map((o) => o.value);
    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
});
