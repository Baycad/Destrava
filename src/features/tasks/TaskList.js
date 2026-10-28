import { Card } from '../../components/Card';
import { TaskItem } from './TaskItem';

/** Lista de tarefas agrupada em um único painel, com divisórias entre os itens. */
export function TaskList({ tasks }) {
  return (
    <Card padded={false}>
      {tasks.map((task, index) => (
        <TaskItem key={task.id} task={task} showDivider={index > 0} />
      ))}
    </Card>
  );
}
