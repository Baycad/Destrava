import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../theme';
import { AppText } from './AppText';

/**
 * Número de destaque com legenda (ex.: "6 sessões de foco").
 * - boxed: true desenha um fundo próprio (usado na aba Progresso).
 * O leitor de tela lê número e legenda juntos.
 */
export function StatTile({ value, label, boxed = false, style }) {
  return (
    <View
      style={[styles.container, boxed ? styles.boxed : null, style]}
      accessible
      accessibilityLabel={`${value} ${label}`}>
      <AppText variant="stat" color={colors.primary}>
        {value}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.xs,
  },
  boxed: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
