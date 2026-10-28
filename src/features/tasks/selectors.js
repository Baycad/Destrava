// Funções puras sobre tarefas: recebem dados e devolvem um resultado,
// sem alterar nada nem depender da interface.
// Por isso são fáceis de testar com Jest em etapas futuras.

/** Conta quantos passos de uma tarefa já foram feitos. */
export function countSteps(task) {
  const total = task.steps.length;
  const done = task.steps.filter((step) => step.done).length;
  return { done, total };
}

/** Primeiro passo ainda não feito de uma tarefa (ou null). */
export function getFirstPendingStep(task) {
  return task.steps.find((step) => !step.done) ?? null;
}

/**
 * Escolhe o passo exibido no card "Seu próximo passo".
 * Regra provisória (decisão pendente nº 6 do planejamento):
 * primeira tarefa pendente marcada para hoje que tenha um passo em aberto;
 * se não houver, a primeira tarefa pendente com passo em aberto.
 */
export function getNextStep(tasks) {
  const candidates = tasks.filter(
    (task) => task.status === 'pending' && getFirstPendingStep(task) !== null
  );
  const task = candidates.find((candidate) => candidate.forToday) ?? candidates[0];

  if (!task) {
    return null;
  }

  const index = task.steps.findIndex((step) => !step.done);
  return {
    task,
    step: task.steps[index],
    position: index + 1,
    total: task.steps.length,
  };
}

/** Tarefas marcadas para hoje, com as pendentes primeiro. */
export function getTodayTasks(tasks) {
  const today = tasks.filter((task) => task.forToday);
  return [
    ...today.filter((task) => task.status === 'pending'),
    ...today.filter((task) => task.status === 'done'),
  ];
}

/** Separa tarefas pendentes e concluídas. */
export function splitByStatus(tasks) {
  return {
    pending: tasks.filter((task) => task.status === 'pending'),
    done: tasks.filter((task) => task.status === 'done'),
  };
}
