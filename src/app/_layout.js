import { DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '../theme';

// Tema da navegação baseado nas cores do Destrava.
// Nesta etapa o app usa somente o tema claro (modo escuro está nas versões futuras).
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
  },
};

/**
 * Layout raiz (Expo Router).
 * Uma pilha (Stack) que, por enquanto, contém apenas o grupo de abas.
 * Nas próximas etapas, telas como "Foco" e "Detalhe da tarefa" entram
 * nesta pilha, abrindo por cima das abas.
 */
export default function RootLayout() {
  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
