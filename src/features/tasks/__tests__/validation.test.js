import {
  NOTES_MAX_LENGTH,
  STEP_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  hasErrors,
  validateStepTitle,
  validateTaskFields,
} from '../validation';

describe('validateTaskFields', () => {
  test('limites: título com 100 e observação com 500 caracteres', () => {
    expect(TITLE_MAX_LENGTH).toBe(100);
    expect(NOTES_MAX_LENGTH).toBe(500);
  });

  test('título vazio pede para escrever um título', () => {
    expect(validateTaskFields({ title: '' }).title).toBe('Escreva um título para a tarefa.');
  });

  test('título só com espaços e tabulação conta como vazio', () => {
    expect(validateTaskFields({ title: '  \t ' }).title).toBe('Escreva um título para a tarefa.');
  });

  test('título com 100 caracteres é válido; com 101, não', () => {
    expect(validateTaskFields({ title: 'a'.repeat(100) }).title).toBeUndefined();
    expect(validateTaskFields({ title: 'a'.repeat(101) }).title).toBe(
      'Use até 100 caracteres no título.'
    );
  });

  test('observação com 500 caracteres é válida; com 501, não', () => {
    expect(validateTaskFields({ title: 'ok', notes: 'x'.repeat(500) }).notes).toBeUndefined();
    expect(validateTaskFields({ title: 'ok', notes: 'x'.repeat(501) }).notes).toBe(
      'Use até 500 caracteres na observação.'
    );
  });

  test('campos válidos não geram erro', () => {
    expect(validateTaskFields({ title: 'Estudar para a prova', notes: 'cap. 3' })).toEqual({});
  });
});

describe('hasErrors', () => {
  test('identifica quando há ou não há erros', () => {
    expect(hasErrors({})).toBe(false);
    expect(hasErrors({ title: 'Escreva um título para a tarefa.' })).toBe(true);
  });
});

describe('validateStepTitle', () => {
  test('limite de 120 caracteres', () => {
    expect(STEP_MAX_LENGTH).toBe(120);
  });

  test('passo vazio ou só com espaços pede para escrever o passo', () => {
    expect(validateStepTitle('')).toBe('Escreva o passo.');
    expect(validateStepTitle('   ')).toBe('Escreva o passo.');
  });

  test('120 caracteres é válido; 121, não', () => {
    expect(validateStepTitle('a'.repeat(120))).toBeUndefined();
    expect(validateStepTitle('a'.repeat(121))).toBe('Use até 120 caracteres no passo.');
  });

  test('passo comum é válido', () => {
    expect(validateStepTitle('Abrir o enunciado')).toBeUndefined();
  });
});
