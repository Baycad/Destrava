import { Pressable, StyleSheet } from 'react-native';

import { colors, minTouchTarget, pressedFeedback } from '../theme';
import { Icon } from './Icon';

/**
 * Caixa de seleção acessível.
 * - Área de toque de 48 dp, mesmo com o ícone de 24.
 * - O leitor de tela anuncia o papel ("caixa de seleção") e o estado
 *   ("marcada" / "não marcada"), além do rótulo.
 */
export function Checkbox({ checked, onChange, label, hint }) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      accessibilityHint={hint}
      style={({ pressed }) => [styles.box, pressed ? pressedFeedback : null]}>
      <Icon
        name={checked ? 'done' : 'pending'}
        size={24}
        color={checked ? colors.primary : colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    width: minTouchTarget,
    height: minTouchTarget,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
