// ============================================
// SDC Shared Utility Functions
// Extracted for testability and reuse
// ============================================

export const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Format a Date into a human-readable string.
 * e.g. "Mon, 15 Sep 2026"
 */
export function formatDateFormatted(d) {
  if (!d) return '';
  const dayName = dayNames[d.getDay()];
  const dayNum = d.getDate();
  const monthName = monthNames[d.getMonth()].slice(0, 3);
  const year = d.getFullYear();
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

/**
 * Format a Date into ISO format.
 * e.g. "2026-09-15"
 */
export function formatDateISO(d) {
  if (!d) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Format a Date into DD/MM/YYYY format.
 * e.g. "15/09/2026"
 */
export function formatDateDDMMYYYY(d) {
  if (!d) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${dd}/${mm}/${yyyy}`;
}

/**
 * Determine session name based on the selected time string.
 * Returns "Morning Session (09:30 AM - 01:30 PM)" or "Evening Session (04:30 PM - 08:30 PM)"
 */
export function getSessionName(timeStr) {
  if (!timeStr) return '';
  const isMorning =
    timeStr.includes('AM') ||
    timeStr.startsWith('09') ||
    timeStr.startsWith('10') ||
    timeStr.startsWith('11');
  return isMorning
    ? 'Morning Session (09:30 AM - 01:30 PM)'
    : 'Evening Session (04:30 PM - 08:30 PM)';
}

/**
 * Validate a phone number (must be at least 10 digits).
 */
export function isValidPhone(phone) {
  if (!phone) return false;
  return phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate that all required booking fields are filled.
 */
export function validateBookingFields({ name, phone, gender, age, treatment, date, time }) {
  const errors = [];

  if (!name || !name.trim()) errors.push('Full name is required.');
  if (!phone) errors.push('Phone number is required.');
  else if (!isValidPhone(phone)) errors.push('Please enter a valid 10-digit phone number.');
  if (!gender) errors.push('Gender is required.');
  if (!age) errors.push('Age is required.');
  if (!treatment) errors.push('Treatment type is required.');
  if (!date) errors.push('Appointment date is required.');
  if (!time) errors.push('Appointment time is required.');

  return { valid: errors.length === 0, errors };
}

/**
 * Check if a date is a Sunday.
 */
export function isSunday(date) {
  return date.getDay() === 0;
}

/**
 * Check if a date is in the past (before today).
 */
export function isPastDate(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return target < today;
}

/**
 * Check if a date is bookable (not Sunday, not in the past).
 */
export function isBookableDate(date) {
  return !isSunday(date) && !isPastDate(date);
}

/**
 * Get available morning time slots.
 */
export const morningSlots = [
  '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM',
  '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'
];

/**
 * Get available evening time slots.
 */
export const eveningSlots = [
  '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM',
  '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
];

/**
 * Get all valid time slots.
 */
export const allTimeSlots = [...morningSlots, ...eveningSlots];
