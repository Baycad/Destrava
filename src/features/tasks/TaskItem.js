import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Icon } from '../../components/Icon';
import { colors, spacing } from '../../theme';
import { countSteps, getFirstPendingStep } from './selectors';

/**
 * Linha de tarefa: título, próximo passo e quantos passos já foram feitos.
 * - isHighlighted: true quando o próximo passo desta tarefa já aparece no card
 *   "Seu próximo passo". Nesse caso a linha não repete o passo, só aponta para o card.
 * Nesta etapa a linha é apenas informativa (sem toque); concluir e abrir
 * a tarefa serão implementados na Etapa 2.
 */
export function TaskItem({ task, showDivider = false, isHighlighted = false }) {
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

  const hasNextStep = !isDone && nextStep !== null;
  const nextStepText = hasNextStep
    ? isHighlighted
      ? 'Próximo passo em destaque no card acima'
      : `Próximo: ${nextStep.title}`
    : null;

  // Frase única lida pelo TalkBack/VoiceOver ao focar a linha.
  const accessibilityLabel = [task.title, summary, nextStepText].filter(Boolean).join('. ');

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
        {nextStepText ? (
          <AppText variant="caption" color={isHighlighted ? colors.textSecondary : colors.text}>
            {nextStepText}
          </AppText>
        ) : null}
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
    gap: spacing.xs,
  },
});
