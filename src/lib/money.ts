/**
 * Money helpers. Always integer cents — never floats for CAD amounts.
 */

const CAD_AMOUNT = /^-?\$?\s*(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/;

/**
 * Parse a CAD dollar string into integer cents.
 * Returns null when the input is empty or not a valid money amount.
 */
export function parseCadToCents(input: string): number | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return null;
  }

  const normalized = trimmed.replace(/\s+/g, '');
  if (!CAD_AMOUNT.test(normalized)) {
    return null;
  }

  const negative = normalized.startsWith('-');
  const withoutSign = normalized.replace(/^-/, '').replace(/^\$/, '');
  const [dollarsPart, centsPart = ''] = withoutSign.replace(/,/g, '').split('.');

  if (centsPart.length > 2) {
    return null;
  }

  const dollars = Number.parseInt(dollarsPart, 10);
  const cents = Number.parseInt(centsPart.padEnd(2, '0') || '0', 10);
  if (!Number.isFinite(dollars) || !Number.isFinite(cents)) {
    return null;
  }

  const total = dollars * 100 + cents;
  return negative ? -total : total;
}

/** Format integer cents as a CAD dollar string, e.g. 1234 → "$12.34". */
export function formatCentsCad(amountCents: number): string {
  const negative = amountCents < 0;
  const absolute = Math.abs(amountCents);
  const dollars = Math.floor(absolute / 100);
  const cents = absolute % 100;
  const body = `$${dollars}.${cents.toString().padStart(2, '0')}`;
  return negative ? `-${body}` : body;
}
