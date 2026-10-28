import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '../theme';
import { AppText } from './AppText';
import { Card } from './Card';

/**
 * Número de destaque com legenda (ex.: "6 sessões de foco").
 * - boxed: true desenha o número dentro de um Card padrão (usado na aba Progresso).
 * O leitor de tela lê número e legenda juntos.
 */
export function StatTile({ value, label, boxed = false, style }) {
  const accessibilityProps = {
    accessible: true,
    accessibilityLabel: `${value} ${label}`,
  };

  const content = (
    <>
      <AppText variant="stat" color={colors.primary}>
        {value}
      </AppText>
      <AppText variant="caption" color={colors.textSecondary}>
        {label}
      </AppText>
    </>
  );

  // Reaproveita o Card em vez de repetir fundo, borda, raio e padding.
  if (boxed) {
    return (
      <Card style={[styles.container, style]} {...accessibilityProps}>
        {content}
      </Card>
    );
  }

  return (
    <View style={[styles.container, style]} {...accessibilityProps}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.xs,
  },
});
