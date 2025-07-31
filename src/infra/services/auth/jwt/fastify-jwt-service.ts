import { JwtService, JwtPayload } from '@/shared/domain/ports/jwt-service';
import { FastifyInstance } from 'fastify';

export class FastifyJwtService implements JwtService {
  constructor(
    private readonly fastify: FastifyInstance,
  ) {}

  public sign(payload: JwtPayload): string {
    return this.fastify.jwt.sign(payload);
  }

  public verify<T extends JwtPayload = JwtPayload>(token: string): T {
    return this.fastify.jwt.verify(token) as T;
  }
}