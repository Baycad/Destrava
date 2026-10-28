import { Alert } from 'react-native';

import { Button } from '../../components/Button';
import { DemoBadge } from '../../components/DemoBadge';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { SHOW_DEMO_DATA, getTasks } from '../../data/demo';
import { TaskList } from '../../features/tasks/TaskList';
import { splitByStatus } from '../../features/tasks/selectors';

/** Aba "Tarefas": primeira versão visual (criar e editar chegam na Etapa 2). */
export default function TasksScreen() {
  const tasks = getTasks();
  const { pending, done } = splitByStatus(tasks);

  function handleNewTask() {
    Alert.alert(
      'Criação de tarefas em construção',
      'Na próxima etapa você poderá criar, editar e concluir tarefas, que ficarão salvas no aparelho.'
    );
  }

  return (
    <Screen>
      <ScreenHeader
        title="Tarefas"
        subtitle="Quebre o que parece grande em passos que caibam em poucos minutos."
      />

      {SHOW_DEMO_DATA ? <DemoBadge /> : null}

      {tasks.length === 0 ? (
        <EmptyState
          icon="tasks"
          title="Nenhuma tarefa por enquanto"
          message="Comece anotando algo que você vem adiando. Não precisa estar organizado."
          actionLabel="Nova tarefa"
          onAction={handleNewTask}
        />
      ) : (
        <>
          <Button label="Nova tarefa" icon="add" variant="secondary" onPress={handleNewTask} />

          <SectionHeader title={`Pendentes (${pending.length})`} />
          {pending.length > 0 ? (
            <TaskList tasks={pending} />
          ) : (
            <EmptyState icon="leaf" title="Nenhuma tarefa pendente" message="Aproveite o respiro." />
          )}

          {done.length > 0 ? (
            <>
              <SectionHeader title={`Concluídas (${done.length})`} />
              <TaskList tasks={done} />
            </>
          ) : null}
        </>
      )}
    </Screen>
  );
}
