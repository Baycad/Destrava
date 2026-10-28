import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

const VARIANTS = {
  default: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  muted: { backgroundColor: colors.surfaceMuted },
  hero: { backgroundColor: colors.hero, borderRadius: radius.xl },
};

/**
 * Superfície que agrupa conteúdo relacionado.
 * - variant: 'default' | 'muted' | 'hero'
 * - padded: false quando o conteúdo (ex.: lista) controla o próprio espaçamento.
 */
export function Card({ children, variant = 'default', padded = true, style }) {
  return (
    <View style={[styles.base, VARIANTS[variant] ?? VARIANTS.default, padded ? styles.padded : null, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.lg,
    gap: spacing.md,
  },
});
