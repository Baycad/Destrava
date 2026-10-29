import { Alert, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { Screen } from '../../components/Screen';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SectionHeader } from '../../components/SectionHeader';
import { useTasks } from '../../features/tasks/TasksContext';
import { TasksStatusView } from '../../features/tasks/TasksStatusView';
import { TaskList } from '../../features/tasks/TaskList';
import { splitByStatus } from '../../features/tasks/selectors';
import { colors, spacing } from '../../theme';

/** Aba "Tarefas": lista as tarefas salvas no aparelho. */
export default function TasksScreen() {
  const { status, tasks, loadExamples } = useTasks();
  const { pending, done } = splitByStatus(tasks);

  function handleNewTask() {
    // O formulário de criação chega na parte 2b.
    Alert.alert(
      'Criação de tarefas em construção',
      'Em breve você poderá criar, editar e concluir tarefas, que ficarão salvas no aparelho.'
    );
  }

  const header = (
    <ScreenHeader
      title="Tarefas"
      subtitle="Quebre o que parece grande em passos que caibam em poucos minutos."
    />
  );

  if (status !== 'ready') {
    return (
      <Screen>
        {header}
        <TasksStatusView />
      </Screen>
    );
  }

  return (
    <Screen>
      {header}

      {tasks.length === 0 ? (
        <>
          <EmptyState
            icon="tasks"
            title="Nenhuma tarefa por enquanto"
            message="Comece anotando algo que você vem adiando. Não precisa estar organizado."
            actionLabel="Nova tarefa"
            onAction={handleNewTask}
          />

          {/* Só no modo de desenvolvimento (Expo Go): útil para demonstrações. */}
          {__DEV__ ? (
            <View style={styles.devTools}>
              <Button
                label="Carregar exemplos"
                variant="secondary"
                onPress={loadExamples}
                accessibilityHint="Cria quatro tarefas de exemplo, salvas no aparelho"
              />
              <AppText variant="caption" color={colors.textSecondary} style={styles.devNote}>
                Visível só no modo de desenvolvimento. Os exemplos viram tarefas comuns: dá para
                editar ou excluir depois.
              </AppText>
            </View>
          ) : null}
        </>
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

const styles = StyleSheet.create({
  devTools: {
    gap: spacing.sm,
  },
  devNote: {
    textAlign: 'center',
  },
});
