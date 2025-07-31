import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';
import { UserJwtData } from '@/shared/domain/ports/jwt-service';

export async function authMiddleware<T extends RouteGenericInterface>(
  request: FastifyRequest<T>,
  reply: FastifyReply,
) {
  try {
    await request.jwtVerify();
    const user = request.user as UserJwtData;

    request.authenticatedUser = user;
  } catch {
    return reply.status(401).send({
      message: 'Token inválido ou expirado',
      error: 'UNAUTHORIZED',
    });
  }
}

/**
 * Middleware opcional que verifica se o usuário tem uma role específica
 */
export function requireRole(allowedRoles: UserJwtData['role'][]) {
  return async function roleMiddleware<T extends RouteGenericInterface>(
    request: FastifyRequest<T>,
    reply: FastifyReply,
  ) {
    const user = (request.authenticatedUser || request.user) as UserJwtData;

    if (!user || !allowedRoles.includes(user.role)) {
      return reply.status(403).send({
        message: 'Acesso negado. Permissão insuficiente.',
        error: 'FORBIDDEN',
      });
    }
  };
}