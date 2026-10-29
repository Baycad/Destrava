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
//   textSecondary / surfaceMuted ..  6,24:1
//   borderStrong / background .....  3,46:1 (elemento gráfico, mínimo 3:1)
//   borderStrong / surface ........  3,75:1 (contorno de campo de texto)
//   error / background ............  6,14:1
//   error / surface ...............  6,65:1

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

  // Erro de validação de formulário: vermelho-tijolo sóbrio, sem tom de alarme.
  // Sempre acompanhado de uma mensagem em texto, nunca só a cor.
  error: '#A8322B',
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

// Limite de ampliação do rótulo das abas. Exceção à regra "fonte sem limite":
// a barra de abas tem altura fixa, e com a fonte do sistema muito grande o rótulo
// era cortado embaixo (teste de fonte ampliada, 28/10/2026). O conteúdo das telas
// continua crescendo sem limite.
export const tabLabelMaxFontScale = 1.2;

// Altura da área das abas (sem contar a barra de navegação do sistema).
// Um pouco maior que o padrão para caber o rótulo ampliado até o limite acima.
export const tabBarHeight = 56;

// Resposta visual ao toque, igual para todos os elementos tocáveis
// (botões e links de seção): fica um pouco transparente e encolhe levemente.
export const pressedFeedback = {
  opacity: 0.8,
  transform: [{ scale: 0.98 }],
};

// Usamos a fonte do sistema (Roboto no Android, SF no iOS): é legível,
// respeita o tamanho de fonte escolhido pelo usuário e não exige biblioteca extra.
//
// Hierarquia da tela Hoje (Etapa 1.1): o passo em destaque usa "display",
// o maior estilo do app; a saudação usa "title"; a pergunta central usa "heading".
export const typography = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700' },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  caption: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 20, fontWeight: '600' },
  button: { fontSize: 16, lineHeight: 20, fontWeight: '600' },
  stat: { fontSize: 28, lineHeight: 32, fontWeight: '700', fontVariant: ['tabular-nums'] },
  tabLabel: { fontSize: 12, lineHeight: 16, fontWeight: '600' },
};
