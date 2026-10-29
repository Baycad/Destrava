import { EmptyState } from '../../components/EmptyState';
import { LoadingState } from '../../components/LoadingState';
import { useTasks } from './TasksContext';

/**
 * O que mostrar enquanto as tarefas não estão prontas:
 * carregando (com atraso para não piscar) ou erro com opção de tentar de novo.
 */
export function TasksStatusView() {
  const { status, reload } = useTasks();

  if (status === 'error') {
    return (
      <EmptyState
        icon="info"
        title="Não foi possível carregar suas tarefas"
        message="Tente de novo em instantes."
        actionLabel="Tentar de novo"
        onAction={reload}
      />
    );
  }

  return <LoadingState message="Carregando suas tarefas…" />;
}
