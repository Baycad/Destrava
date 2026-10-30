import { Pressable, StyleSheet } from 'react-native';

import { colors, minTouchTarget, pressedFeedback, spacing } from '../theme';
import { AppText } from './AppText';

/**
 * Botão de texto para cabeçalhos ("Cancelar", "Salvar", "Editar").
 * Área de toque mínima de 48 dp, mais 8 dp de área estendida.
 * - emphasis: true para a ação principal (texto em Verde-Petróleo, peso de botão).
 */
export function HeaderButton({ label, onPress, emphasis = false, accessibilityHint }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      hitSlop={8}
      style={({ pressed }) => [styles.button, pressed ? pressedFeedback : null]}>
      <AppText
        variant={emphasis ? 'button' : 'body'}
        color={emphasis ? colors.primary : colors.textSecondary}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: minTouchTarget,
    minWidth: minTouchTarget,
    justifyContent: 'center',
    paddingHorizontal: spacing.sm,
  },
});
