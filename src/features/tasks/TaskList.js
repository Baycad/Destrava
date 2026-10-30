import { useRouter } from 'expo-router';
import { AccessibilityInfo } from 'react-native';

import { Card } from '../../components/Card';
import { useTasks } from './TasksContext';
import { TaskItem } from './TaskItem';

/**
 * Lista de tarefas agrupada em um único painel, com divisórias entre os itens.
 * Cada linha pode ser concluída/reaberta (caixa de seleção) ou aberta para ver os detalhes.
 * - highlightedTaskId: id da tarefa cujo próximo passo já está no card de destaque
 *   (usado na tela Hoje para não repetir o mesmo passo).
 */
export function TaskList({ tasks, highlightedTaskId = null }) {
  const router = useRouter();
  const { toggleTask } = useTasks();

  function handleToggle(task) {
    toggleTask(task.id);
    AccessibilityInfo.announceForAccessibility(
      task.status === 'done' ? 'Tarefa reaberta.' : 'Tarefa concluída.'
    );
  }

  function handleOpen(id) {
    router.push({ pathname: '/tarefa/[id]', params: { id } });
  }

  return (
    <Card padded={false}>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => handleToggle(task)}
          onOpen={handleOpen}
          showDivider={index > 0}
          isHighlighted={task.id === highlightedTaskId}
        />
      ))}
    </Card>
  );
}
