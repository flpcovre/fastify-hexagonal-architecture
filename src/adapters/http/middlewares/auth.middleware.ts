import { FastifyRequest, FastifyReply, RouteGenericInterface } from 'fastify';

export async function authMiddleware<T extends RouteGenericInterface = RouteGenericInterface>(request: FastifyRequest<T>, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}