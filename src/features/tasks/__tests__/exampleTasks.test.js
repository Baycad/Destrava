import { buildExampleTasks } from '../exampleTasks';
import { getNextStep, getTodayTasks } from '../selectors';

const NOW = '2026-10-29T12:00:00.000Z';

describe('buildExampleTasks', () => {
  test('cria 4 tarefas com ids únicos (tarefas e passos)', () => {
    const tasks = buildExampleTasks(NOW);
    const ids = [...tasks.map((t) => t.id), ...tasks.flatMap((t) => t.steps.map((s) => s.id))];
    expect(tasks).toHaveLength(4);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('cada carregamento gera ids novos', () => {
    const first = buildExampleTasks(NOW).map((t) => t.id);
    const second = buildExampleTasks(NOW).map((t) => t.id);
    expect(first.some((id) => second.includes(id))).toBe(false);
  });

  test('o próximo passo é o primeiro do trabalho de Banco de Dados', () => {
    const next = getNextStep(buildExampleTasks(NOW));
    expect(next.task.title).toBe('Trabalho de Banco de Dados');
    expect(next.step.title).toBe('Abrir o enunciado e ler só a primeira página');
    expect(next.position).toBe(1);
    expect(next.total).toBe(3);
  });

  test('3 tarefas para hoje, com a concluída por último', () => {
    const today = getTodayTasks(buildExampleTasks(NOW));
    expect(today).toHaveLength(3);
    expect(today[2].status).toBe('done');
    expect(today[2].completedAt).toBe(NOW);
  });
});
