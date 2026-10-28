import { Pressable, StyleSheet } from 'react-native';

import { colors, minTouchTarget, pressedFeedback, radius, spacing } from '../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

// Cada variante define o fundo e a cor do texto (contraste verificado em src/theme).
const VARIANTS = {
  primary: {
    container: { backgroundColor: colors.primary },
    textColor: colors.onPrimary,
  },
  secondary: {
    container: { backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.primary },
    textColor: colors.primary,
  },
  // Usada dentro do card escuro "Seu próximo passo"
  hero: {
    container: { backgroundColor: colors.heroAction },
    textColor: colors.onHeroAction,
  },
};

/**
 * Botão reutilizável com área de toque mínima de 48 e informações
 * de acessibilidade (papel, rótulo, dica e estado).
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  accessibilityHint,
  disabled = false,
  style,
}) {
  const current = VARIANTS[variant] ?? VARIANTS.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        current.container,
        pressed && !disabled ? pressedFeedback : null,
        disabled ? styles.disabled : null,
        style,
      ]}>
      {icon ? <Icon name={icon} size={20} color={current.textColor} /> : null}
      <AppText variant="button" color={current.textColor} style={styles.label}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: minTouchTarget,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  label: {
    flexShrink: 1,
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
