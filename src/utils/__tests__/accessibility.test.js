import { buildSpokenHint } from '../accessibility';

describe('buildSpokenHint (dica falada do campo de texto)', () => {
  test('dica terminada em ponto + contador, sem ponto duplo', () => {
    expect(
      buildSpokenHint({ hint: 'Um detalhe que ajude a começar, se quiser.', value: '', maxLength: 500 })
    ).toBe('Um detalhe que ajude a começar, se quiser. 0 de 500 caracteres');
  });

  test('só o contador', () => {
    expect(buildSpokenHint({ value: 'abc', maxLength: 100 })).toBe('3 de 100 caracteres');
  });

  test('sem dica nem contador devolve undefined', () => {
    expect(buildSpokenHint({ value: 'abc' })).toBeUndefined();
  });

  test('com erro, fala só a mensagem de erro', () => {
    expect(
      buildSpokenHint({ error: 'Escreva um título para a tarefa.', hint: 'Dica', value: '', maxLength: 100 })
    ).toBe('Escreva um título para a tarefa.');
  });

  test('dica com vários pontos e espaços no fim', () => {
    expect(buildSpokenHint({ hint: 'Dica...  ', value: '', maxLength: 10 })).toBe('Dica. 0 de 10 caracteres');
  });
});
