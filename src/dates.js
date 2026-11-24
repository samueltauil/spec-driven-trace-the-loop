export function dateOnly(value, name = 'date') {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new TypeError(`${name} must be a YYYY-MM-DD date`);
  }
  const date = new Date(`${value}T00:00:00Z`);
  if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new TypeError(`${name} must be a valid calendar date`);
  }
  return date;
}

export function daysBetween(start, end) {
  return (dateOnly(end) - dateOnly(start)) / 86_400_000;
}
