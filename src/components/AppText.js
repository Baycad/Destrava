import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '../theme';

/**
 * Texto padrão do Destrava.
 * Centraliza tamanho, peso e cor para manter a tipografia consistente.
 * Não limitamos o tamanho máximo da fonte: o texto acompanha a
 * configuração de acessibilidade do sistema.
 *
 * Uso: <AppText variant="heading">Título</AppText>
 */
export function AppText({ variant = 'body', color, style, children, ...rest }) {
  return (
    <Text style={[styles.base, typography[variant], color ? { color } : null, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
});
