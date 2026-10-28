import { Card } from '../../components/Card';
import { TaskItem } from './TaskItem';

/**
 * Lista de tarefas agrupada em um único painel, com divisórias entre os itens.
 * - highlightedTaskId: id da tarefa cujo próximo passo já está no card de destaque
 *   (usado na tela Hoje para não repetir o mesmo passo).
 */
export function TaskList({ tasks, highlightedTaskId = null }) {
  return (
    <Card padded={false}>
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          showDivider={index > 0}
          isHighlighted={task.id === highlightedTaskId}
        />
      ))}
    </Card>
  );
}
