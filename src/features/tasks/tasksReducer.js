// Regras de alteração das tarefas, como funções puras:
// recebem o estado atual e uma ação, e devolvem um estado novo, sem efeitos colaterais.
// Salvar no aparelho é responsabilidade do TasksContext, não daqui.

/**
 * Aplica uma alteração a uma única tarefa e atualiza o updatedAt dela.
 * - change(task) devolve a tarefa alterada, ou a mesma tarefa quando nada muda.
 */
function changeTask(state, taskId, now, change) {
  let changed = false;
  const tasks = state.tasks.map((task) => {
    if (task.id !== taskId) return task;
    const next = change(task);
    if (next === task) return task;
    changed = true;
    return { ...next, updatedAt: now };
  });
  return changed ? { ...state, tasks } : state;
}

/**
 * Aplica uma alteração a um único passo de uma tarefa.
 * - change(step) devolve o passo alterado, ou o mesmo passo quando nada muda.
 * Se o passo não existir ou nada mudar, devolve o MESMO estado: assim o app não
 * regrava os dados nem redesenha a tela à toa (ex.: toque duplo em "Excluir passo").
 */
function changeStep(state, taskId, stepId, now, change) {
  return changeTask(state, taskId, now, (task) => {
    let changed = false;
    const steps = task.steps.map((step) => {
      if (step.id !== stepId) return step;
      const next = change(step);
      if (next !== step) changed = true;
      return next;
    });
    return changed ? { ...task, steps } : task;
  });
}

/** true quando todos os campos de "changes" já têm o mesmo valor no objeto. */
function hasSameValues(object, changes) {
  return Object.keys(changes).every((key) => object[key] === changes[key]);
}

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

    // ----- Passos (Etapa 3). Toda alteração de passo atualiza o updatedAt da tarefa.

    // Passo novo entra no fim da lista.
    case 'step/added':
      return changeTask(state, action.taskId, action.now, (task) => ({
        ...task,
        steps: [...task.steps, action.step],
      }));

    // Se o texto não mudou, nada muda (mesmo estado).
    case 'step/updated':
      return changeStep(state, action.taskId, action.stepId, action.now, (step) =>
        hasSameValues(step, action.changes) ? step : { ...step, ...action.changes }
      );

    // Marca um passo como feito (registra a data) ou desfaz.
    case 'step/toggled':
      return changeStep(state, action.taskId, action.stepId, action.now, (step) => ({
        ...step,
        done: !step.done,
        completedAt: step.done ? null : action.now,
      }));

    // Passo inexistente (ex.: já excluído num toque anterior): nada muda.
    case 'step/deleted':
      return changeTask(state, action.taskId, action.now, (task) =>
        task.steps.some((step) => step.id === action.stepId)
          ? { ...task, steps: task.steps.filter((step) => step.id !== action.stepId) }
          : task
      );

    // Move um passo uma posição para cima (direction = -1) ou para baixo (+1).
    // Nos extremos da lista, nada muda.
    case 'step/moved':
      return changeTask(state, action.taskId, action.now, (task) => {
        const from = task.steps.findIndex((step) => step.id === action.stepId);
        const to = from + action.direction;
        if (from === -1 || to < 0 || to >= task.steps.length) return task;
        const steps = [...task.steps];
        [steps[from], steps[to]] = [steps[to], steps[from]];
        return { ...task, steps };
      });

    default:
      return state;
  }
}
