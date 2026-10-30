import { createStep, createTask, generateId, normalizeFields } from '../taskModel';

describe('normalizeFields', () => {
  test('tira espaços das pontas do título e da observação', () => {
    expect(normalizeFields({ title: '  Ler cap. 3  ', notes: '  só a intro ', forToday: true })).toEqual({
      title: 'Ler cap. 3',
      notes: 'só a intro',
      forToday: true,
    });
  });

  test('"para hoje" vira verdadeiro ou falso, e observação ausente vira texto vazio', () => {
    expect(normalizeFields({ title: 'A', forToday: 1 })).toEqual({ title: 'A', notes: '', forToday: true });
    expect(normalizeFields({ title: 'A' })).toEqual({ title: 'A', notes: '', forToday: false });
  });
});

describe('createTask', () => {
  test('monta uma tarefa nova completa', () => {
    const now = '2026-10-29T12:00:00.000Z';
    const task = createTask({ title: ' Estudar BD ', notes: '', forToday: true }, now, 'id-fixo');

    expect(task).toEqual({
      id: 'id-fixo',
      title: 'Estudar BD',
      notes: '',
      forToday: true,
      status: 'pending',
      steps: [],
      createdAt: now,
      updatedAt: now,
      completedAt: null,
    });
  });

  test('gera ids diferentes para tarefas diferentes', () => {
    const ids = new Set();
    for (let i = 0; i < 1000; i += 1) {
      ids.add(createTask({ title: `Tarefa ${i}` }, 'agora').id);
    }
    expect(ids.size).toBe(1000);
  });

  test('generateId devolve um texto não vazio', () => {
    expect(typeof generateId()).toBe('string');
    expect(generateId().length).toBeGreaterThan(0);
  });
});

describe('createStep', () => {
  test('monta um passo novo, sem espaços nas pontas e ainda não feito', () => {
    expect(createStep('  Ler a primeira página  ', 'agora', 'p1')).toEqual({
      id: 'p1',
      title: 'Ler a primeira página',
      done: false,
      createdAt: 'agora',
      completedAt: null,
    });
  });
});
