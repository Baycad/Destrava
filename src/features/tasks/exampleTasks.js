import { generateId } from './taskModel';

// Tarefas de exemplo para demonstração (ex.: apresentação ao professor).
// Diferente dos antigos dados de demonstração, elas viram tarefas REAIS:
// ficam salvas no aparelho e podem ser editadas ou excluídas como qualquer outra.
// O botão que carrega estes exemplos só aparece no modo de desenvolvimento (__DEV__).

/** Monta os exemplos com ids e datas novos a cada carregamento. */
export function buildExampleTasks(now) {
  const step = (title, done = false) => ({ id: generateId(), title, done });

  const task = (fields) => ({
    id: generateId(),
    notes: '',
    status: 'pending',
    forToday: false,
    steps: [],
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    ...fields,
  });

  return [
    task({
      title: 'Trabalho de Banco de Dados',
      forToday: true,
      steps: [
        step('Abrir o enunciado e ler só a primeira página'),
        step('Listar as tabelas que o sistema precisa'),
        step('Rascunhar o diagrama no papel'),
      ],
    }),
    task({
      title: 'Revisar Cálculo I',
      forToday: true,
      steps: [
        step('Separar o caderno e a lista de exercícios', true),
        step('Refazer o exercício 1 da lista'),
      ],
    }),
    task({
      title: 'Ler o capítulo 2 de Sociologia',
    }),
    task({
      title: 'Enviar formulário de estágio',
      status: 'done',
      forToday: true,
      completedAt: now,
      steps: [step('Preencher os dados pessoais', true), step('Anexar o histórico', true)],
    }),
  ];
}
