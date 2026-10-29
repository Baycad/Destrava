// Criação de tarefas no formato do modelo de dados (ver docs/registro-do-projeto.md).

/**
 * Gera um id único o bastante para um app local de um único usuário:
 * data atual + parte aleatória, em base 36. Não precisa de biblioteca.
 */
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Monta uma tarefa nova.
 * - fields: { title, notes, forToday }
 * - now: data/hora atual em texto ISO (recebida de fora para manter a função previsível)
 */
export function createTask(fields, now, id = generateId()) {
  return {
    id,
    title: fields.title.trim(),
    notes: (fields.notes ?? '').trim(),
    status: 'pending',
    forToday: Boolean(fields.forToday),
    steps: [],
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };
}
