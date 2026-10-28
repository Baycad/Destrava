// Tokens de design do Destrava.
// Toda cor, espaçamento, raio e estilo de texto do app vem daqui.
// Assim, mudar a identidade visual exige editar um único arquivo.
//
// Contrastes verificados (WCAG 2.1, mínimo 4,5:1 para texto comum):
//   text / background ............ 14,91:1
//   textSecondary / background ...  6,73:1
//   primary / surface .............  6,03:1
//   onPrimary / primary ...........  6,03:1
//   onHero / hero ................. 12,01:1
//   onHeroSecondary / hero ........  9,11:1
//   onHeroAction / heroAction .....  8,36:1
//   demoText / demoBackground .....  7,02:1
//   borderStrong / background .....  3,46:1 (elemento gráfico, mínimo 3:1)

export const colors = {
  // Fundos
  background: '#F4F6F8', // fundo das telas: cinza-azulado frio e calmo
  surface: '#FFFFFF', // listas e painéis
  surfaceMuted: '#E9EEF1', // blocos informativos discretos

  // Bordas
  border: '#D8E0E5', // divisórias decorativas
  borderStrong: '#78868F', // contorno tracejado dos estados vazios

  // Texto
  text: '#17222B',
  textSecondary: '#4A5866',

  // Cor principal (verde-petróleo): ações e destaques
  primary: '#136F63',
  onPrimary: '#FFFFFF',

  // Card "Seu próximo passo": o único elemento de destaque forte da tela
  hero: '#0F3D3A',
  onHero: '#FFFFFF',
  onHeroSecondary: '#CFE5DF',
  heroAction: '#9EE6C9',
  onHeroAction: '#0F3D3A',

  // Aviso de dados de demonstração
  demoBackground: '#FFF4CC',
  demoText: '#6B4E00',
};

// Escala de espaçamento (múltiplos de 4) para manter o ritmo visual consistente.
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  md: 12,
  lg: 20,
  xl: 28,
  pill: 999,
};

// Área mínima de toque recomendada (48 dp no Android, 44 pt no iOS).
export const minTouchTarget = 48;

// Usamos a fonte do sistema (Roboto no Android, SF no iOS): é legível,
// respeita o tamanho de fonte escolhido pelo usuário e não exige biblioteca extra.
export const typography = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700' },
  hero: { fontSize: 24, lineHeight: 31, fontWeight: '700' },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' },
  stat: { fontSize: 28, lineHeight: 32, fontWeight: '700', fontVariant: ['tabular-nums'] },
};
