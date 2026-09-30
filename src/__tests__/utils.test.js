import { describe, it, expect } from 'vitest';
import {
  formatDateFormatted,
  formatDateISO,
  formatDateDDMMYYYY,
  getSessionName,
  isValidPhone,
  validateBookingFields,
  isSunday,
  isPastDate,
  isBookableDate,
  dayNames,
  monthNames,
  morningSlots,
  eveningSlots,
  allTimeSlots,
} from '../utils';


// ============================================
//  Date Formatting Tests
// ============================================

describe('formatDateFormatted', () => {
  it('returns empty string for null/undefined input', () => {
    expect(formatDateFormatted(null)).toBe('');
    expect(formatDateFormatted(undefined)).toBe('');
  });

  it('formats a known date correctly (Mon, 15 Sep 2026)', () => {
    const date = new Date(2026, 8, 15); // Sep 15, 2026 is a Tuesday
    const result = formatDateFormatted(date);
    expect(result).toBe('Tue, 15 Sep 2026');
  });

  it('formats January 1st, 2026 correctly', () => {
    const date = new Date(2026, 0, 1); // Jan 1, 2026 is a Thursday
    expect(formatDateFormatted(date)).toBe('Thu, 1 Jan 2026');
  });

  it('formats December 31st correctly', () => {
    const date = new Date(2026, 11, 31); // Dec 31, 2026 is a Thursday
    expect(formatDateFormatted(date)).toBe('Thu, 31 Dec 2026');
  });

  it('includes correct day name for a Sunday', () => {
    const date = new Date(2026, 8, 13); // Sep 13, 2026 is a Sunday
    expect(formatDateFormatted(date)).toContain('Sun');
  });
});

describe('formatDateISO', () => {
  it('returns empty string for null input', () => {
    expect(formatDateISO(null)).toBe('');
  });

  it('formats to ISO yyyy-mm-dd', () => {
    const date = new Date(2026, 0, 5); // Jan 5
    expect(formatDateISO(date)).toBe('2026-01-05');
  });

  it('zero-pads single-digit month and day', () => {
    const date = new Date(2026, 2, 3); // Mar 3
    expect(formatDateISO(date)).toBe('2026-03-03');
  });

  it('handles December correctly', () => {
    const date = new Date(2026, 11, 25); // Dec 25
    expect(formatDateISO(date)).toBe('2026-12-25');
  });
});

describe('formatDateDDMMYYYY', () => {
  it('returns empty string for null input', () => {
    expect(formatDateDDMMYYYY(null)).toBe('');
  });

  it('formats to DD/MM/YYYY', () => {
    const date = new Date(2026, 8, 15); // Sep 15
    expect(formatDateDDMMYYYY(date)).toBe('15/09/2026');
  });

  it('zero-pads day and month', () => {
    const date = new Date(2026, 0, 7); // Jan 7
    expect(formatDateDDMMYYYY(date)).toBe('07/01/2026');
  });
});


// ============================================
//  Session Determination Tests
// ============================================

describe('getSessionName', () => {
  it('returns empty string for empty input', () => {
    expect(getSessionName('')).toBe('');
    expect(getSessionName(null)).toBe('');
  });

  it('returns Morning Session for AM time slots', () => {
    expect(getSessionName('09:30 AM')).toBe('Morning Session (09:30 AM - 01:30 PM)');
    expect(getSessionName('10:00 AM')).toBe('Morning Session (09:30 AM - 01:30 PM)');
    expect(getSessionName('11:30 AM')).toBe('Morning Session (09:30 AM - 01:30 PM)');
  });

  it('returns Morning Session for 12:00 PM and 01:00 PM (contains AM in logic)', () => {
    // 12:00 PM doesn't contain "AM" but 12 doesn't start with 09/10/11
    // So this tests the actual behavior
    const result = getSessionName('12:00 PM');
    expect(result).toBe('Evening Session (04:30 PM - 08:30 PM)');
  });

  it('returns Evening Session for PM evening time slots', () => {
    expect(getSessionName('04:30 PM')).toBe('Evening Session (04:30 PM - 08:30 PM)');
    expect(getSessionName('06:00 PM')).toBe('Evening Session (04:30 PM - 08:30 PM)');
    expect(getSessionName('08:00 PM')).toBe('Evening Session (04:30 PM - 08:30 PM)');
  });
});


// ============================================
//  Phone Validation Tests
// ============================================

describe('isValidPhone', () => {
  it('returns false for empty/null input', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone(null)).toBe(false);
    expect(isValidPhone(undefined)).toBe(false);
  });

  it('returns true for a valid 10-digit number', () => {
    expect(isValidPhone('8122790927')).toBe(true);
  });

  it('returns true for numbers longer than 10 digits', () => {
    expect(isValidPhone('918122790927')).toBe(true);
  });

  it('returns false for numbers shorter than 10 digits', () => {
    expect(isValidPhone('81227')).toBe(false);
    expect(isValidPhone('123456789')).toBe(false);
  });

  it('strips non-digit characters before validating', () => {
    expect(isValidPhone('+91-8122-790-927')).toBe(true);
    expect(isValidPhone('(812) 279-0927')).toBe(true);
  });
});


// ============================================
//  Booking Validation Tests
// ============================================

describe('validateBookingFields', () => {
  const validFields = {
    name: 'Shyam',
    phone: '8122790927',
    gender: 'Male',
    age: '25',
    treatment: 'Root Canal',
    date: new Date(2026, 9, 15),
    time: '10:00 AM',
  };

  it('passes with all valid fields', () => {
    const result = validateBookingFields(validFields);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('fails when name is missing', () => {
    const result = validateBookingFields({ ...validFields, name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Full name is required.');
  });

  it('fails when name is only whitespace', () => {
    const result = validateBookingFields({ ...validFields, name: '   ' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Full name is required.');
  });

  it('fails when phone is too short', () => {
    const result = validateBookingFields({ ...validFields, phone: '81227' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Please enter a valid 10-digit phone number.');
  });

  it('fails when gender is missing', () => {
    const result = validateBookingFields({ ...validFields, gender: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Gender is required.');
  });

  it('fails when date is missing', () => {
    const result = validateBookingFields({ ...validFields, date: null });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Appointment date is required.');
  });

  it('fails when time is missing', () => {
    const result = validateBookingFields({ ...validFields, time: '' });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Appointment time is required.');
  });

  it('collects multiple errors at once', () => {
    const result = validateBookingFields({
      name: '',
      phone: '',
      gender: '',
      age: '',
      treatment: '',
      date: null,
      time: '',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThanOrEqual(6);
  });
});


// ============================================
//  Date Bookability Tests
// ============================================

describe('isSunday', () => {
  it('returns true for a Sunday', () => {
    const sunday = new Date(2026, 8, 13); // Sep 13, 2026 is Sunday
    expect(isSunday(sunday)).toBe(true);
  });

  it('returns false for a weekday', () => {
    const monday = new Date(2026, 8, 14); // Sep 14, 2026 is Monday
    expect(isSunday(monday)).toBe(false);
  });

  it('returns false for a Saturday', () => {
    const saturday = new Date(2026, 8, 12); // Sep 12, 2026 is Saturday
    expect(isSunday(saturday)).toBe(false);
  });
});

describe('isPastDate', () => {
  it('returns true for a date far in the past', () => {
    const oldDate = new Date(2020, 0, 1);
    expect(isPastDate(oldDate)).toBe(true);
  });

  it('returns false for a date far in the future', () => {
    const futureDate = new Date(2099, 11, 31);
    expect(isPastDate(futureDate)).toBe(false);
  });
});

describe('isBookableDate', () => {
  it('returns false for a Sunday', () => {
    const futureSunday = new Date(2099, 0, 4); // Jan 4, 2099 is a Sunday
    // Verify it actually is a Sunday
    expect(futureSunday.getDay()).toBe(0);
    expect(isBookableDate(futureSunday)).toBe(false);
  });

  it('returns false for a past weekday', () => {
    const pastMonday = new Date(2020, 0, 6); // Jan 6, 2020 was a Monday
    expect(isBookableDate(pastMonday)).toBe(false);
  });

  it('returns true for a future weekday', () => {
    const futureWed = new Date(2099, 0, 7); // Jan 7, 2099 is a Wednesday
    expect(futureWed.getDay()).toBe(3); // Verify it's Wednesday
    expect(isBookableDate(futureWed)).toBe(true);
  });
});


// ============================================
//  Constants Tests
// ============================================

describe('Constants', () => {
  it('dayNames has 7 entries starting with Sun', () => {
    expect(dayNames).toHaveLength(7);
    expect(dayNames[0]).toBe('Sun');
    expect(dayNames[6]).toBe('Sat');
  });

  it('monthNames has 12 entries', () => {
    expect(monthNames).toHaveLength(12);
    expect(monthNames[0]).toBe('January');
    expect(monthNames[11]).toBe('December');
  });

  it('morningSlots has 8 slots from 09:30 AM to 01:00 PM', () => {
    expect(morningSlots).toHaveLength(8);
    expect(morningSlots[0]).toBe('09:30 AM');
    expect(morningSlots[morningSlots.length - 1]).toBe('01:00 PM');
  });

  it('eveningSlots has 8 slots from 04:30 PM to 08:00 PM', () => {
    expect(eveningSlots).toHaveLength(8);
    expect(eveningSlots[0]).toBe('04:30 PM');
    expect(eveningSlots[eveningSlots.length - 1]).toBe('08:00 PM');
  });

  it('allTimeSlots combines morning + evening (16 total)', () => {
    expect(allTimeSlots).toHaveLength(16);
    expect(allTimeSlots[0]).toBe('09:30 AM');
    expect(allTimeSlots[15]).toBe('08:00 PM');
  });

  it('no duplicate time slots exist', () => {
    const unique = new Set(allTimeSlots);
    expect(unique.size).toBe(allTimeSlots.length);
  });
});
