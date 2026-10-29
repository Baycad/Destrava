import { pluralize } from '../format';

describe('pluralize', () => {
  test('usa singular só para 1', () => {
    expect(pluralize(0, 'passo feito', 'passos feitos')).toBe('0 passos feitos');
    expect(pluralize(1, 'passo feito', 'passos feitos')).toBe('1 passo feito');
    expect(pluralize(2, 'sessão de foco', 'sessões de foco')).toBe('2 sessões de foco');
  });
});
