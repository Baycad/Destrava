import { useLocalSearchParams, useRouter } from 'expo-router';
import { AccessibilityInfo, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../../components/EmptyState';
import { TaskForm } from '../../features/tasks/TaskForm';
import { useTasks } from '../../features/tasks/TasksContext';
import { colors, spacing } from '../../theme';

/**
 * Tela de tarefa (abre como modal, por cima das abas).
 * - /tarefa/formulario        -> "Nova tarefa"
 * - /tarefa/formulario?id=... -> "Editar tarefa", com a opção de excluir
 */
export default function TaskFormScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tasks, addTask, updateTask, deleteTask } = useTasks();

  const isEditing = typeof id === 'string' && id.length > 0;
  const task = isEditing ? tasks.find((item) => item.id === id) : null;

  // Edição de uma tarefa que não existe mais (ex.: link antigo).
  if (isEditing && !task) {
    return (
      <SafeAreaView style={styles.missing}>
        <EmptyState
          icon="info"
          title="Esta tarefa não foi encontrada"
          message="Ela pode ter sido excluída."
          actionLabel="Voltar"
          onAction={() => router.back()}
        />
      </SafeAreaView>
    );
  }

  function handleSubmit(fields) {
    if (isEditing) {
      updateTask(task.id, fields);
      AccessibilityInfo.announceForAccessibility('Tarefa atualizada.');
    } else {
      addTask(fields);
      AccessibilityInfo.announceForAccessibility('Tarefa criada.');
    }
    router.back();
  }

  function handleDelete() {
    Alert.alert(
      'Excluir esta tarefa?',
      `"${task.title}" será apagada. Essa ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            // Fecha o formulário antes de excluir, para a tela não mostrar
            // "tarefa não encontrada" por um instante.
            router.back();
            deleteTask(task.id);
            AccessibilityInfo.announceForAccessibility('Tarefa excluída.');
          },
        },
      ]
    );
  }

  return (
    <TaskForm
      heading={isEditing ? 'Editar tarefa' : 'Nova tarefa'}
      initialValues={
        isEditing ? { title: task.title, notes: task.notes, forToday: task.forToday } : undefined
      }
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      onDelete={isEditing ? handleDelete : undefined}
      autoFocusTitle={!isEditing}
    />
  );
}

const styles = StyleSheet.create({
  missing: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});
