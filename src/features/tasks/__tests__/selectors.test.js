import {
  areAllStepsDone,
  countSteps,
  getFirstPendingStep,
  getNextStep,
  getNextStepOfTask,
  getTaskById,
  getTodayTasks,
  splitByStatus,
} from '../selectors';

function task(id, fields = {}) {
  return { id, title: id, status: 'pending', forToday: false, steps: [], ...fields };
}

const step = (title, done = false) => ({ id: title, title, done });

describe('getNextStep', () => {
  test('devolve null sem tarefas, sem passos ou com tudo concluído', () => {
    expect(getNextStep([])).toBeNull();
    expect(getNextStep([task('a')])).toBeNull();
    expect(getNextStep([task('a', { status: 'done', steps: [step('x')] })])).toBeNull();
    expect(getNextStep([task('a', { steps: [step('x', true)] })])).toBeNull();
  });

  test('devolve o primeiro passo em aberto, com posição e total', () => {
    const result = getNextStep([task('a', { steps: [step('1', true), step('2'), step('3')] })]);
    expect(result.step.title).toBe('2');
    expect(result.position).toBe(2);
    expect(result.total).toBe(3);
    expect(result.task.id).toBe('a');
  });

  test('dá preferência a uma tarefa marcada para hoje', () => {
    const tasks = [task('outra', { steps: [step('x')] }), task('hoje', { forToday: true, steps: [step('y')] })];
    expect(getNextStep(tasks).task.id).toBe('hoje');
  });
});

describe('getTodayTasks', () => {
  test('só as tarefas para hoje, com as pendentes antes das concluídas', () => {
    const tasks = [
      task('feita', { forToday: true, status: 'done' }),
      task('fora'),
      task('p1', { forToday: true }),
      task('p2', { forToday: true }),
    ];
    expect(getTodayTasks(tasks).map((item) => item.id)).toEqual(['p1', 'p2', 'feita']);
  });
});

describe('splitByStatus, countSteps e getFirstPendingStep', () => {
  test('separa pendentes e concluídas', () => {
    const { pending, done } = splitByStatus([task('a'), task('b', { status: 'done' })]);
    expect(pending.map((item) => item.id)).toEqual(['a']);
    expect(done.map((item) => item.id)).toEqual(['b']);
  });

  test('conta passos feitos e total', () => {
    expect(countSteps(task('a', { steps: [step('1', true), step('2')] }))).toEqual({ done: 1, total: 2 });
    expect(countSteps(task('b'))).toEqual({ done: 0, total: 0 });
  });

  test('encontra o primeiro passo pendente', () => {
    expect(getFirstPendingStep(task('a', { steps: [step('1', true), step('2')] })).title).toBe('2');
    expect(getFirstPendingStep(task('b'))).toBeNull();
  });
});

describe('seletores da tela de detalhe (Etapa 3)', () => {
  test('getTaskById encontra a tarefa ou devolve null', () => {
    const tasks = [task('a'), task('b')];
    expect(getTaskById(tasks, 'b').id).toBe('b');
    expect(getTaskById(tasks, 'x')).toBeNull();
  });

  test('getNextStepOfTask: primeiro passo em aberto da tarefa, mesmo se ela estiver concluída', () => {
    const result = getNextStepOfTask(task('a', { status: 'done', steps: [step('1', true), step('2')] }));
    expect(result.step.title).toBe('2');
    expect(result.position).toBe(2);
    expect(getNextStepOfTask(task('b', { steps: [step('1', true)] }))).toBeNull();
    expect(getNextStepOfTask(task('c'))).toBeNull();
  });

  test('areAllStepsDone: só quando há passos e todos estão feitos', () => {
    expect(areAllStepsDone(task('a', { steps: [step('1', true), step('2', true)] }))).toBe(true);
    expect(areAllStepsDone(task('b', { steps: [step('1', true), step('2')] }))).toBe(false);
    expect(areAllStepsDone(task('c'))).toBe(false);
  });
});
