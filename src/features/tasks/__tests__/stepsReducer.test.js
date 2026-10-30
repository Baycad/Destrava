import { createStep, createTask } from '../taskModel';
import { tasksReducer } from '../tasksReducer';

const T0 = '2026-10-30T10:00:00.000Z';
const T1 = '2026-10-30T11:00:00.000Z';
const T2 = '2026-10-30T12:00:00.000Z';

function stateWithSteps(titles) {
  const task = {
    ...createTask({ title: 'Tarefa' }, T0, 't'),
    steps: titles.map((title, index) => createStep(title, T0, `s${index + 1}`)),
  };
  const other = createTask({ title: 'Outra' }, T0, 'o');
  return { status: 'ready', tasks: [task, other] };
}

const stepTitles = (state) => state.tasks[0].steps.map((step) => step.title);

describe('tasksReducer: passos (Etapa 3)', () => {
  test('step/added coloca o passo no fim e atualiza a tarefa', () => {
    const state = tasksReducer(stateWithSteps(['A']), {
      type: 'step/added',
      taskId: 't',
      step: createStep('B', T1, 'novo'),
      now: T1,
    });
    expect(stepTitles(state)).toEqual(['A', 'B']);
    expect(state.tasks[0].updatedAt).toBe(T1);
  });

  test('step/updated muda o texto do passo, sem mexer nos outros', () => {
    const state = tasksReducer(stateWithSteps(['A', 'B']), {
      type: 'step/updated',
      taskId: 't',
      stepId: 's2',
      changes: { title: 'B editado' },
      now: T1,
    });
    expect(stepTitles(state)).toEqual(['A', 'B editado']);
    expect(state.tasks[0].steps[1].createdAt).toBe(T0);
  });

  test('step/toggled marca como feito com data, e desfaz limpando a data', () => {
    let state = tasksReducer(stateWithSteps(['A']), {
      type: 'step/toggled',
      taskId: 't',
      stepId: 's1',
      now: T1,
    });
    expect(state.tasks[0].steps[0]).toMatchObject({ done: true, completedAt: T1 });

    state = tasksReducer(state, { type: 'step/toggled', taskId: 't', stepId: 's1', now: T2 });
    expect(state.tasks[0].steps[0]).toMatchObject({ done: false, completedAt: null });
    expect(state.tasks[0].updatedAt).toBe(T2);
  });

  test('step/deleted remove só o passo indicado', () => {
    const state = tasksReducer(stateWithSteps(['A', 'B', 'C']), {
      type: 'step/deleted',
      taskId: 't',
      stepId: 's2',
      now: T1,
    });
    expect(stepTitles(state)).toEqual(['A', 'C']);
  });

  test('step/moved troca o passo de posição com o vizinho', () => {
    const up = tasksReducer(stateWithSteps(['A', 'B', 'C']), {
      type: 'step/moved',
      taskId: 't',
      stepId: 's2',
      direction: -1,
      now: T1,
    });
    expect(stepTitles(up)).toEqual(['B', 'A', 'C']);

    const down = tasksReducer(stateWithSteps(['A', 'B', 'C']), {
      type: 'step/moved',
      taskId: 't',
      stepId: 's2',
      direction: 1,
      now: T1,
    });
    expect(stepTitles(down)).toEqual(['A', 'C', 'B']);
  });

  test('step/moved nos extremos não muda nada (mesmo estado)', () => {
    const state = stateWithSteps(['A', 'B']);
    expect(
      tasksReducer(state, { type: 'step/moved', taskId: 't', stepId: 's1', direction: -1, now: T1 })
    ).toBe(state);
    expect(
      tasksReducer(state, { type: 'step/moved', taskId: 't', stepId: 's2', direction: 1, now: T1 })
    ).toBe(state);
  });

  test('alterações em passos não mexem nas outras tarefas', () => {
    const state = stateWithSteps(['A']);
    const next = tasksReducer(state, { type: 'step/toggled', taskId: 't', stepId: 's1', now: T1 });
    expect(next.tasks[1]).toBe(state.tasks[1]);
  });

  test('passo inexistente não muda nada (mesmo estado) em editar, concluir e excluir', () => {
    const state = stateWithSteps(['A']);
    const base = { taskId: 't', stepId: 'nao-existe', now: T1 };
    expect(tasksReducer(state, { ...base, type: 'step/updated', changes: { title: 'X' } })).toBe(state);
    expect(tasksReducer(state, { ...base, type: 'step/toggled' })).toBe(state);
    expect(tasksReducer(state, { ...base, type: 'step/deleted' })).toBe(state);
  });

  test('excluir o mesmo passo duas vezes (toque duplo): a segunda vez não muda nada', () => {
    const once = tasksReducer(stateWithSteps(['A', 'B']), {
      type: 'step/deleted',
      taskId: 't',
      stepId: 's1',
      now: T1,
    });
    const twice = tasksReducer(once, { type: 'step/deleted', taskId: 't', stepId: 's1', now: T2 });
    expect(twice).toBe(once);
    expect(twice.tasks[0].updatedAt).toBe(T1);
  });

  test('editar um passo com o mesmo texto não muda nada (mesmo estado)', () => {
    const state = stateWithSteps(['A']);
    expect(
      tasksReducer(state, {
        type: 'step/updated',
        taskId: 't',
        stepId: 's1',
        changes: { title: 'A' },
        now: T1,
      })
    ).toBe(state);
  });

  test('tarefa inexistente não muda nada (mesmo estado)', () => {
    const state = stateWithSteps(['A']);
    expect(
      tasksReducer(state, { type: 'step/added', taskId: 'x', step: createStep('B', T1), now: T1 })
    ).toBe(state);
  });

  test('não altera o estado original (imutabilidade)', () => {
    const original = stateWithSteps(['A', 'B']);
    const copy = JSON.parse(JSON.stringify(original));
    tasksReducer(original, { type: 'step/toggled', taskId: 't', stepId: 's1', now: T1 });
    tasksReducer(original, { type: 'step/moved', taskId: 't', stepId: 's1', direction: 1, now: T1 });
    tasksReducer(original, { type: 'step/deleted', taskId: 't', stepId: 's2', now: T1 });
    tasksReducer(original, { type: 'step/added', taskId: 't', step: createStep('C', T1), now: T1 });
    expect(original).toEqual(copy);
  });
});
