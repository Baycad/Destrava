import { Alert, StyleSheet } from 'react-native';

import { AppText } from '../../components/AppText';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { colors, spacing } from '../../theme';

function handleStartFocus() {
  // O temporizador de foco será construído na Etapa 4.
  Alert.alert(
    'Modo foco em construção',
    'Nesta etapa, o botão é apenas visual. O temporizador de foco chega numa próxima etapa.'
  );
}

/**
 * Card de destaque com um passo em aberto (tela Hoje e detalhe da tarefa).
 * - showTaskName: mostra "em [tarefa]" (útil na tela Hoje; no detalhe a tarefa já é o título).
 */
export function NextStepCard({ nextStep, showTaskName = false }) {
  return (
    <Card variant="hero">
      <AppText variant="label" color={colors.onHeroSecondary} accessibilityRole="header">
        Seu próximo passo
      </AppText>
      <AppText variant="display" color={colors.onHero}>
        {nextStep.step.title}
      </AppText>
      <AppText variant="caption" color={colors.onHeroSecondary}>
        Passo {nextStep.position} de {nextStep.total}
        {showTaskName ? ` em ${nextStep.task.title}` : ''}
      </AppText>
      <Button
        label="Começar 5 minutos"
        icon="play"
        variant="hero"
        onPress={handleStartFocus}
        accessibilityHint="Em construção: por enquanto, mostra um aviso"
        style={styles.heroButton}
      />
      <AppText variant="caption" color={colors.onHeroSecondary}>
        Cinco minutos já valem. Se quiser parar depois, tudo bem.
      </AppText>
    </Card>
  );
}

/**
 * Card de destaque sem passo para mostrar: título, mensagem e ação opcional.
 * Mantém o rótulo "Seu próximo passo", para o card continuar no mesmo lugar e papel.
 */
export function HeroMessageCard({ title, message, actionLabel, actionIcon, actionHint, onAction }) {
  return (
    <Card variant="hero">
      <AppText variant="label" color={colors.onHeroSecondary} accessibilityRole="header">
        Seu próximo passo
      </AppText>
      <AppText variant="display" color={colors.onHero}>
        {title}
      </AppText>
      <AppText variant="body" color={colors.onHeroSecondary}>
        {message}
      </AppText>
      {actionLabel && onAction ? (
        <Button
          label={actionLabel}
          icon={actionIcon}
          variant="hero"
          onPress={onAction}
          accessibilityHint={actionHint}
          style={styles.heroButton}
        />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  heroButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
});
