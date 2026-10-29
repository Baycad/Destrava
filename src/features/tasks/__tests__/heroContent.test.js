import { getEmptyHeroContent } from '../heroContent';

const pending = { id: 'a', status: 'pending', steps: [] };
const done = { id: 'b', status: 'done', steps: [] };

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
    const content = getEmptyHeroContent([done]);
    expect(content.title).toBe('Nada pendente por agora');
    expect(content.actionLabel).toBe('Nova tarefa');
    expect(content.action).toBe('new');
  });

  test('pendentes sem passos: "Defina um primeiro passo", levando às tarefas', () => {
    const content = getEmptyHeroContent([pending, done]);
    expect(content.title).toBe('Defina um primeiro passo');
    expect(content.actionLabel).toBe('Ver minhas tarefas');
    expect(content.action).toBe('tasks');
  });
});
