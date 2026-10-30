import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import { Alert } from 'react-native';

import { readTasks, writeTasks } from '../../services/storage/taskStorage';
import { buildExampleTasks } from './exampleTasks';
import { createStep, createTask, normalizeFields } from './taskModel';
import { initialTasksState, tasksReducer } from './tasksReducer';

const TasksContext = createContext(null);

/**
 * Guarda as tarefas do app e as mantém salvas no aparelho.
 * - Ao abrir o app: lê as tarefas salvas (status 'loading' -> 'ready' ou 'error').
 * - A cada mudança na lista: grava a lista inteira de novo.
 * As telas usam o hook useTasks() e nunca falam com o armazenamento diretamente.
 */
export function TasksProvider({ children }) {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);

  // Evita gravar a lista que acabou de ser lida (não houve mudança real).
  const skipNextSave = useRef(false);

  async function loadTasks() {
    dispatch({ type: 'load/started' });
    try {
      const tasks = await readTasks();
      skipNextSave.current = true;
      dispatch({ type: 'load/succeeded', tasks });
    } catch (error) {
      console.warn('[TasksContext] Falha ao ler as tarefas:', error);
      dispatch({ type: 'load/failed' });
    }
  }

  // Carrega uma vez, quando o app abre.
  useEffect(() => {
    loadTasks();
  }, []);

  // Salva sempre que a lista muda (só depois de carregada).
  useEffect(() => {
    if (state.status !== 'ready') return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    writeTasks(state.tasks).catch((error) => {
      console.warn('[TasksContext] Falha ao salvar as tarefas:', error);
      Alert.alert(
        'Não foi possível salvar agora',
        'Suas alterações continuam na tela, mas podem se perder ao fechar o app. Tente de novo em instantes.'
      );
    });
  }, [state.tasks, state.status]);

  const now = () => new Date().toISOString();

  const value = {
    status: state.status,
    tasks: state.tasks,
    reload: loadTasks,
    // Devolve o id da tarefa criada (usado para abrir o detalhe logo depois).
    addTask: (fields) => {
      const task = createTask(fields, now());
      dispatch({ type: 'task/added', task });
      return task.id;
    },
    updateTask: (id, fields) =>
      dispatch({ type: 'task/updated', id, changes: normalizeFields(fields), now: now() }),
    toggleTask: (id) => dispatch({ type: 'task/toggled', id, now: now() }),
    deleteTask: (id) => dispatch({ type: 'task/deleted', id }),
    loadExamples: () => dispatch({ type: 'tasks/replaced', tasks: buildExampleTasks(now()) }),

    // Passos (Etapa 3)
    addStep: (taskId, title) => {
      const time = now();
      dispatch({ type: 'step/added', taskId, step: createStep(title, time), now: time });
    },
    updateStep: (taskId, stepId, title) =>
      dispatch({ type: 'step/updated', taskId, stepId, changes: { title: title.trim() }, now: now() }),
    toggleStep: (taskId, stepId) => dispatch({ type: 'step/toggled', taskId, stepId, now: now() }),
    deleteStep: (taskId, stepId) => dispatch({ type: 'step/deleted', taskId, stepId, now: now() }),
    moveStep: (taskId, stepId, direction) =>
      dispatch({ type: 'step/moved', taskId, stepId, direction, now: now() }),
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

/** Acesso às tarefas e às ações, em qualquer tela dentro do TasksProvider. */
export function useTasks() {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks precisa ser usado dentro de <TasksProvider>.');
  }
  return context;
}
