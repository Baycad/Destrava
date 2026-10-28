import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '../../components/AppText';
import { Icon } from '../../components/Icon';
import { colors, tabBarHeight, tabLabelMaxFontScale } from '../../theme';

/**
 * Rótulo das abas. Usa a variante tabLabel e limita a ampliação da fonte
 * (tabLabelMaxFontScale), porque a barra de abas tem altura fixa: sem o limite,
 * o texto era cortado embaixo com a fonte do sistema muito grande.
 */
function TabLabel({ color, children }) {
  return (
    <AppText
      variant="tabLabel"
      color={color}
      maxFontSizeMultiplier={tabLabelMaxFontScale}
      numberOfLines={1}>
      {children}
    </AppText>
  );
}

/**
 * Navegação inferior com três abas.
 * O nome de cada Tabs.Screen corresponde a um arquivo desta pasta:
 *   index.js -> Hoje | tarefas.js -> Tarefas | progresso.js -> Progresso
 * A pasta "(tabs)" é um grupo: os parênteses não aparecem na URL da rota.
 */
export default function TabsLayout() {
  // Espaço da barra de navegação do sistema (botões ou gestos), somado à altura das abas.
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // Transição suave (cross-fade) ao trocar de aba.
        // Não cria espera: a tela nova já está pronta e só aparece com um fade curto.
        animation: 'fade',
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: tabBarHeight + insets.bottom,
        },
        tabBarLabel: ({ color, children }) => <TabLabel color={color}>{children}</TabLabel>,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoje',
          tabBarIcon: ({ color, size }) => <Icon name="today" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="tarefas"
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color, size }) => <Icon name="tasks" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="progresso"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ color, size }) => <Icon name="progress" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}