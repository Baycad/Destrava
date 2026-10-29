// Regras do formulário de tarefa, como funções puras (fáceis de testar).
// As mensagens explicam como corrigir, sem tom de alarme nem de culpa.

export const TITLE_MAX_LENGTH = 100;
export const NOTES_MAX_LENGTH = 500;

/**
 * Valida os campos do formulário.
 * Devolve um objeto com uma mensagem por campo com problema; vazio quando está tudo certo.
 */
export function validateTaskFields({ title, notes = '' }) {
  const errors = {};
  const trimmedTitle = title.trim();

  if (trimmedTitle.length === 0) {
    errors.title = 'Escreva um título para a tarefa.';
  } else if (trimmedTitle.length > TITLE_MAX_LENGTH) {
    errors.title = `Use até ${TITLE_MAX_LENGTH} caracteres no título.`;
  }

  if (notes.trim().length > NOTES_MAX_LENGTH) {
    errors.notes = `Use até ${NOTES_MAX_LENGTH} caracteres na observação.`;
  }

  return errors;
}

/** true quando o objeto de erros tem pelo menos uma mensagem. */
export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
