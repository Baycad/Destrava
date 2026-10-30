import { getEmptyHeroContent, getTaskHeroContent } from '../heroContent';

function task(id, fields = {}) {
  return { id, title: id, status: 'pending', forToday: false, steps: [], ...fields };
}
const step = (title, done = false) => ({ id: title, title, done });

describe('getEmptyHeroContent (card da tela Hoje sem passo)', () => {
  test('sem tarefas: convida a criar a primeira', () => {
    expect(getEmptyHeroContent([])).toEqual({
      title: 'Nenhum passo por aqui ainda',
      message: 'Anote algo que você vem adiando. Depois, a gente divide em partes pequenas.',
      actionLabel: 'Criar minha primeira tarefa',
      action: 'new',
    });
  });

  test('todas concluídas: "Nada pendente por agora", com nova tarefa', () => {
    const content = getEmptyHeroContent([task('b', { status: 'done' })]);
    expect(content.title).toBe('Nada pendente por agora');
    expect(content.actionLabel).toBe('Nova tarefa');
    expect(content.action).toBe('new');
  });

  test('pendente sem passos: leva direto ao detalhe dela para escrever o primeiro passo', () => {
    const content = getEmptyHeroContent([task('Estudar BD'), task('feita', { status: 'done' })]);
    expect(content).toEqual({
      title: 'Defina um primeiro passo',
      message: 'Escreva uma ação que caiba em poucos minutos para “Estudar BD”.',
      actionLabel: 'Definir o primeiro passo',
      action: 'task',
      taskId: 'Estudar BD',
    });
  });

  test('prefere uma tarefa pendente marcada para hoje', () => {
    const content = getEmptyHeroContent([task('outra'), task('hoje', { forToday: true })]);
    expect(content.taskId).toBe('hoje');
  });

  test('pendente com todos os passos feitos: "Defina o próximo passo"', () => {
    const content = getEmptyHeroContent([task('a', { steps: [step('1', true)] })]);
    expect(content.title).toBe('Defina o próximo passo');
    expect(content.actionLabel).toBe('Definir o próximo passo');
    expect(content.taskId).toBe('a');
  });
});

describe('getTaskHeroContent (card do detalhe da tarefa)', () => {
  test('com passo em aberto: mostra o passo', () => {
    const content = getTaskHeroContent(task('a', { steps: [step('1', true), step('2')] }));
    expect(content.kind).toBe('step');
    expect(content.nextStep.step.title).toBe('2');
    expect(content.nextStep.position).toBe(2);
  });

  test('sem passos: convida a escrever o primeiro, levando ao campo', () => {
    const content = getTaskHeroContent(task('a'));
    expect(content).toMatchObject({
      kind: 'message',
      title: 'Qual é o primeiro passo?',
      actionLabel: 'Escrever o primeiro passo',
      action: 'focusAdd',
    });
  });

  test('todos os passos feitos e tarefa pendente: SUGERE concluir (não conclui sozinho)', () => {
    const content = getTaskHeroContent(task('a', { steps: [step('1', true)] }));
    expect(content).toMatchObject({
      kind: 'message',
      title: 'Todos os passos feitos',
      actionLabel: 'Concluir tarefa',
      action: 'complete',
    });
  });

  test('tarefa concluída sem passo em aberto: sem botão', () => {
    const content = getTaskHeroContent(task('a', { status: 'done', steps: [step('1', true)] }));
    expect(content).toMatchObject({ kind: 'message', title: 'Tarefa concluída', action: null });
  });
});
