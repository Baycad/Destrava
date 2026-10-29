import { formatLongDate, getGreeting } from '../date';

const at = (hour, minute = 0) => new Date(2026, 9, 29, hour, minute);

describe('getGreeting', () => {
  test.each([
    [0, 0, 'Boa noite'],
    [4, 59, 'Boa noite'],
    [5, 0, 'Bom dia'],
    [11, 59, 'Bom dia'],
    [12, 0, 'Boa tarde'],
    [17, 59, 'Boa tarde'],
    [18, 0, 'Boa noite'],
    [23, 59, 'Boa noite'],
  ])('%i:%i → %s', (hour, minute, expected) => {
    expect(getGreeting(at(hour, minute))).toBe(expected);
  });
});

describe('formatLongDate', () => {
  test('data por extenso com a primeira letra maiúscula', () => {
    expect(formatLongDate(new Date(2026, 9, 29))).toBe('Quinta-feira, 29 de outubro');
    expect(formatLongDate(new Date(2026, 2, 1))).toBe('Domingo, 1 de março');
    expect(formatLongDate(new Date(2026, 9, 31))).toBe('Sábado, 31 de outubro');
  });
});
