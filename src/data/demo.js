// ⚠️ DADOS DE DEMONSTRAÇÃO — usados apenas na Etapa 1 para visualizar a interface.
// Na Etapa 2 eles serão substituídos pelas tarefas reais, salvas no aparelho.
//
// Para testar os estados vazios, troque SHOW_DEMO_DATA para false e salve o arquivo.
export const SHOW_DEMO_DATA = true;

// Formato segue o modelo de dados do planejamento (campos em inglês, textos em português).
const DEMO_TASKS = [
  {
    id: 'demo-1',
    title: 'Trabalho de Banco de Dados',
    status: 'pending',
    forToday: true,
    steps: [
      { id: 'demo-1-1', title: 'Abrir o enunciado e ler só a primeira página', done: false },
      { id: 'demo-1-2', title: 'Listar as tabelas que o sistema precisa', done: false },
      { id: 'demo-1-3', title: 'Rascunhar o diagrama no papel', done: false },
    ],
  },
  {
    id: 'demo-2',
    title: 'Revisar Cálculo I',
    status: 'pending',
    forToday: true,
    steps: [
      { id: 'demo-2-1', title: 'Separar o caderno e a lista de exercícios', done: true },
      { id: 'demo-2-2', title: 'Refazer o exercício 1 da lista', done: false },
    ],
  },
  {
    id: 'demo-3',
    title: 'Ler o capítulo 2 de Sociologia',
    status: 'pending',
    forToday: false,
    steps: [],
  },
  {
    id: 'demo-4',
    title: 'Enviar formulário de estágio',
    status: 'done',
    forToday: true,
    steps: [
      { id: 'demo-4-1', title: 'Preencher os dados pessoais', done: true },
      { id: 'demo-4-2', title: 'Anexar o histórico', done: true },
    ],
  },
];

const DEMO_WEEK_SUMMARY = {
  sessions: 6,
  focusMinutes: 55,
  stepsDone: 3,
  tasksDone: 1,
  outcomes: { completed: 2, progressed: 3, stopped: 1 },
};

/** Tarefas exibidas no app (vazio quando SHOW_DEMO_DATA = false). */
export function getTasks() {
  return SHOW_DEMO_DATA ? DEMO_TASKS : [];
}

/** Resumo da semana (null quando ainda não há sessões). */
export function getWeekSummary() {
  return SHOW_DEMO_DATA ? DEMO_WEEK_SUMMARY : null;
}
