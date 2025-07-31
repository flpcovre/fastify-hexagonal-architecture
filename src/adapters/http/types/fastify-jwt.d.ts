import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; payload: unknown };
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}