const prefixError = 'Ops!';

export const MessagesValidations = {
  INTERNAL_ERROR: `${prefixError} Algo deu errado`,
  UNAUTHORIZED: `${prefixError} Você não está autenticado`,
  CONFLICT: `${prefixError} Há dados em conflito`,
  BAD_REQUEST: `${prefixError} Requisição mal formatada`,
  FORBIDDEN: `${prefixError} Você não tem permissão para acessar este recurso`,
  NOT_FOUND: `${prefixError} Recurso não encontrado`,

  IsUuid: (field: string) =>
    `${prefixError} O campo ${field} deve um UUID válido`,
};
