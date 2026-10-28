import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '../theme';

const VARIANTS = {
  default: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  muted: { backgroundColor: colors.surfaceMuted },
  hero: { backgroundColor: colors.hero, borderRadius: radius.xl },
};

// Espaçamento interno de cada variante. O card de destaque tem mais respiro
// para reforçar que é o centro da tela (antes isso era definido na própria tela).
const PADDING = {
  default: spacing.lg,
  muted: spacing.lg,
  hero: spacing.xl,
};

/**
 * Superfície que agrupa conteúdo relacionado.
 * - variant: 'default' | 'muted' | 'hero'
 * - padded: false quando o conteúdo (ex.: lista) controla o próprio espaçamento.
 * Outras propriedades (ex.: accessible, accessibilityLabel) são repassadas à View.
 */
export function Card({ children, variant = 'default', padded = true, style, ...rest }) {
  const paddingStyle = padded
    ? { padding: PADDING[variant] ?? spacing.lg, gap: spacing.md }
    : null;

  return (
    <View
      style={[styles.base, VARIANTS[variant] ?? VARIANTS.default, paddingStyle, style]}
      {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
});
