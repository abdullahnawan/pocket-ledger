import { formatCentsCad, parseCadToCents } from '@/lib/money';

describe('parseCadToCents', () => {
  it('parses a normal dollar amount into integer cents', () => {
    expect(parseCadToCents('12.34')).toBe(1234);
  });

  it('parses whole dollars', () => {
    expect(parseCadToCents('7')).toBe(700);
  });

  it('parses amounts with a dollar sign and spaces', () => {
    expect(parseCadToCents(' $1,234.56 ')).toBe(123456);
  });

  it('parses a leading minus as a negative cent amount', () => {
    expect(parseCadToCents('-3.50')).toBe(-350);
  });

  it('rejects empty and non-numeric input', () => {
    expect(parseCadToCents('')).toBeNull();
    expect(parseCadToCents('abc')).toBeNull();
  });

  it('rejects more than two decimal places', () => {
    expect(parseCadToCents('1.234')).toBeNull();
  });
});

describe('formatCentsCad', () => {
  it('formats positive cents as a CAD dollar string', () => {
    expect(formatCentsCad(1234)).toBe('$12.34');
  });

  it('formats zero and negative amounts', () => {
    expect(formatCentsCad(0)).toBe('$0.00');
    expect(formatCentsCad(-350)).toBe('-$3.50');
  });
});
