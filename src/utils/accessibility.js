// Funções de apoio à acessibilidade (puras, testáveis).

/**
 * Monta a dica falada de um campo de texto para o leitor de tela.
 * - Com erro, a dica é só a mensagem de erro.
 * - Sem erro, junta a dica visível e o contador ("12 de 100 caracteres").
 * A pontuação final de cada parte é retirada antes de juntar, para não ficar "..".
 * Devolve undefined quando não há nada para falar.
 */
export function buildSpokenHint({ error, hint, value = '', maxLength }) {
  if (error) {
    return error;
  }

  const counterText = maxLength ? `${value.length} de ${maxLength} caracteres` : null;
  const text = [hint, counterText]
    .filter(Boolean)
    .map((part) => part.replace(/[.\s]+$/, ''))
    .join('. ');

  return text || undefined;
}
