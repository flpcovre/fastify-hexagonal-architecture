import { UserJwtData, JwtPayload } from '@/shared/domain/ports/jwt-service';

/**
 * Extrai dados do usuário de um payload JWT, removendo campos técnicos
 */
export function extractUserFromJwt(payload: JwtPayload): UserJwtData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { iat, exp, ...userData } = payload;
  return userData;
}

/**
 * Cria dados do usuário para JWT a partir de uma entidade User
 */
export function createUserJwtData(user: { id: string; name: string; email: string; role: 'admin' | 'supervisor' | 'attendant' }): UserJwtData {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

/**
 * Verifica se um payload JWT contém todos os campos necessários do usuário
 */
export function isValidUserJwtPayload(payload: unknown): payload is JwtPayload {
  if (!payload || typeof payload !== 'object') return false;

  const userPayload = payload as JwtPayload;
  return (
    typeof userPayload.id === 'string' &&
    typeof userPayload.name === 'string' &&
    typeof userPayload.email === 'string' &&
    typeof userPayload.role === 'string'
  );
}