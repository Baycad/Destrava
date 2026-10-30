// Criação de tarefas no formato do modelo de dados (ver docs/registro-do-projeto.md).

/**
 * Gera um id único o bastante para um app local de um único usuário:
 * data atual + parte aleatória, em base 36. Não precisa de biblioteca.
 */
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Padroniza os campos vindos do formulário: tira espaços das pontas
 * e garante que "para hoje" seja verdadeiro ou falso.
 */
export function normalizeFields(fields) {
  return {
    title: fields.title.trim(),
    notes: (fields.notes ?? '').trim(),
    forToday: Boolean(fields.forToday),
  };
}

/**
 * Monta uma tarefa nova.
 * - fields: { title, notes, forToday }
 * - now: data/hora atual em texto ISO (recebida de fora para manter a função previsível)
 */
export function createTask(fields, now, id = generateId()) {
  return {
    id,
    ...normalizeFields(fields),
    status: 'pending',
    steps: [],
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  };
}

/**
 * Monta um passo novo.
 * - title: texto do passo (espaços das pontas são retirados)
 * - now: data/hora atual em texto ISO
 */
export function createStep(title, now, id = generateId()) {
  return {
    id,
    title: title.trim(),
    done: false,
    createdAt: now,
    completedAt: null,
  };
}
