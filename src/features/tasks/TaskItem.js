import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '../../components/AppText';
import { Checkbox } from '../../components/Checkbox';
import { colors, pressedFeedback, spacing } from '../../theme';
import { countSteps, getFirstPendingStep } from './selectors';

/**
 * Linha de tarefa com duas áreas de toque:
 * - a caixa de seleção, à esquerda, conclui ou reabre a tarefa;
 * - o restante da linha abre a edição.
 * - isHighlighted: true quando o próximo passo desta tarefa já aparece no card
 *   "Seu próximo passo". Nesse caso a linha não repete o passo, só aponta para o card.
 */
export function TaskItem({ task, onToggle, onOpen, showDivider = false, isHighlighted = false }) {
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

  // Frase única lida pelo TalkBack/VoiceOver ao focar a área de edição,
  // na mesma ordem em que os textos aparecem na tela.
  const accessibilityLabel = [task.title, nextStepText, summary].filter(Boolean).join('. ');

  return (
    <View style={[styles.row, showDivider ? styles.divider : null]}>
      <Checkbox
        checked={isDone}
        onChange={() => onToggle(task.id)}
        label={task.title}
        hint={isDone ? 'Reabre a tarefa' : 'Marca a tarefa como concluída'}
      />
      <Pressable
        onPress={() => onOpen(task.id)}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint="Abre a edição da tarefa"
        style={({ pressed }) => [styles.texts, pressed ? pressedFeedback : null]}>
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    paddingLeft: spacing.xs,
    paddingRight: spacing.lg,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  texts: {
    flex: 1,
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingLeft: spacing.xs,
  },
});
