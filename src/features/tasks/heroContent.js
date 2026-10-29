// Conteúdo do card "Seu próximo passo" da tela Hoje quando não há passo para mostrar.
// Fica fora de src/app/ para poder ser testado: tudo dentro de src/app/ vira rota.

/**
 * Conteúdo do card "Seu próximo passo" quando não há passo para mostrar.
 * São três situações diferentes, cada uma com uma mensagem e uma ação próprias.
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

  const hasPending = tasks.some((task) => task.status === 'pending');
  if (!hasPending) {
    // Tudo concluído: reconhecimento discreto, sem comemoração exagerada nem cobrança.
    return {
      title: 'Nada pendente por agora',
      message: 'Quando surgir algo novo, é só anotar aqui.',
      actionLabel: 'Nova tarefa',
      action: 'new',
    };
  }

  // Há tarefas pendentes, mas nenhuma tem um passo em aberto.
  return {
    title: 'Defina um primeiro passo',
    message: 'Escolha uma tarefa e escreva uma ação que caiba em poucos minutos.',
    actionLabel: 'Ver minhas tarefas',
    action: 'tasks',
  };
}
