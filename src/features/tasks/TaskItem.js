import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Icon } from '../../components/Icon';
import { colors, spacing } from '../../theme';
import { countSteps, getFirstPendingStep } from './selectors';

/**
 * Linha de tarefa: título, próximo passo e quantos passos já foram feitos.
 * Nesta etapa ela é apenas informativa (sem toque); concluir e abrir
 * a tarefa serão implementados na Etapa 2.
 */
export function TaskItem({ task, showDivider = false }) {
  const { done: stepsDone, total } = countSteps(task);
  const nextStep = getFirstPendingStep(task);
  const isDone = task.status === 'done';

  let summary;
  if (isDone) {
    summary = 'Concluída';
  } else if (total === 0) {
    summary = 'Ainda sem passos definidos';
  } else {
    summary = `${stepsDone} de ${total} passos feitos`;
  }

  const showNextStep = !isDone && nextStep !== null;

  // Frase única lida pelo TalkBack/VoiceOver ao focar a linha.
  const accessibilityLabel = [
    task.title,
    summary,
    showNextStep ? `Próximo passo: ${nextStep.title}` : null,
  ]
    .filter(Boolean)
    .join('. ');

  return (
    <View
      style={[styles.row, showDivider ? styles.divider : null]}
      accessible
      accessibilityLabel={accessibilityLabel}>
      <Icon
        name={isDone ? 'done' : 'pending'}
        size={24}
        color={isDone ? colors.primary : colors.textSecondary}
      />
      <View style={styles.texts}>
        <AppText variant="bodyStrong" color={isDone ? colors.textSecondary : colors.text}>
          {task.title}
        </AppText>
        {showNextStep ? <AppText variant="caption">Próximo: {nextStep.title}</AppText> : null}
        <AppText variant="caption" color={colors.textSecondary}>
          {summary}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.lg,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
});
