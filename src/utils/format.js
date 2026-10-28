// Formatação de textos com números.

/**
 * Junta número e palavra no singular ou plural.
 * Ex.: pluralize(1, 'passo feito', 'passos feitos') -> "1 passo feito"
 *      pluralize(3, 'passo feito', 'passos feitos') -> "3 passos feitos"
 */
export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}
