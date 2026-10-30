// Conteúdo do card de destaque ("Seu próximo passo") quando não há passo para mostrar.
// Fica fora de src/app/ para poder ser testado: tudo dentro de src/app/ vira rota.

import { getNextStepOfTask } from './selectors';

/**
 * Tela Hoje: conteúdo do card quando nenhuma tarefa tem passo em aberto.
 * São três situações, cada uma com mensagem e ação próprias.
 * - action 'new': abre o formulário de nova tarefa
 * - action 'task': abre o detalhe da tarefa indicada em taskId
 */
export function getEmptyHeroContent(tasks) {
  if (tasks.length === 0) {
    return {
      title: 'Nenhum passo por aqui ainda',
      message: 'Anote algo que você vem adiando. Depois, a gente divide em partes pequenas.',
      actionLabel: 'Criar minha primeira tarefa',
      action: 'new',
    };
  }

  const pending = tasks.filter((task) => task.status === 'pending');
  if (pending.length === 0) {
    // Tudo concluído: reconhecimento discreto, sem comemoração exagerada nem cobrança.
    return {
      title: 'Nada pendente por agora',
      message: 'Quando surgir algo novo, é só anotar aqui.',
      actionLabel: 'Nova tarefa',
      action: 'new',
    };
  }

  // Há tarefas pendentes, mas nenhuma tem passo em aberto: leva direto a uma delas,
  // dando preferência às marcadas para hoje.
  const task = pending.find((item) => item.forToday) ?? pending[0];
  const hasSteps = task.steps.length > 0;
  return {
    title: hasSteps ? 'Defina o próximo passo' : 'Defina um primeiro passo',
    message: `Escreva uma ação que caiba em poucos minutos para “${task.title}”.`,
    actionLabel: hasSteps ? 'Definir o próximo passo' : 'Definir o primeiro passo',
    action: 'task',
    taskId: task.id,
  };
}

/**
 * Detalhe da tarefa: o que o card de destaque mostra.
 * - kind 'step': há um passo em aberto (nextStep).
 * - kind 'message': título, mensagem e uma ação opcional:
 *   'focusAdd' (vai para o campo "Novo passo") ou 'complete' (conclui a tarefa).
 * Nunca conclui a tarefa sozinho: só sugere (decisão 4 da Etapa 3).
 */
export function getTaskHeroContent(task) {
  const nextStep = getNextStepOfTask(task);
  if (nextStep) {
    return { kind: 'step', nextStep };
  }

  if (task.steps.length === 0) {
    return {
      kind: 'message',
      title: 'Qual é o primeiro passo?',
      message: 'Pense em algo que caiba em poucos minutos e escreva logo abaixo.',
      actionLabel: 'Escrever o primeiro passo',
      action: 'focusAdd',
    };
  }

  if (task.status === 'pending') {
    return {
      kind: 'message',
      title: 'Todos os passos feitos',
      message: 'Quer concluir a tarefa ou acrescentar mais um passo?',
      actionLabel: 'Concluir tarefa',
      action: 'complete',
    };
  }

  return {
    kind: 'message',
    title: 'Tarefa concluída',
    message: 'Se surgir algo novo, é só acrescentar um passo.',
    actionLabel: null,
    action: null,
  };
}
