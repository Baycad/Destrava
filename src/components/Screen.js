import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '../theme';

/**
 * Estrutura base de todas as telas: respeita as áreas seguras
 * (entalhe, barra de status) e permite rolagem quando o conteúdo
 * é maior que a tela — importante com fontes ampliadas.
 * A borda inferior fica a cargo da barra de abas.
 * - edges: bordas protegidas. Telas com cabeçalho nativo (ex.: detalhe da tarefa)
 *   não precisam proteger o topo, porque o cabeçalho já faz isso.
 * - Com o teclado aberto, um toque num botão funciona de primeira
 *   (keyboardShouldPersistTaps), em vez de só fechar o teclado.
 */
export function Screen({ children, edges = ['top', 'left', 'right'] }) {
  return (
    <SafeAreaView edges={edges} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
});
