import { SymbolView } from 'expo-symbols';

import { colors } from '../theme';

// Catálogo de ícones do app, com o nome em cada plataforma:
// iOS usa SF Symbols; Android e web usam Material Symbols.
// Centralizar aqui evita nomes espalhados e facilita trocar um ícone.
const ICONS = {
  today: { ios: 'sun.max', android: 'wb_sunny', web: 'wb_sunny' },
  tasks: { ios: 'checklist', android: 'checklist', web: 'checklist' },
  progress: { ios: 'chart.bar', android: 'bar_chart', web: 'bar_chart' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  pending: { ios: 'circle', android: 'radio_button_unchecked', web: 'radio_button_unchecked' },
  done: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
  leaf: { ios: 'leaf', android: 'eco', web: 'eco' },
};

/**
 * Ícone decorativo. O texto ao lado já descreve a ação, então o ícone
 * fica oculto para leitores de tela (TalkBack/VoiceOver) e não é lido duas vezes.
 */
export function Icon({ name, size = 20, color = colors.text }) {
  const symbol = ICONS[name];

  if (!symbol) {
    if (__DEV__) {
      console.warn(`[Icon] Ícone "${name}" não existe no catálogo de src/components/Icon.js`);
    }
    return null;
  }

  return (
    <SymbolView
      name={symbol}
      size={size}
      tintColor={color}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    />
  );
}
