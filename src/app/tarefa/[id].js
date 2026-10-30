import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AccessibilityInfo, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { EmptyState } from '../../components/EmptyState';
import { HeaderButton } from '../../components/HeaderButton';
import { Screen } from '../../components/Screen';
import { SectionHeader } from '../../components/SectionHeader';
import { AddStepField } from '../../features/tasks/AddStepField';
import { HeroMessageCard, NextStepCard } from '../../features/tasks/HeroCards';
import { StepList } from '../../features/tasks/StepList';
import { useTasks } from '../../features/tasks/TasksContext';
import { TasksStatusView } from '../../features/tasks/TasksStatusView';
import { getTaskHeroContent } from '../../features/tasks/heroContent';
import { countSteps, getTaskById } from '../../features/tasks/selectors';
import { colors, spacing } from '../../theme';

// O cabeçalho nativo já protege o topo da tela; aqui só as laterais.
const SCREEN_EDGES = ['left', 'right'];

/**
 * Detalhe da tarefa (rota /tarefa/[id]): próximo passo em destaque,
 * lista de passos e campo para adicionar passos.
 * Abre "empurrada" por cima da tela anterior, com o cabeçalho nativo
 * (seta de voltar e botão "Editar").
 */
export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { status, tasks, addStep, toggleTask } = useTasks();
  const addStepRef = useRef(null);

  const task = status === 'ready' ? getTaskById(tasks, id) : null;

  // Se a tarefa deixar de existir (ex.: excluída no formulário de edição),
  // volta para a tela anterior em vez de mostrar uma tela vazia.
  const canGoBack = router.canGoBack();
  useEffect(() => {
    if (status === 'ready' && !task && canGoBack) {
      router.back();
    }
  }, [status, task, canGoBack, router]);

  if (status !== 'ready') {
    return (
      <Screen edges={SCREEN_EDGES}>
        <TasksStatusView />
      </Screen>
    );
  }

  if (!task) {
    // Só aparece se não houver tela para onde voltar (ex.: link direto).
    return canGoBack ? null : (
      <Screen edges={SCREEN_EDGES}>
        <EmptyState
          icon="info"
          title="Esta tarefa não foi encontrada"
          message="Ela pode ter sido excluída."
        />
      </Screen>
    );
  }

  const hero = getTaskHeroContent(task);
  const { done: stepsDone, total: stepsTotal } = countSteps(task);

  function handleEdit() {
    router.push({ pathname: '/tarefa/formulario', params: { id: task.id } });
  }

  function handleHeroAction() {
    if (hero.action === 'focusAdd') {
      addStepRef.current?.focus();
    } else if (hero.action === 'complete') {
      toggleTask(task.id);
      AccessibilityInfo.announceForAccessibility('Tarefa concluída.');
    }
  }

  return (
    <Screen edges={SCREEN_EDGES}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HeaderButton
              label="Editar"
              onPress={handleEdit}
              emphasis
              accessibilityHint="Abre o formulário para editar ou excluir a tarefa"
            />
          ),
        }}
      />

      {/* Título, observação e situação da tarefa */}
      <View style={styles.header}>
        <AppText variant="title" accessibilityRole="header">
          {task.title}
        </AppText>
        {task.notes ? (
          <AppText variant="body" color={colors.textSecondary}>
            {task.notes}
          </AppText>
        ) : null}
        {task.status === 'done' ? (
          <AppText variant="caption" color={colors.textSecondary}>
            Tarefa concluída
          </AppText>
        ) : task.forToday ? (
          <AppText variant="caption" color={colors.textSecondary}>
            Marcada para hoje
          </AppText>
        ) : null}
      </View>

      {/* Card de destaque: o próximo passo desta tarefa, ou uma sugestão */}
      {hero.kind === 'step' ? (
        <NextStepCard nextStep={hero.nextStep} />
      ) : (
        <HeroMessageCard
          title={hero.title}
          message={hero.message}
          actionLabel={hero.actionLabel}
          actionIcon={hero.action === 'complete' ? 'done' : 'add'}
          actionHint={
            hero.action === 'complete'
              ? 'Marca a tarefa como concluída'
              : 'Leva ao campo "Novo passo"'
          }
          onAction={hero.action ? handleHeroAction : undefined}
        />
      )}

      {/* Passos */}
      <SectionHeader title="Passos" />
      {stepsTotal > 0 ? (
        <>
          <AppText variant="caption" color={colors.textSecondary}>
            {stepsDone} de {stepsTotal} feitos
          </AppText>
          <StepList task={task} />
        </>
      ) : null}

      <AddStepField onAdd={(title) => addStep(task.id, title)} inputRef={addStepRef} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.xs,
  },
});
