import { useRouter } from 'expo-router';
import { AccessibilityInfo } from 'react-native';

import { TaskForm } from '../../features/tasks/TaskForm';
import { useTasks } from '../../features/tasks/TasksContext';

/**
 * Tela "Nova tarefa" (abre como modal, por cima das abas).
 * Rota: /tarefa/formulario. Na parte 2c, a mesma tela também vai editar (?id=).
 */
export default function TaskFormScreen() {
  const router = useRouter();
  const { addTask } = useTasks();

  function handleSubmit(fields) {
    addTask(fields);
    AccessibilityInfo.announceForAccessibility('Tarefa criada.');
    router.back();
  }

  return <TaskForm heading="Nova tarefa" onSubmit={handleSubmit} onCancel={() => router.back()} />;
}
