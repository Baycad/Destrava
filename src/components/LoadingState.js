import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { colors, spacing } from '../theme';
import { AppText } from './AppText';

// Só mostra o indicador se a espera passar deste tempo.
// Leituras rápidas não fazem a tela "piscar"; esperas reais ficam visíveis.
const SHOW_AFTER_MS = 300;

/** Indicador de carregamento real (nunca usado para criar espera artificial). */
export function LoadingState({ message = 'Carregando…' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container} accessible accessibilityLabel={message}>
      <ActivityIndicator color={colors.primary} />
      <AppText variant="caption" color={colors.textSecondary}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xxl,
  },
});
