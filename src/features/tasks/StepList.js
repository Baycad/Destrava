import { AccessibilityInfo } from 'react-native';

import { Card } from '../../components/Card';
import { useTasks } from './TasksContext';
import { StepItem } from './StepItem';

/** Lista de passos de uma tarefa, num painel único com divisórias. */
export function StepList({ task }) {
  const { toggleStep } = useTasks();

  function handleToggle(step) {
    toggleStep(task.id, step.id);
    AccessibilityInfo.announceForAccessibility(step.done ? 'Passo desmarcado.' : 'Passo feito.');
  }

  return (
    <Card padded={false}>
      {task.steps.map((step, index) => (
        <StepItem key={step.id} step={step} onToggle={handleToggle} showDivider={index > 0} />
      ))}
    </Card>
  );
}
