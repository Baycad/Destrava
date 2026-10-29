// Regras de alteração das tarefas, como funções puras:
// recebem o estado atual e uma ação, e devolvem um estado novo, sem efeitos colaterais.
// Salvar no aparelho é responsabilidade do TasksContext, não daqui.

export const initialTasksState = {
  status: 'loading', // 'loading' | 'ready' | 'error'
  tasks: [],
};

export function tasksReducer(state, action) {
  switch (action.type) {
    case 'load/started':
      return { ...state, status: 'loading' };

    case 'load/succeeded':
      return { status: 'ready', tasks: action.tasks };

    case 'load/failed':
      return { ...state, status: 'error' };

    // Substitui a lista inteira (usado para carregar os exemplos de demonstração).
    case 'tasks/replaced':
      return { ...state, tasks: action.tasks };

    // Tarefa nova aparece no topo da lista.
    case 'task/added':
      return { ...state, tasks: [action.task, ...state.tasks] };

    case 'task/updated':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, ...action.changes, updatedAt: action.now } : task
        ),
      };

    // Conclui uma tarefa pendente ou reabre uma concluída.
    case 'task/toggled':
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id !== action.id) return task;
          const willBeDone = task.status !== 'done';
          return {
            ...task,
            status: willBeDone ? 'done' : 'pending',
            completedAt: willBeDone ? action.now : null,
            updatedAt: action.now,
          };
        }),
      };

    case 'task/deleted':
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.id) };

    default:
      return state;
  }
}
