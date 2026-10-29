import { createTask } from '../taskModel';
import { initialTasksState, tasksReducer } from '../tasksReducer';

const T0 = '2026-10-29T10:00:00.000Z';
const T1 = '2026-10-29T11:00:00.000Z';
const T2 = '2026-10-29T12:00:00.000Z';

function readyState(tasks) {
  return { status: 'ready', tasks };
}

describe('tasksReducer: carregamento', () => {
  test('estado inicial é "carregando", sem tarefas', () => {
    expect(initialTasksState).toEqual({ status: 'loading', tasks: [] });
  });

  test('load/started, load/succeeded e load/failed', () => {
    const tasks = [createTask({ title: 'A' }, T0, 'a')];
    expect(tasksReducer(readyState([]), { type: 'load/started' }).status).toBe('loading');
    expect(tasksReducer(initialTasksState, { type: 'load/succeeded', tasks })).toEqual(readyState(tasks));
    expect(tasksReducer(initialTasksState, { type: 'load/failed' }).status).toBe('error');
  });

  test('tasks/replaced troca a lista inteira', () => {
    const replacement = [createTask({ title: 'Nova' }, T0, 'n')];
    const state = tasksReducer(readyState([createTask({ title: 'Velha' }, T0, 'v')]), {
      type: 'tasks/replaced',
      tasks: replacement,
    });
    expect(state.tasks).toEqual(replacement);
  });
});

describe('tasksReducer: alterações', () => {
  const a = createTask({ title: 'A', forToday: true }, T0, 'a');
  const b = createTask({ title: 'B' }, T0, 'b');

  test('task/added coloca a tarefa nova no topo', () => {
    const state = tasksReducer(readyState([a]), { type: 'task/added', task: b });
    expect(state.tasks.map((task) => task.id)).toEqual(['b', 'a']);
  });

  test('task/updated muda os campos e preserva data de criação e passos', () => {
    const withSteps = { ...a, steps: [{ id: 's1', title: 'Passo', done: false }] };
    const state = tasksReducer(readyState([withSteps, b]), {
      type: 'task/updated',
      id: 'a',
      changes: { title: 'A editada', notes: 'n', forToday: false },
      now: T1,
    });
    const updated = state.tasks[0];

    expect(updated.title).toBe('A editada');
    expect(updated.forToday).toBe(false);
    expect(updated.updatedAt).toBe(T1);
    expect(updated.createdAt).toBe(T0);
    expect(updated.steps).toEqual(withSteps.steps);
    expect(state.tasks[1]).toBe(b);
  });

  test('task/toggled conclui uma pendente e registra a data', () => {
    const state = tasksReducer(readyState([a]), { type: 'task/toggled', id: 'a', now: T1 });
    expect(state.tasks[0]).toMatchObject({ status: 'done', completedAt: T1, updatedAt: T1 });
  });

  test('task/toggled reabre uma concluída e limpa a data de conclusão', () => {
    const done = { ...a, status: 'done', completedAt: T1 };
    const state = tasksReducer(readyState([done]), { type: 'task/toggled', id: 'a', now: T2 });
    expect(state.tasks[0]).toMatchObject({ status: 'pending', completedAt: null, updatedAt: T2 });
  });

  test('task/deleted remove só a tarefa indicada', () => {
    const state = tasksReducer(readyState([a, b]), { type: 'task/deleted', id: 'a' });
    expect(state.tasks.map((task) => task.id)).toEqual(['b']);
  });

  test('ação desconhecida devolve o mesmo estado', () => {
    const state = readyState([a]);
    expect(tasksReducer(state, { type: 'acao/inexistente' })).toBe(state);
  });

  test('não altera o estado original (imutabilidade)', () => {
    const original = readyState([a, b]);
    const copy = JSON.parse(JSON.stringify(original));
    tasksReducer(original, { type: 'task/toggled', id: 'a', now: T1 });
    tasksReducer(original, { type: 'task/updated', id: 'b', changes: { title: 'X' }, now: T1 });
    tasksReducer(original, { type: 'task/deleted', id: 'a' });
    expect(original).toEqual(copy);
  });
});
